import React, {useEffect} from 'react';
import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import SignupPage from "./pages/SignupPage.js";
import LoginPage from "./pages/LoginPage.js";
import SettingsPage from "./pages/SettingsPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import Navbar from "./components/Navbar";
import {useAuthStore} from "./store/UseAuthStore";
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import {useThemeStore} from "./store/UseThemeStore";

function App() {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
    const { theme } = useThemeStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

    if(isCheckingAuth && !authUser) {
        return (<div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"></Loader>
        </div>)
    }
    return (
        <div data-theme={theme}>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={authUser ? <HomePage/>: <Navigate to="/login"/>}/>
                <Route path="/signup" element={!authUser ? <SignupPage/>: <Navigate to="/"/>}/>
                <Route path="/login" element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
            </Routes>
            <Toaster></Toaster>
        </div>
    );
}

export default App;
