import {createSlice} from '@reduxjs/toolkit';
import {Sprint} from "../models/sprint.model";

export interface Status {
    id: number;
    label: string;
}

export interface Epic {
    id: number;
    label: string;
    // description
}

export interface Tag {
    id: number;
    label: string;
}

// would need some rework when other pages are added, as sprint is just one of the state that can be stored here yk
// i would asy we need to store the tasks (even if in the http the come with the sprint) and the sprint separately
export type TaskOrganizerState = {
    loading: 'idle' | 'loading' | 'error' | 'loaded',
    statues: Status[],
    epics: Epic[],
    sprints: Sprint[],
};

const initialState: TaskOrganizerState = {
    loading: 'idle',
    statues: [],
    epics: [],
    sprints: [],
};

// remove

const statuses = [
    { id: 0, label: 'To Do'},
    { id: 1, label: 'In Progress'},
    { id: 2, label: 'Test'},
    { id: 3, label: 'Done'}
];

const epics = [
    { id: 0, label: 'Main'},
    { id: 1, label: 'Bugs'}
];

const sprint = {
    id: 0,
    tasks: {
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

// immer.js under the hood
export const organizerSlice = createSlice({
    name: 'organizer',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = 'loading';
        },
        setError: (state) => {
            state.loading = 'error';
        },
        stubDataLoaded: (state) => {
            state.epics = epics;
            state.statues = statuses;
            state.sprints = [sprint];
            state.loading = 'loaded';
        },
        /* dataLoaded: (state, { payload }: PayloadAction<{ additional: boolean, students: Student[] }>) => {
            state.loading = 'loaded';
        }, */
    },
});

export const { setLoading, setError, stubDataLoaded } = organizerSlice.actions;

export default organizerSlice.reducer;
