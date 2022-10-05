import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { displayError, displayMessage } from "../../utils/messages";
import { get, post } from "../../utils/serverCall";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import LocationSearchInput from "../../components/LocationAuto";
import { showError, showMessage } from "../../reducers/errorActions";

function Signup(userDetails) {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const [redirectHome, setRedirectHome] = useState(false);

  const navigate = useNavigate();
  const user = userDetails.user;
  const [externalSignup, setExternalSignUp] = useState(false);
  const defaultFilledData = {
    firstName: "",
    lastName: "",
    email: "",
    // externalId: "",
    provider: "email",
    phone: "",
    password: "",
    role: 0,
    address: "",
    latitude: "",
    longitude: "",
    // storeName: "",
  };

  const [filledData, setFilledData] = useState(defaultFilledData);

  const handleChange = (address) => {
    // setAddress(address);
    setFilledData((prev) => {
      return { ...prev, address };
    });
  };

  const trimInputs = () => {
    Object.keys(filledData).forEach(function (key) {
      if (typeof filledData[key] == "string") {
        filledData[key] = filledData[key].trim();
      }
    });
  };

  const checkEmpty = () => {
    let isValid = true;
    Object.keys(filledData).some((key) => {
      if (
        filledData[key] === "" ||
        filledData[key] === null ||
        filledData[key] === undefined
      ) {
        isValid = false;
        return true;
      }
    });
    return isValid;
  };

  const checkValidation = () => {
    let isValid = true;
    trimInputs();
    // if (!checkEmpty()) {
    //   displayError("Fill valid input");
    //   // showError("Fill valid input");
    //   // showMessage("hello");
    //   isValid = false;
    // }
    return isValid;
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      // setAddress(address);
      setFilledData((prev) => {
        return { ...prev, address };
      });
      getLatLng(results[0])
        .then((latLng) => {
          console.log("Success", latLng);
          setFilledData((prev) => {
            return { ...prev, latitude: latLng.lat, longitude: latLng.lng };
          });
          // setLatitude(latLng.lat);
          // setLongitude(latLng.lng);
        })
        .catch((error) => console.error("Error", error));
    });
  };

  const gSignup = (e) => {
    e.preventDefault();
    window.open(
      process.env.REACT_APP_NODE_SERVER + "/auth/gSignup/callback",
      "_self"
    );
  };

  useEffect(() => {
    user && setExternalSignUp(true);
    if (user) {
      setFilledData((prev) => {
        return {
          ...prev,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emails ? user.emails[0].value : defaultFilledData.email,
          externalId: user.id,
          provider: user.provider,
        };
      });
    }
  }, [userDetails.user]);

  // useEffect(() => {
  //   setRedirectHome(true);
  // }, [userDetails.isLoggedIn]);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    if (checkValidation()) {
      post("/auth/signup", filledData)
        .then((res) => {
          console.log(res);
          displayMessage("Registered Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (userDetails.isLoggedIn) {
    // console.log("redirect");
    return <Navigate to={"/"} />;
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

      {filledData.provider === "email" && (
        <TextField
          id="signup-password"
          label="Password"
          name="password"
          value={filledData.password}
          disabled={externalSignup}
          onChange={eventHandler}
        />
      )}

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
        {/* <MenuItem value={2}>Admin</MenuItem> */}
      </Select>

      {filledData.role == 1 && (
        <TextField
          id="signup-name"
          label="Store Name"
          name="storeName"
          value={filledData.storeName}
          onChange={eventHandler}
        />
      )}

      <LocationSearchInput
        handleChange={handleChange}
        handleSelect={handleSelect}
        address={filledData.address}
      />

      <Button variant="outlined" onClick={signup}>
        Submit
      </Button>
    </div>
  );
}

export default Signup;
