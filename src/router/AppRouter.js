import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarScreen } from "./../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { fetchconToken } from "../components/helpers/fetch";
import { AuthContext } from "../components/context/AuthContext";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const { authStateProvider } = useContext(AuthContext);
  const { auth, setAuth } = authStateProvider;

  const { checking, uid } = auth;

  const fetchChecking = async () => {
    setTimeout(async () => {
      try {
        const resp = await fetchconToken("auth/renew");
        const body = await resp.json();

        if (body.ok) {
          localStorage.setItem("token", body.token);
          localStorage.setItem("token-init-date", new Date().getTime());
          setAuth({
            ...auth,
            uid: body.uid,
            name: body.name,
            checking: false,
          });
        } else {
          setAuth({
            ...auth,
            checking: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchChecking();
  }, []);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes logged={!!uid}>
                <LoginScreen />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes logged={!!uid}>
                <RegisterScreen />
              </PublicRoutes>
            }
          />

          <Route
            index
            path="/"
            element={
              <PrivateRoutes logged={!!uid}>
                <CalendarScreen />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<LoginScreen />} />
          {/* <Navigate replace to="/" /> */}
        </Routes>
      </Router>
    </>
  );
};
