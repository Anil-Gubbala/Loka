import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { displayError, displayMessage } from "../../utils/messages";
import { get, post } from "../../utils/serverCall";

function Signup(userDetails) {
  const navigate = useNavigate();
  const user = userDetails.user;
  const [externalSignup, setExternalSignUp] = useState(false);
  const defaultFilledData = {
    firstName: "",
    lastName: "",
    email: "",
    externalId: "",
    provider: "email",
    phone: "",
    password: "",
    role: 0,
  };

  const [filledData, setFilledData] = useState(defaultFilledData);

  const gSignup = (e) => {
    e.preventDefault();
    window.open(
      process.env.REACT_APP_NODE_SERVER + "/auth/gSignup/callback",
      "_self"
    );
  };

  useEffect(() => {
    user && setExternalSignUp(true);
    setFilledData((prev) => {
      return {
        ...prev,
        firstName: user ? user.firstName : defaultFilledData.firstName,
        lastName: user ? user.lastName : defaultFilledData.lastName,
        email: user ? user.emails[0].value : defaultFilledData.email,
        externalId: user ? user.id : defaultFilledData.externalId,
        provider: user ? user.provider : defaultFilledData.provider,
      };
    });
  }, [userDetails.user]);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    post("/auth/signup", filledData)
      .then((res) => {
        console.log(res);
        displayMessage("Registered Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userDetails.isLoggedIn) {
    <Navigate to={"/"} />;
  }

  return (
    <div>
      <h1>This is Signup page.</h1>
      <Button variant="outlined" onClick={gSignup}>
        Continue with Google
      </Button>

      <TextField
        id="signup-name"
        label="First Name"
        name="firstName"
        value={filledData.firstName}
        onChange={eventHandler}
      />

      <TextField
        id="signup-name"
        label="Last Name"
        name="lastName"
        value={filledData.lastName}
        onChange={eventHandler}
      />

      <TextField
        id="signup-email"
        label="Email"
        name="email"
        disabled={externalSignup}
        value={filledData.email}
        onChange={eventHandler}
      />

      <TextField
        id="signup-phone"
        label="Phone"
        name="phone"
        value={filledData.phone}
        onChange={eventHandler}
      />

      <TextField
        id="signup-password"
        label="Password"
        name="password"
        value={filledData.password}
        disabled={externalSignup}
        onChange={eventHandler}
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filledData.role}
        label="Account Role"
        onChange={eventHandler}
        name="role"
      >
        <MenuItem value={0}>Customer</MenuItem>
        <MenuItem value={1}>Vendor</MenuItem>
        <MenuItem value={2}>Admin</MenuItem>
      </Select>

      <Button variant="outlined" onClick={signup}>
        Submit
      </Button>
    </div>
  );
}

export default Signup;
