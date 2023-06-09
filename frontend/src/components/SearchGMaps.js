import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  //   position.appendChild(script);
}

const autocompleteService = { current: null };

export default function SearchGMaps({ input, callback }) {
  // console.log(input, "input ");

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
        // server call.
      }, 200),
    []
  );

  // called when input is changing
  React.useEffect(() => {
    let active = true;

    // can comment for other impls
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      // console.log("inputempty", value);
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        // console.log("valu", value);

        if (value) {
          newOptions = [value];
        }

        if (results) {
          // console.log("results", results);
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    setInputValue(input);
  }, [input]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300, background: "white" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      freeSolo
      value={value}
      inputValue={inputValue}
      onChange={(event, newValue) => {
        // console.log(options, value, inputValue);
        if (newValue && newValue.description) {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          callback(newValue);
        } else {
          // console.log(value.description);
          // setInputValue(value.description);
          // setValue("h");
          // setOptions([]);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        // console.log("typing");
      }}
      renderInput={(params) => {
        // console.log("render input", params);
        return (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
            <TextField
              {...params}
              label="Location"
              fullWidth
              variant="filled"
            />
          </Box>
        );
      }}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );
        // console.log("matches", parts);

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
