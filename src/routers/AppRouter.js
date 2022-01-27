import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { startChecking } from "../actions/auth";

import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch, checking]);

    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>
                    } />

                    <Route path="/" element={
                        <PrivateRoute>
                            <CalendarScreen />
                        </PrivateRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
