import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import dataAnalysis from "../../animations/data-analysis.json";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import testingDone from '../../images/admin/testing-done.png';
import reviews from '../../images/admin/reviews.png';
import waiting from '../../images/admin/waiting.png';
import approved from '../../images/admin/approved.png';
import order from '../../images/admin/order.png';
import pending from '../../images/admin/pending.png';
import graphBar from '../../images/admin/graph-bar.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      // text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Customers',
      data: [0,1,5,0,0,0,0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};

function AdminHome() {
   const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


   const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: dataAnalysis,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    return (
      <>
        <div style={{backgroundColor:"#e7e4e4",position:"fixed",height:"40vh",width:"100vw"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"35vh",width:"100vw",borderBottomLeftRadius:"45%",borderBottomRightRadius:"5%"}}></div>
        <div style={{height:"60vh",backgroundColor:"#e7e4e4",width:"100vw",marginTop:"40vh",position:"fixed"}}></div>

        <div style={{position:"relative"}}>
          <div style={{padding:"15px"}}>
            <Grid container spacing={0} sx={{paddingLeft:"30px"}}>
              <Grid item xs={8} >
                <Grid item xs={12} style={{color:"white",fontSize:"40px",fontWeight:"600px",textAlign:"left",marginBottom:"15px"}}>
                    Dashboard
                </Grid>
                <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'left',fontWeight:"600",marginBottom:"15px"}}>
                    Welcome back to the Dashboard.
                </Grid>
                <Grid item xs={12} style={{color:"white",fontSize:"16px",textAlign:'left'}}>
                    See quick links and overviews of Loka platform, new accounts, total vendors, users and more.
                </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Lottie options={defaultOptions} height={200} width={500} />
                </Grid>
            </Grid>
          </div>
          <Grid container spacing={2} sx={{padding:"20px"}}>
            <Grid item xs={8} >
              <Paper style={{height:"60vh",borderRadius:"15px",padding:"20px"}}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Customers" value="1" />
                            <Tab label="Vendors" value="2" />
            
                        </TabList>
                      </Box>
        <TabPanel value="1">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Customer onboarding frequency on Loka</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={data} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container style={{height:"90%",width:"90%"}}>
                      <Grid item xs={12} >
                          <div style={{fontSize:"30px",textAlign:"left"}}>Vendor onboarding frequency on Loka</div>
                      </Grid>
                      <Grid item xs={12} >
                        <div style={{height:"90%",width:"90%"}}>
                          <Line options={options} data={data} />
                          </div>
                      </Grid>
                  </Grid>
        </TabPanel>
        
      </TabContext>

               
              </Paper>
            </Grid>
            {/* -------------------------------------------left 1--------------------------------------------- */}
            <Grid item xs={2}>
              <Grid item xs={12} style={{marginBottom:"2vh",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",backgroundColor:"rgb(215 229 242)",borderRadius:"15px"}}>
                    <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <PeopleAltRoundedIcon sx={{height:"4vh",width:"4vh"}}/>
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Users</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>56</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"4vh"}} >

                      </Grid>

                       <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid>

                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid>
                  </Grid>
                  </Paper>
              </Grid>
            {/* -----------------------------------------------left2------------------------------------------------- */}
             
              
              <Grid item xs={12} style={{marginBottom:"20px",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",backgroundColor:"rgb(215 229 242)",borderRadius:"15px"}}>
                   <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                           <img src={order} style={{height:"5vh",width:"5vh",textAlign:"left"}} />
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Orders</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>43</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"1.5vh"}} >

                      </Grid>

                       {/* <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid> */}

                      
                  </Grid>
                  <Grid item xs={12} style={{opacity:"30%",bottom:"0px"}}>
                        
                      </Grid>
                  </Paper>
              </Grid>
            </Grid>
            {/* -------------------------------------------right 1--------------------------------------------- */}
            <Grid item xs={2}>
        

               <Grid item xs={12} style={{marginBottom:"20px",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",backgroundColor:"rgb(215 229 242)",borderRadius:"15px"}}>
                       <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <img src={reviews} style={{height:"4vh",width:"4vh",textAlign:"left"}} />
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Reviews</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "7vh",textAlign: "center",marginTop:"2vh"}}>66</div>
                      </Grid>
                      
                      <Grid item xs={12} style={{marginTop:"4vh"}} >

                      </Grid>

                       {/* <Grid item xs={2} >
                            <img src={testingDone} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Approved users"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={waiting} style={{height:"4vh",width:"4vh",textAlign:"left"}} title="Users pending for approval"/>
                      </Grid>

                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid> */}
                  </Grid>
                  </Paper>
              </Grid>
              
              <Grid item xs={12} style={{marginBottom:"2vh",cursor:"pointer"}}>
                  <Paper style={{height:"29vh",backgroundColor:"rgb(215 229 242)",borderRadius:"15px",}}> 
                  <Grid container sx={{padding:"20px"}}>
                      <Grid item xs={2} >
                          <StorefrontRoundedIcon sx={{height:"4vh",width:"4vh"}}/>
                      </Grid>
                      <Grid item xs={10} >
                            <div style={{fontSize: "30px",marginTop: "-0.5vh",textAlign: "right"}}>Vendors</div>
                      </Grid>
                      <Grid item xs={12} >
                            <div style={{fontSize: "60px",textAlign: "center",marginTop:"2vh"}}>24</div>
                      </Grid>
                      
                        <Grid item xs={12} style={{marginTop:"4vh"}}>

                      </Grid>

                       <Grid item xs={2} >
                            <img src={approved} style={{height:"4.5vh",width:"4.5vh",textAlign:"left"}} title="Approved vendors"/>
                      </Grid>
                      <Grid item xs={2}  >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>20</div>
                      </Grid>
                       <Grid item xs={4}  >
                            
                      </Grid>
                      <Grid item xs={2} >
                            <img src={pending} style={{height:"3.5vh",width:"3.5vh",textAlign:"left",marginTop:"2px"}} title="Vendors pending for approval"/>
                      </Grid>
                    
                      <Grid item xs={2} >
                            <div style={{fontSize: "20px",marginLeft:"20px",marginTop:"10px"}}>4</div>
                      </Grid>
                  </Grid></Paper>
              </Grid>
            </Grid>
            
           
          </Grid>
        </div>
      </>
    );
  }

export default AdminHome;
