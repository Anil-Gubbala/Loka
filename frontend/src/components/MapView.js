import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import React from "react";
import { useSelector } from "react-redux";
import { get } from "../utils/serverCall";
import { CONSTANTS, REDUCER } from "../utils/consts";
import { isEqual } from "lodash";
// import Places from "./places";
// import Distance from "./distance";

//home is dynamic but center is fixed. we can merge the both to same.
export default function MapView(props) {
  const navigatorState = useSelector((state) => state.navigatorReducer);
  // const [location, setLocation] = useState({
  //   lat: CONSTANTS.DEFAULT_ADDRESS.coordinates[1],
  //   lng: CONSTANTS.DEFAULT_ADDRESS.coordinates[0],
  // });
  const [location, setLocation] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [vendors, setVendors] = useState([]);

  // const [home, setHome] = useState(); // delivery address. set by getting location from navigator.
  const [directions, setDirections] = useState();
  const mapRef = useRef();
  // const location = useMemo(() => ({ lat: 37.33, lng: -121.88 }), []); // It is the map center ? San Jose by Default or same as the home.
  const center = useMemo(() => ({ lat: 37.33, lng: -121.88 }), []);
  const options = useMemo(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  // useEffect(() => {
  //   setLocation({
  //     lat: CONSTANTS.DEFAULT_ADDRESS.coordinates[1],
  //     lng: CONSTANTS.DEFAULT_ADDRESS.coordinates[0],
  //   });
  // }, []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  // const houses = useMemo(() => generateHouses(center), [center]); // need to get nearby restaurants here.

  const fetchMerchants = (location, searchInput) => {
    location &&
      get("/customer/merchants", {
        location,
        searchInput,
      }).then((result) => {
        console.log("nearby stores", result);
        setVendors(result);
      });
  };

  // useEffect(() => {
  //   // console.log("navigator Change", navigatorState);
  //   const newLoc = navigatorState[REDUCER.LOCATION];
  //   const newSearch = navigatorState[REDUCER.SEARCHINPUT];
  //   if (newLoc) {
  //     console.log("new Location", {
  //       lng: newLoc.coordinates[0],
  //       lat: newLoc.coordinates[1],
  //     });
  //     // setLocation({ lng: newLoc.coordinates[0], lat: newLoc.coordinates[1] });
  //   }
  //   if (newSearch) {
  //     console.log("new Search", newSearch);
  //     setSearchInput(newSearch);
  //   }
  //   // fetchMerchants(newLoc, newSearch);
  // }, [navigatorState]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  // const initialRender = useRef(true);
  // const prevLocation = usePrevious(location);
  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   if (!isEqual(prevLocation, location)) {
  //     fetchMerchants(location, searchInput);
  //   }
  // }, [location, prevLocation]);

  const searchInitialRender = useRef(true);
  const prevNavigatorState = usePrevious(navigatorState);
  useEffect(() => {
    if (searchInitialRender.current) {
      searchInitialRender.current = false;
      return;
    }
    if (
      !isEqual(prevNavigatorState, navigatorState) &&
      navigatorState.location
    ) {
      console.log("navigator changed", navigatorState);
      const newLoc = navigatorState[REDUCER.LOCATION];
      const newSearch = navigatorState[REDUCER.SEARCHINPUT];
      fetchMerchants(newLoc, newSearch);
      console.log("new Location", newLoc);
      const geoLocation = {
        lng: newLoc.coordinates[0],
        lat: newLoc.coordinates[1],
      };
      setLocation(geoLocation);
      mapRef.current?.panTo(geoLocation);
    }
  }, [navigatorState, prevNavigatorState]);

  // const navInitialRender = useRef(true);
  // const prevSearchInput = usePrevious(searchInput);
  // useEffect(() => {
  //   if (navInitialRender.current) {
  //     navInitialRender.current = false;
  //     return;
  //   }
  //   if (!isEqual(prevSearchInput, searchInput)) {
  //     fetchMerchants(location, searchInput);
  //   }
  // }, [searchInput, prevSearchInput]);

  const fetchDirections = (house) => {
    if (!location) return; // if home is not set then no directions.

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        {/* <Places
          setHome={(position) => {
            setHome(position);
            mapRef.current?.panTo(position);
          }}
        /> */}
        {!location && <p>Enter the address of your home.</p>}
        {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {location && (
            <>
              <Marker
                position={location}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />
              <MarkerClusterer>
                {(clusterer) =>
                  vendors.map((vendor) => (
                    <Marker
                      key={vendor.location.coordinates[1]}
                      position={{
                        lat: vendor.location.coordinates[1],
                        lng: vendor.location.coordinates[0],
                      }}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(vendor);
                      }}
                    />
                  ))
                }
              </MarkerClusterer>
              <Circle center={location} radius={15000} options={closeOptions} />
              <Circle
                center={location}
                radius={30000}
                options={middleOptions}
              />
              <Circle center={location} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

// const generateHouses = (position) => {
//   const _houses = [];
//   for (let i = 0; i < 100; i++) {
//     const direction = Math.random() < 0.5 ? -2 : 2;
//     _houses.push({
//       lat: position.lat + Math.random() / direction,
//       lng: position.lng + Math.random() / direction,
//     });
//   }
//   return _houses;
// };