import React from "react";
import { NavLink } from "react-router-dom";

export const RegisterScreen = () => {
  return (
    <>
      <div className=" min-h-screen bg-slate-800 grid place-content-center items-center">
        <div className="w-full max-w-md min-w-[25.9375rem] p-8 space-y-4 rounded-xl dark:bg-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-bold text-center">Registro</h1>
          <form
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className=" text-sm">
              <label htmlFor="Nombre" className="block dark:text-gray-400">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                placeholder="Ingresa tu nombre"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
            <div className="text-sm">
              <label htmlFor="email" className="block dark:text-gray-400">
                Correo electronico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
              <div className="flex justify-end text-xs dark:text-gray-400"></div>
            </div>
            <div className=" text-sm">
              <label htmlFor="Contraseña" className="block dark:text-gray-400">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-2 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
              <div className="flex justify-end text-xs dark:text-gray-400"></div>
            </div>
            <div className=" text-sm">
              <label
                htmlFor="confirmPassword"
                className="block dark:text-gray-400"
              >
                Confirma tu contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
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
