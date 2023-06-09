import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../../App.js";
import loginGroceryProducts from "../../animations/login-grocery-products.json";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Paper from "@mui/material/Paper";
import Lottie from "react-lottie";
import loginAnimation from "../../animations/login.json";
import shop from "../../images/merchant/shop.png";
import shopAnimation from "../../animations/shop1.json";
import merchant1 from "../../animations/loginmap.json";
import merchant3 from "../../animations/m3.json";

import { get, post } from "../../utils/serverCall.js";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../../reducers/actions.js";


function MerchantLogin(userDetails) {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: merchant1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: merchant3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions5 = {
    loop: false,
    autoplay: true,
    animationData: shopAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [lottieToggle, setLottieToggle] = useState(true);


  useEffect(() => {

    const intervalID = setInterval(() => {

      setLottieToggle(lottieToggle => !lottieToggle)



    }, 3000);
    return () => clearInterval(intervalID);
  }, []);

  const gLogin = (event) => {
    event.preventDefault();
    window.open(process.env.REACT_APP_NODE_SERVER + "/auth/gLogin", "_self");
  };

  const doLogin = (e) => {
    e.preventDefault();
    post("/auth/login", filledData)
      .then((result) => {
        sessionStorage.setItem("id", result.id)
        showMessage("Login Success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const defaultFilledData = {
    email: "",
    password: "",
  };

  const [filledData, setFilledData] = useState(defaultFilledData);

  const eventHandler = (e) => {
    setFilledData({ ...filledData, [e.target.name]: e.target.value });
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userDetails.user && userDetails.user.temp === 0) {
      setIsLoggedIn(true);
    }
  }, [userDetails.user]);

  if (userDetails.isLoggedIn || isLoggedIn) {
    <Navigate to={"/"} />;
  }


  return (
    <>
      <Grid container sx={{ height: "100%", position: "absolute" }}>
        <Grid item xs={6} sx={{ backgroundColor: "white" }}></Grid>
        <Grid item xs={6} sx={{ backgroundColor: "rgb(243, 233, 100)" }}></Grid>
      </Grid>
      <div
        style={{
          zIndex: 1,
          position: "relative",
          height: "100%",
          marginTop: "5%",
        }}
      >
        <Grid container spacing={30}>
          <Grid item xs={4} style={{ marginTop: "130px" }}>
            {lottieToggle ? <Lottie options={defaultOptions} height={420} width={420} /> :
              <Lottie options={defaultOptions1} height={420} width={420} />

            }

          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ padding: "25px", borderRadius: "12px" }}>
              <div style={{ margin: "10px" }}>
                <img src={shop} style={{ maxWidth: "350px", maxHeight: "350px" }}></img>
                <div className="appHeadings">Login as a Vendor into LOKA</div>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    variant="outlined"
                    onClick={gLogin}
                    sx={{ width: "100%" }}
                    startIcon={
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="#FFFFFF"
                        xmlns="http://www.w3.org/2000/svg"
                        color="systemGrayscale00"
                        size="32"
                        className="css-bao86z"
                      >
                        <path
                          d="M28.667 16.292c0-.861-.071-1.727-.223-2.574H16.255v4.878h6.98a5.857 5.857 0 01-2.583 3.849v3.165h4.164c2.445-2.206 3.85-5.464 3.85-9.318z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M16.255 28.668c3.485 0 6.424-1.122 8.566-3.058l-4.164-3.165c-1.159.772-2.654 1.21-4.397 1.21-3.371 0-6.23-2.23-7.255-5.227H4.708v3.263c2.194 4.277 6.662 6.977 11.547 6.977z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M9 18.428a7.445 7.445 0 010-4.85v-3.263H4.708a12.454 12.454 0 000 11.376L9 18.428z"
                          fill="#FBBC04"
                        ></path>
                        <path
                          d="M16.255 8.347a7.1 7.1 0 014.957 1.899l3.69-3.617a12.558 12.558 0 00-8.647-3.295c-4.885 0-9.353 2.7-11.547 6.982L9 13.578c1.021-3.002 3.884-5.231 7.255-5.231z"
                          fill="#EA4335"
                        ></path>
                      </svg>
                    }
                  >
                    Continue with Google
                  </Button>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <hr />{" "}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    id="outlined-size-small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Email"
                    size="small"
                    name="email"
                    onChange={eventHandler}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <TextField
                    fullWidth
                    id="outlined-adornment-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Password"
                    size="small"
                    name="password"
                    onChange={eventHandler}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={doLogin}
                  >
                    Login
                  </Button>
                </div>
              </div>
              <div style={{ fontSize: "smaller" }}>
                Not an existing vendor ?{" "}
                <u className="linkHighlight">SignUp </u>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4} style={{ marginTop: "130px", marginLeft: "-100px" }}>


            <Lottie options={defaultOptions5}
              height={500} width={500}
            />


          </Grid>
        </Grid>
      </div>
    </>


  )
}

export default MerchantLogin;