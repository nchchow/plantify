import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((res) => console.log("submited, res: ", res))
      .catch((err) => console.log(err));
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            required={true}
            onChange={(e) => handleChange(e, setEmail)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            required={true}
            onChange={(e) => handleChange(e, setPassword)}
          />
        </label>
        <button>Submit</button>
      </form>
    </article>
  );
};

export default Login;
