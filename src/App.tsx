import React, {useState} from 'react';
import axios from './stub/mocks';
import {Student} from "./models/student.model";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "./store";
import {dataLoaded, setLoading} from "./store/taskOrganizerState";
import NavigationMenu from "./components/navigation-menu/navigation-menu";
import SprintView from "./pages/sprint-view/sprint-view";

function App2() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [dialogData, setDialogData] = useState<Student | null>(null);

    const state = useSelector((state: RootState) => state.organizer);
    const error = useSelector((state: RootState) => state.organizer.initialLoading === 'error');
    const loading = useSelector((state: RootState) => state.organizer.initialLoading === 'loading');
    const additionalLoading = useSelector((state: RootState) => state.organizer.additionalLoading === 'loading');

    const getStubData = (additional: boolean, skip?: number) => {
        dispatch(setLoading({additional}));
        axios.get('/students', { params: {skip, ...(search && search.length >= 3 && { searchTerm: search })} }).then(res =>
            dispatch(dataLoaded({additional, students: res.data}))
        ).catch(() => dispatch(dataLoaded({ additional, students: [] })));
    }

    return <span></span>;
}

function App() {

    const navigationItems = [
        { label: 'Test 1' },
        { label: 'Test 2' },
        { label: 'Test 3' },
        { label: 'Test 4' },
        { label: 'Test 5' },
        { label: 'Test 6' },
    ]

    const statusList = [
        { id: 0, label: 'To Do'},
        { id: 1, label: 'In Progress'},
        { id: 2, label: 'Test'},
        { id: 3, label: 'Done'}
    ];

    const epicsList = [
        { id: 0, label: 'Main'},
        { id: 1, label: 'Bugs'}
    ];

    const sprint = {
        id: 0,
        epics: epicsList,
        tasks: {
            total: 5,
            data: {
                0: [
                    {
                        id: 0,
                        status: 0,
                        title: 'Test task 1'
                    },
                    {
                        id: 1,
                        status: 1,
                        title: 'Test task 2'
                    }
                ],
                1: [
                    {
                        id: 3,
                        status: 1,
                        title: 'Test task 3'
                    },
                    {
                        id: 4,
                        status: 3,
                        title: 'Test task 4'
                    },
                    {
                        id: 5,
                        status: 3,
                        title: 'Test task 5'
                    }
                ],
            }
        }
    }

    return <>
        <NavigationMenu items={navigationItems}></NavigationMenu>
        <SprintView statuses={statusList} sprint={sprint}></SprintView>
    </>
}

export default App;
