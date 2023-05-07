import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";





export const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const login = async (event) => {
        event.preventDefault();
        const response = await actions.loginUser(
            email,
            password
        );
        console.log(response);
        if (response) {
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">Success!</strong>
                {/* <small className="text-muted">11 mins ago</small> */}
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div className="toast-body">
                Bienvenido a la plataforma!
              </div>
            </div>
            navigate("/private")
        } else {
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header">
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">Error!</strong>
                {/* <small className="text-muted">11 mins ago</small> */}
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div className="toast-body">
                Oops! Algo salió mal. Intente nuevamente.
              </div>
            </div>
        }
    };

useEffect(() => {
    if (store.token && store.token !== null) navigate("/private")
}, [store.token])

    return (
        <>
            <div className="container d-flex flex-column rounded border h-100 w-100 p-5">
                <h1 className="text-center">Login</h1>
                <form onSubmit={login}>
                    <div className="mx-auto col-8">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mx-auto col-8">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="mx-auto col-8">
                        <Link to="/register">
                            <p>No tienes cuenta? Registrate!</p>
                        </Link>
                    </div>
                    <div className="mx-auto col-8">
                        <input type="submit" className="btn btn-primary" value="Iniciar Sesión" />
                    </div>
                </form>
            </div>
        </>
    );
};