import React, { useState } from "react";
import axios from "axios";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/users/signup", {
        name,
        email,
        password,
      })
      .then(({ data }) => {
        if (data.success) props.history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            required={true}
            onChange={(e) => handleChange(e, setName)}
          />
        </label>
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

export default Signup;
