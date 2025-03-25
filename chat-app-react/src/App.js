import React, {useEffect, useRef} from 'react';
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import SettingsPage from "./pages/SettingsPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Navbar from "./components/Navbar";
import {useAuthStore} from "./store/UseAuthStore";

function App() {
    const {authUser, checkAuth} = useAuthStore();

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

    console.log(authUser)
    return (
        <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </div>
    );
}

export default App;
