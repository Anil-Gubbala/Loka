import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import cost from "../../images/merchant/cost.png";
import "../../App.css";
import delivery from "../../images/merchant/delivery.png";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import Footer from "../../components/footer/footer";
import banner from "../../images/theme/banner.jpeg";
import banner1 from "../../images/theme/banner1.jpeg";
import banner2 from "../../images/theme/banner2.jpeg";
import { buttonUnstyledClasses } from "@mui/base";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import { CONSTANTS, REDUCER } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils/serverCall";
import { Navigate } from "react-router-dom";
import shoppingOrderConfirm from "../../animations/shopping-order-confirm.json";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

function SavedMerchants() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shoppingOrderConfirm,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigatorState = useSelector((state) => state.navigatorReducer);
  const navigate = useNavigate();
  const [location, setLocation] = useState(CONSTANTS.DEFAULT_ADDRESS);
  const [searchInput, setSearchInput] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [redirToMerchant, setRedirToMerchant] = useState(false);

  
  const vendors = [
    {
      id: 1,
      name: "Costco",
      image: cost,
      rating: "4.5",
      categories: ["grocery", "Frozen", "Meat"],
      driveTime: "12 - 15 min",
    },
    {
      id: 2,
      name: "Walmart",
      image: cost,
      rating: "3.5",
      categories: ["Dairy", "Meat"],
      driveTime: "21 - 25 min",
    },
    {
      id: 2,
      name: "Walmart",
      image: cost,
      rating: "3.5",
      categories: ["Dairy", "Meat"],
      driveTime: "21 - 25 min",
    },
  ];

  const onVendorClick = (vendorId) => {
    console.log(vendorId);
  };

  const fetchMerchants = (location, searchInput) => {
    get("/customer/merchants", { location, searchInput }).then(() => {
      console.log("fetched ");
    });
  };

   const saveMerchantIcon = () => {
    console.log("saved")
  };

   const redirectToMerchant = (merchant) => {
      setSelectedMerchant(merchant)
      setRedirToMerchant(true)
  };



  useEffect(() => {
    // console.log("navigator Change", navigatorState);
    const newLoc = navigatorState[REDUCER.LOCATION];
    const newSearch = navigatorState[REDUCER.SEARCHINPUT];
    if (newLoc) {
      console.log("new Location", newLoc);
      setLocation(newLoc);
    }
    if (newSearch) {
      console.log("new Search", newSearch);
      setSearchInput(newSearch);
    }
    // fetchMerchants(newLoc, newSearch);
  }, [navigatorState]);

  useEffect(() => {
    // console.log("new loc", location);
    // console.log("new search", searchInput);
    fetchMerchants(location, searchInput);
  }, [location, searchInput]);

if (redirToMerchant) {
    return <Navigate to={"/customermerchant"} />;
  }

  return (
    <>
 
    

      <div className="homeBanner" style={{ textAlign: "left" }}>
        <img src={banner1} height="220px"></img>
      </div>
     
      <div className="homeBanner1">
        <h1>Order products from saved merchants for <br/>pickup or delivery today</h1>
        <p>Whatever you want from local stores, brought right to your door.</p>
      </div>



      <div
        style={{
          textSizeAdjust: "none",
          fontSize: "31px",
          lineHeight: "40px",
          fontWeight: "normal",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        Select a saved store
      </div>

      <div className="row" style={{paddingLeft:"20px"}}>
        {vendors.map((vendor) => (
          <Paper
            key={vendor.id}
            elevation={3}
            sx={{
              maxWidth: "20%",
              borderRadius: "10px",
              padding: "0px !important",
              marginLeft: "30px",
              marginTop: "25px",
              cursor:"pointer"
            }}
          >
            <Grid container spacing={0}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "140px",
                  padding: "10px",
                }}
                title="Redirect to merchant"
                onClick={() => redirectToMerchant()}
              >
                <div
                  style={{
                    borderStyle: "solid",
                    borderWidth: "0.1rem",
                    borderColor: "#d3d3d3",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                >
                  <img
                    src={vendor.image}
                    style={{
                      borderColor: "black",
                      padding: "0px !important",
                      height: "100%",
                      width: "100%",
                    }}
                  ></img>
                </div>
              </Grid>
              <Grid
                container
                xs={8}
                sx={{
                  background: "#e5e8e8",
                  padding: "0px !important",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  padding: "10px",
                }}
              >
                <Grid item xs={6}>
                  <div style={{ textAlign: "left" }}>{vendor.name}</div>
                </Grid>
                 <Grid item xs={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      backgroundColor: "#ffffff",
                      borderRadius: "45px",
                      paddingTop: "2px",
                      paddingBottom: "3px",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        marginTop: "2px",
                        fontSize: "14px",
                      }}
                    >
                      {vendor.rating} &nbsp;
                    </div>
                    <div style={{color:"#FFD700"}}>
                      <StarPurple500SharpIcon fontSize="medium"/>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1} sx={{marginTop:"2px",opacity:"60%"}} title="Save Merchant"><BookmarkRoundedIcon color="" onClick={()=>saveMerchantIcon()} /></Grid>
                <Grid item xs={12}>
                  <div style={{ textAlign: "left", fontSize: "13px" }}>
                    {vendor.categories[0]}
                    {vendor.categories.slice(1, 2).map((v) => (
                      <>
                        {" - "}
                        {v}{" "}
                      </>
                    ))}{" "}
                    ..
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div style={{ textAlign: "left", fontSize: "13px" }}>
                    opening and close timings
                  </div>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "left", display: "flex" }}>
                    <img
                      src={delivery}
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                      }}
                    ></img>
                    &nbsp;
                    <div
                      style={{
                        color: "rgb(10 173 10)",
                        fontSize: "12px",
                        display: "inline-block",
                        marginTop: "5px",
                      }}
                    >
                      {vendor.driveTime}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
      <div style={{ marginTop: "5% " }}></div>
      <Footer />
    </>
  );
}

export default SavedMerchants;
