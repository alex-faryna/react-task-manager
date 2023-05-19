import Collapse from "@mui/material/Collapse";
import {useState} from "react";
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

function SprintStatusHeader({ statusList }: { statusList: Status[] }) {
    return <div className='sprint-epic-view sprint-status-header'>
        <div className='sprint-epic-tasks'>
            { statusList.map(status => <div key={status.id} className='sprint-epic-task-placeholder p-1 column-stretch'>
                <span>{ status.label }</span>
            </div>) }
        </div>
    </div>
}

function SprintEpic({ title, statusList, tasks }: { title: string, statusList: Status[], tasks: TaskInEpic[] }) {
    const [expanded, setExpanded] = useState(true);
    const toggle = () => setExpanded(!expanded);

    return <section className='sprint-epic-view'>
        <div className='row pointer' onClick={toggle}>
            <span className='sprint-epic-title no-select'>{ title }</span>
            <div className={`sprint-epic-toggle-icon ${expanded ? 'expanded' : ''}`}>
                <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className='sprint-epic-tasks'>
                { statusList.map(status => <div key={status.id} className='sprint-epic-task-placeholder radius-6 column-stretch'>
                    { tasks.filter(task => task.status === status.id).map(task => <div key={task.id} className='task-card'>
                        <p>{ task.title }</p>
                        <p>{ statusList.find(status => status.id === task.status)?.label || 'No status' }</p>
                    </div>) }
                </div>) }
            </div>
        </Collapse>
    </section>
}

function SprintView({ sprint, statusList }: { sprint: Sprint, statusList: Status[] }) {
    return <div className='column-stretch w-full'>
        <span>Total: { sprint.tasks.total || 0 }</span>
        <main className='sprint-view'>
            <SprintStatusHeader statusList={statusList}></SprintStatusHeader>
            { sprint.epics.map(epic => <SprintEpic key={epic.id}
                                                  title={epic.label}
                                                  tasks={sprint.tasks.data?.[epic.id] || []}
                                                  statusList={statusList}></SprintEpic>) }
        </main>
    </div>
}

export default SprintView;
