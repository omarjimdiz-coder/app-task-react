import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../auth";
import { CrudPage } from "../crud";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {


    const {status, checkAuthToken} = useAuthStore();
    //const authStatus = 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, []);

    if( status === 'checking'){
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated') 
                ?  (
                    <>
                        <Route path="/auth/*" element={ <LoginPage /> } /> 
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                )
                :  (
                    <>
                        <Route path="/" element={ <CrudPage /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                )
            }


        </Routes> 
    )
}
