import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "./store";
import {setLoading, stubDataLoaded} from "./store/task-organizer-state";
import NavigationMenu from "./components/navigation-menu/navigation-menu";
import SprintView from "./pages/sprint-view/sprint-view";

function App2() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    // const [dialogData, setDialogData] = useState<Student | null>(null);

    const state = useSelector((state: RootState) => state.organizer);
    const loading = useSelector((state: RootState) => state.organizer.loading === 'loading');

    const getStubData = (additional: boolean, skip?: number) => {
        dispatch(setLoading());
        // dispatch(dataLoaded({additional, students: res.data}))
        /* axios.get('/students', { params: {skip, ...(search && search.length >= 3 && { searchTerm: search })} }).then(res =>

        ).catch(() => dispatch(dataLoaded({ additional, students: [] }))); */
    }

    return <span></span>;
}


function App() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.organizer);
    const loading = useSelector((state: RootState) => ['loading', 'idle'].includes(state.organizer.loading));

    useEffect(() => {
        dispatch(stubDataLoaded());
    }, []);

    const navigationItems = [
        { label: 'Test 1' },
        { label: 'Test 2' },
        { label: 'Test 3' },
        { label: 'Test 4' },
        { label: 'Test 5' },
        { label: 'Test 6' },
    ]

    return <>
        <NavigationMenu items={navigationItems}></NavigationMenu>
        {
            loading ? <span>Loading</span> :
                <SprintView statuses={state.statues} epics={state.epics} sprint={state.sprints[0]}></SprintView>
        }
    </>
}

export default App;
