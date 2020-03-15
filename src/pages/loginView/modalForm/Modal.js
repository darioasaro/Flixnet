import React from "react";
import "../modalForm/Modal.css";
import { useEffect, useState } from "react";

const Modal = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleUser = e => {
    setUser(e.target.value);
  };

  const handlePass = e => {
    setPass(e.target.value);
  };

  const handleClose = e => {
    setUser("");
    setPass("");
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary"
        type="button"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        Register
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Sign up
              </h5>
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleInputName1">User name</label>
                <input
                  onChange={handleUser}
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your data with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  onChange={handlePass}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check"></div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
