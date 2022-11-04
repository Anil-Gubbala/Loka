import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Lottie from "react-lottie";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import TabPanel from '@mui/lab/TabPanel';
import money from "../../images/admin/money.png"
import order from "../../images/admin/order (1).png"
import review from "../../images/admin/reviews (2).png"
import ads from "../../images/admin/ads.png"
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useDemoData } from '@mui/x-data-grid-generator';
import './admin.css'
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';
import cardShopping from "../../animations/parcel-pickup-service.json";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const initialRows = [
  {
    id: 1,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 2,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 3,
    first: 'Gill',
    last: 'Martin',
  },
];

const columns = [
  {
    field: 'first',
    headerName: 'First',
    width: 140,
  },
  {
    field: 'last',
    headerName: 'Last',
    width: 140,
  },
];

export default function AdminVendorOrders() {
    

  const [rows, setRows] = React.useState(initialRows);
    const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: cardShopping,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dat=[{name:"sai",age:"2"},{name:"teja",age:"5"}];

   const rowSelected = (e) => {
        console.log(e)
    };

    return(<>
            <div style={{height:"100vh",backgroundColor:"#e7e4e4",width:"30vw",marginLeft:"70vw",position:"fixed"}}></div>
        <div style={{backgroundColor:"#24476a",position:"fixed",height:"100vh",width:"70vw"}}></div>
         <div style={{position:"relative",padding:"20px",marginLeft:"1%",marginRight:"1%"}}>
            <Grid container spacing={2} sx={{}}>
                <Grid item xs={12}>
                        <Grid container sx={{padding:"20px"}}>
                            <Grid item xs={9} sx={{textAlign:"left",color:"white"}}>
                                <Grid item xs={12}>
                                    <h2 style={{color:'white'}}>Orders of</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    customer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etccustomer orders etc
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={3} sx={{textAlign:"left"}}>
                                <Lottie options={defaultOptions} height={200} width={280} />
                            </Grid> */}
                            </Grid>
                </Grid>

            {/* *************************End of header******************** */}

                <Grid item xs={8.5}>
                <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px" }}>
                    <Grid container spacing={2} sx={{marginBottom:"15px"}}>
                        <Grid item xs={12} sx={{textAlign:"right"}}>
                              <div style={{paddingLeft:"20px"}}>
                                 <Button variant="outlined" startIcon={<KeyboardBackspaceTwoToneIcon />}>
                                    Go Back
                                    </Button>
                                </div>
                        </Grid>
                      
                    </Grid>
                    <div style={{ height: '65vh', width: '100%',background:"white", }}>
                    <DataGrid
                    components={{
                                Toolbar: GridToolbar,
                                }}
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    // rowsPerPageOptions={[5,10,15,20]}
                    onRowClick={rowSelected}
                    />
                    </div>
                </div>
                </Grid>

                <Grid item xs={3.5} sx={{}}>
                    <div style={{ height: '75vh', width: '100%',background:"white",padding:"20px",borderRadius:"10px",marginLeft:"15px"}}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                                  <Lottie options={defaultOptions} height={380} width={380} />
                            </Grid>
                                <Grid item xs={12} sx={{}}>
                                    Click an order to know the order details.
                                </Grid>
                          </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
          </>)
}