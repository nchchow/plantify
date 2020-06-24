import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("/api/signup", { name, email, password })
      .then((res) => console.log("submited, res: ", res))
      .catch((err) => console.log(err));
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>
        <label>
          Name:{" "}
          <input type="text" name="name" required={true} onChange={setName} />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            required={true}
            onChange={setEmail}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            required={true}
            onChange={setPassword}
          />
        </label>
        <button>Submit</button>
      </form>
    </article>
  );
};

export default Signup;
