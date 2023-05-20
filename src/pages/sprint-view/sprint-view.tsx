import Collapse from "@mui/material/Collapse";
import {useEffect, useState} from "react";
import './sprint-view.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface Tag {
    id: number;
    label: string;
}

export interface TaskInEpic {
    id: number;
    status: number;
    title: string;
    // code
    // tags?: Tag[]; // mb not here but in FullTask
    // content
    // priority
    // assignee
}

// need id because of dates etc
export interface Sprint {
    id: number;
    // dates
    // description
    epics: Epic[];
    tasks: {
        total: number;
        data?: Record<number, TaskInEpic[]>;
    }
}

export interface Status {
    id: number;
    label: string;
}

export interface Epic {
    id: number;
    label: string;
    // description
}

function SprintStatusHeader({ statuses, tasks = [] }: { statuses: Status[], tasks?: Record<number, TaskInEpic[]> }) {
    const [statusCount, setStatusCount] = useState<Record<number, number>>({});

    useEffect(() => {
        void calculateCounts(tasks, statuses);
    }, [tasks]);

    async function calculateCounts(rawTasks: Record<number, TaskInEpic[]>, statuses: Status[]): Promise<void> {
        const tasks = Object.values(rawTasks || {}).flat();
        const counts = tasks.reduce((res, task) => {
            res[task.status] = (res?.[task.status] || 0) + 1;
            return res;
        }, statuses.reduce((a, v) => ({ ...a, [v.id]: 0}), {}) as Record<number, number>);
        setStatusCount(counts);
    }

    return <div className='sprint-epic-view sprint-status-header'>
        <div className='sprint-epic-tasks'>
            { statuses.map(status => <div key={status.id} className='sprint-epic-task-placeholder p-1 column-stretch'>
                <span>{ status.label } { statusCount?.[status.id] }</span>
            </div>) }
        </div>
    </div>
}

function SprintEpic({ title, statuses, tasks = [] }: { title: string, statuses: Status[], tasks?: TaskInEpic[] }) {
    const [expanded, setExpanded] = useState(true);
    const toggle = () => setExpanded(!expanded);

    return <section className='sprint-epic-view'>
        <div className='row pointer' onClick={toggle}>
            <span className='sprint-epic-title no-select'>{ title }</span>
            <div className={`sprint-epic-toggle-icon ${expanded ? 'expanded' : ''}`}>
                <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            <span className='sprint-epic-issues-count'>
                { tasks.length } Issues
            </span>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className='sprint-epic-tasks'>
                { statuses.map(status => <div key={status.id} className='sprint-epic-task-placeholder radius-6 column-stretch'>
                    { tasks.filter(task => task.status === status.id).map(task => <div key={task.id} className='task-card'>
                        <p>{ task.title }</p>
                        <p>{ statuses.find(status => status.id === task.status)?.label || 'No status' }</p>
                    </div>) }
                </div>) }
            </div>
        </Collapse>
    </section>
}

function SprintView({ sprint, statuses }: { sprint: Sprint, statuses: Status[] }) {
    return <div className='column-stretch w-full'>
        <span>Total: { sprint.tasks.total || 0 }</span>
        <main className='sprint-view'>
            <SprintStatusHeader statuses={statuses} tasks={sprint.tasks.data}></SprintStatusHeader>
            { sprint.epics.map(epic => <SprintEpic key={epic.id}
                                                  title={epic.label}
                                                  tasks={sprint.tasks.data?.[epic.id]}
                                                  statuses={statuses}></SprintEpic>) }
        </main>
    </div>
}

export default SprintView;
