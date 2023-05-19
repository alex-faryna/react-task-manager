import Collapse from "@mui/material/Collapse";
import {useState} from "react";
import './sprint-view.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export interface Tag {
    id: number;
    label: string;
}

export interface TaskInSprint {
    id: number;
    status: number;
    title: string;
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
        data?: Record<number, TaskInSprint[]>;
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

function SprintRow({ title, statusList }: { title: string, statusList: Status[] }) {
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
                { statusList.map(status => <div key={status.id} className='sprint-epic-task'>

                </div>) }
            </div>
        </Collapse>
    </section>
}

function SprintView({ sprint, statusList }: { sprint: Sprint, statusList: Status[] }) {
    return <main className='sprint-view'>
        { sprint.epics.map(epic => <SprintRow key={epic.id} title={epic.label} statusList={statusList}></SprintRow>) }
    </main>
}

export default SprintView;
