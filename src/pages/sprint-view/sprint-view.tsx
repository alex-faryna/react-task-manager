import Collapse from "@mui/material/Collapse";
import {useState} from "react";
import './sprint-view.css'

export interface Status {
    id: number;
    label: string;
}

export interface Epic {
    id: number;
    label: string;
}

function SprintRow({ title, statusList }: { title: string, statusList: Status[] }) {
    const [open, setOpen] = useState(true);

    return <section className='sprint-epic-view'>
        <span className='sprint-epic-title' onClick={() => setOpen(!open)}>{ title }</span>
        <Collapse in={open} timeout="auto"
                  unmountOnExit>
            <div className='sprint-epic-tasks'>
                { statusList.map(status => <div key={status.id} className='sprint-epic-task'></div>) }
            </div>
        </Collapse>
    </section>
}

function SprintView({ statusList, epicsList }: { statusList: Status[], epicsList: Epic[] }) {
    return <main className='sprint-view'>
        { epicsList.map(epic => <SprintRow key={epic.id} title={epic.label} statusList={statusList}></SprintRow>) }
    </main>
}

export default SprintView;
