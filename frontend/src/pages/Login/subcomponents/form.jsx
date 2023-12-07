import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function loginform() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      `http://django-env.eba-89phmv2c.us-west-2.elasticbeanstalk.com/accounts/login/`,
      {
        username: inputs.username,
        password: inputs.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("userType", response.data.usertype)

        console.log(response);
        console.log(response.data);

        if (response.data.usertype == 1) {
          navigate("/user/profile");
        } else {
          navigate("/shelter/profile");
        }
      })
      .catch((error) => {
        (error) => console.log(error);
        setError("Invalid username or password");
      });
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        className="full-width"
        required
        name="username"
        value={inputs.username || ""}
        onChange={handleChange}
      ></input>

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        className="full-width"
        required
        name="password"
        value={inputs.password || ""}
        onChange={handleChange}
      ></input>

      {error && <p className="error-text">{error}</p>}

      <input
        type="submit"
        className="signin-button"
        id="submit"
        value="Sign In"
      ></input>
    </form>
  );
}
