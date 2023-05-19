import React, {useEffect, useState} from 'react';
import axios from './stub/mocks';
import {Student} from "./models/student.model";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "./store";
import {dataLoaded, setLoading} from "./store/studentsState";
import Table, {Column} from './components/table';
import Search from "./components/search";
import Dialog from "./components/dialog";
import styled from "styled-components";
import {Button, Drawer} from '@mui/material';
import NavigationMenu from "./components/navigation-menu/navigation-menu";
import SprintView from "./pages/sprint-view/sprint-view";

const sharedColumns = [
    {
        header: 'Name',
        key: 'name',
    },
    {
        header: 'Lectures attended',
        key: 'lecturesAttended',
    },
    {
        header: 'Total lectures',
        key: 'totalLectures',
    },
];

const columnsConfig: Column<Student>[] = [
    {
        header: 'Id',
        key: 'id',
    },
    ...sharedColumns as Column<Student>[],
    {
        header: 'Grades',
        body: row => {
            const subjects = Object.values(row.marks);
            const max = subjects.reduce((prev, subject ) => prev + subject.totalMarks, 0);
            const current = subjects.reduce((prev, subject ) => prev + subject.marksObtained, 0);
            return <span>{ `${current}/${max}` }</span>;
        }
    }
];

const Container = styled.div`
    height: 70%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
`;


function App2() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [dialogData, setDialogData] = useState<Student | null>(null);

    const state = useSelector((state: RootState) => state.students);
    const error = useSelector((state: RootState) => state.students.initialLoading === 'error');
    const loading = useSelector((state: RootState) => state.students.initialLoading === 'loading');
    const additionalLoading = useSelector((state: RootState) => state.students.additionalLoading === 'loading');

    const getStubData = (additional: boolean, skip?: number) => {
        dispatch(setLoading({additional}));
        axios.get('/students', { params: {skip, ...(search && search.length >= 3 && { searchTerm: search })} }).then(res =>
            dispatch(dataLoaded({additional, students: res.data}))
        ).catch(() => dispatch(dataLoaded({ additional, students: [] })));
    }

    useEffect( () => {
        getStubData(false, 0);
    }, [search]);

    const rowClicked = (row: Student) => {
        setDialogData(row);
    }

    return <Container>
        <Button variant="contained">Hello World</Button>

        <Search search={value => setSearch(value.toLowerCase())}></Search>
        <Table columns={columnsConfig}
               data={loading ? [] : state.students}
               loading={loading}
               error={error}
               additionalLoading={additionalLoading}
               threshold={250}
               loadMore={count => getStubData(true, count)}
               rowClick={rowClicked}
        ></Table>
        <Dialog show={!!dialogData} title={ dialogData?.name! } onClose={() => setDialogData(null)}>
            {
                dialogData ? <Columns>
                    {
                        sharedColumns.slice(1).map((col, idx) => <React.Fragment key={idx}>
                            <span>{ col.header }</span>
                            <span>{ dialogData[col.key as keyof Student] as string }</span>
                        </React.Fragment>)
                    }
                    {
                        Object.values(dialogData.marks).map((lesson, idx) => <React.Fragment key={idx}>
                            <span>{ lesson.subjectTitle }</span>
                            <span></span>
                            <span>Marks obtained</span>
                            <span>{ lesson.marksObtained }</span>
                            <span>Total marks</span>
                            <span>{ lesson.totalMarks }</span>
                        </React.Fragment>)
                    }
                </Columns> : null
            }
        </Dialog>
    </Container>
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
                        status: 2,
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
        <SprintView statusList={statusList} sprint={sprint}></SprintView>
    </>
}

export default App;
