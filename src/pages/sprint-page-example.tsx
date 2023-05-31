import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import React, {useEffect} from "react";
import {stubDataLoaded} from "../store/task-organizer-state";
import SprintView from "../widgets/sprint-view/sprint-view";
import {Outlet} from "react-router-dom";

function SprintPageExample() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.organizer);
    const loading = useSelector((state: RootState) => ['loading', 'idle'].includes(state.organizer.loading));

    useEffect(() => {
        dispatch(stubDataLoaded());
    }, []);

    return loading ? <span>Loading</span> :
        <SprintView statuses={state.statues} epics={state.epics} sprint={state.sprints[0]}></SprintView>
}

export default SprintPageExample;
