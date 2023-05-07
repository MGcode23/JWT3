import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (store.token == null) navigate("/");
  }, [store.token]);

  return (
    <div className="text-center mt-5">
      <h1>Dashboard</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <h1 className="alert-success">
        Congratulations!<br></br> You're on the private Dashboard!
      </h1>
    </div>
  );
};
