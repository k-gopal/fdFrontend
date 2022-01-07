import React, { useEffect, useState } from "react";
import { postRequestApi } from "../../services/common-service";

const Login = ({ handleLoggedIn, setNameProfession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");

  const handleChange = async () => {
    let result = await postRequestApi("/auth/signIn", {
      email,
      profession,
      password,
    });
    if (result?.data?.payload?.token) {
      setNameProfession({name: result.data.payload.name, profession: result.data.payload.profession, token: result.data.payload.token, email: result.data.payload.email})
      handleLoggedIn(true);
    }
  };
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-6">
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-dark fw-bold">Log In</h3>
          <hr />
          <label className="form-label" htmlFor="profession">Profession:</label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="profession1"
              name="profession"
              value="contractor"
              onChange={(e) => setProfession(e.target.value)}
            />
            <label className="form-check-label" for="profession1">
              Contractor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="profession2"
              name="profession"
              value="transporter"
              onChange={(e) => setProfession(e.target.value)}
            />
            <label className="form-check-label" for="profession2">
              Transporter
            </label>
          </div>
          <br />
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => handleChange()}
              className="btn btn-primary my-3"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
