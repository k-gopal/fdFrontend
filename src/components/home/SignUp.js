import React, { useEffect, useState } from "react";
import { postRequestApi } from "../../services/common-service";

const SignUp = ({ handleLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = async () => {
    let result = await postRequestApi("/auth/signUp", {
      name,
      email,
      password,
      profession
    });
    if (result?.data?.payload?.token) {
      localStorage.setItem("token", result.data.payload.token);
      handleLoggedIn(true);
    }
  };
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-6">
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
          <h3 className="text-dark fw-bold">SignUp</h3>
          <hr />
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
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
          <label className="form-label" htmlFor="profession">
            Profession:
          </label>
          <br />
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="profession1"
              name="profession"
              value="contractor"
              onChange={(e) => setProfession(e.target.value)}
            />
            <label class="form-check-label" for="profession1">
              Contractor
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="profession2"
              name="profession"
              value="transporter"
              onChange={(e) => setProfession(e.target.value)}
            />
            <label class="form-check-label" for="profession2">
              Transporter
            </label>
          </div>
          <br />
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
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
