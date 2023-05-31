import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {stubDataLoaded} from "./store/task-organizer-state";
import NavigationMenu from "./components/navigation-menu/navigation-menu";
import {Outlet} from "react-router-dom";


function App() {
    const dispatch = useDispatch();

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
        <NavigationMenu items={navigationItems} />
        <Outlet />
    </>
}

export default App;
