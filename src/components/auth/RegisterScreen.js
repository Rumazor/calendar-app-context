import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { fetchSinToken } from "../helpers/fetch";

export const RegisterScreen = () => {
  const { authStateProvider } = useContext(AuthContext);
  const { auth, setAuth } = authStateProvider;
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formValues;

  const fetchRegister = async () => {
    try {
      const resp = await fetchSinToken(
        "auth/new",
        { name, email, password },
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        setAuth({
          ...auth,
          checking: false,
          uid: body.uid,
          name: body.name,
        });
        console.log(body);
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }
    fetchRegister();
  };

  return (
    <>
      <div className=" min-h-screen bg-slate-800 grid place-content-center items-center">
        <div className="w-full max-w-md min-w-[25.9375rem] animate__animated animate__fadeIn  p-8 space-y-4 rounded-xl dark:bg-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-bold text-center">Registro</h1>
          <form
            onSubmit={handleRegister}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className=" text-sm">
              <label htmlFor="Nombre" className="block dark:text-gray-400 pb-1">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                placeholder="Ingresa tu nombre"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="email" className="block dark:text-gray-400 pb-1">
                Correo electronico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                onChange={handleInputChange}
                value={email}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
              <div className="flex justify-end text-xs dark:text-gray-400"></div>
            </div>
            <div className=" text-sm">
              <label
                htmlFor="Contraseña"
                className="block dark:text-gray-400  pb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                value={password}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
              <div className="flex justify-end text-xs dark:text-gray-400 "></div>
            </div>
            <div className=" text-sm">
              <label
                htmlFor="confirmPassword"
                className="block dark:text-gray-400  pb-1"
              >
                Confirma tu contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirma tu contraseña"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
              <div className="flex justify-end text-xs dark:text-gray-400"></div>
            </div>
            <button className="block w-full p-3 text-center font-semibold rounded-sm dark:text-gray-900  bg-slate-300">
              Registrarse
            </button>
          </form>

          <p className="text-sm text-center sm:px-6 dark:text-gray-400">
            ¿Ya tienes cuenta?
            <NavLink
              to="/login"
              rel="noopener noreferrer"
              className="underline dark:text-gray-100 px-2 text-sm"
            >
              Ingresar
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
