import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Button,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";

import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  // const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const dataForRef = useRef("next");
  const priceRef = useRef([0, 10000]);

  const [resData, setResData] = useState();

  const gender = useRef("Mens");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // price
  function valuetext(value) {
    console.log("value", value);
    return `${value}`;
  }

  const minDistance = 10;

  const [value1, setValue1] = useState([0, 100]);

  const handleChange1 = (event, newValue, activeThumb) => {
    console.log("newValue", newValue);
    priceRef.current = [newValue[0] * 100, newValue[1] * 100];
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: 0,
      label: "$0",
    },

    {
      value: 100,
      label: "$1000",
    },
  ];

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    pageRef.current = 1;
    getData();
  };
  const handleChangeGender = async (event) => {
    pageRef.current = 1;
    gender.current = event.target.value;
    getData();
  };

  // styles
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [styles, setStyles] = useState([]);
  const handleChangestyle = (event) => {
    const {
      target: { value },
    } = event;
    setStyles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const styleNames = [
    "Blue Diamond",
    "Diamond",
    "Tantalum",
    "Rose Gold",
    "Wedding Band",
    "Carbon Fiber",
    "White Gold",
    "Yellow Gold",
  ];

  const getData = async () => {
    console.log("priceRef", priceRef.current);
    await axios
      .post(
        // `https://key-idea-store-api.vercel.app/get-excel-data?pageNumber=${pageRef.current}&gender=${gender.current}`,
        // { price: priceRef.current }
        `http://localhost:4000/get-excel-data?pageNumber=${pageRef.current}&gender=${gender.current}`,
        { price: priceRef.current }
      )
      .then((res) => {
        setdata(res.data.data);
        // console.log("data@", data, res.data.data);
        // setdata([...data, ...res.data.data]);
        // if (pageRef.current == 1) {
        //   setdata(res.data.data);
        // } else if (dataForRef.current == "next") {
        //   setdata(
        //     [...data, ...res.data.data].slice(
        //       -(data.length + res.data.data.length)
        //     )
        //   );
        // } else if (dataForRef.current == "pre") {
        //   setdata(
        //     [...res.data.data, ...data].slice(
        //       0,
        //       data.length + res.data.data.length
        //     )
        //   );
        // }

        setResData(res.data);

        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        setdata([]);
        setResData({});

        pageRef.current = 1;

        console.log("err", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  let a = 1;
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      a = a + 1;
      console.log("a", a);
      if (a === 3) {
        dataForRef.current = "next";
        window.scrollTo({
          top: 80,
          behavior: "instant", //smooth,
        });
        a = 1;
        console.log(
          "page reached down, so loading more data...",
          pageRef.current
        );

        pageRef.current += 1;
        getData();
      }
    } else if (
      (document.documentElement.scrollTop <= 0) &
      (pageRef.current !== 1)
    ) {
      console.log("top reach Api call");
      dataForRef.current = "pre";
      pageRef.current -= 1;
      getData();
    } else {
      console.log("else");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender.current}
              onChange={handleChangeGender}
              label="Gender"
            >
              <MenuItem value="Mens">Mens</MenuItem>
              <MenuItem value="Womens">Womens</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item>
          <FormControl sx={{ width: 300, marginTop: "20px" }}>
            <InputLabel id="demo-multiple-checkbox-label">Styles</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={styles}
              onChange={handleChangestyle}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {styleNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={styles.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ mt: "23px" }}>
          <Button
            size="large"
            variant="outlined"
            onClick={handleClick2}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            id="basic-button"
          >
            {" "}
            Price filter
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box sx={{ width: 300, p: 3, py: 5 }}>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                // valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                marks={marks}
              />
            </Box>
          </Menu>
          <Button
            size="large"
            sx={{ mx: 2 }}
            variant="contained"
            onClick={() => {
              priceRef.current = [0, 10000];
              setValue1([0, 100]);
              pageRef.current = 1;
              gender.current = "Mens";
              getData();
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "end",
          position: "sticky",
          top: "20px",
        }}
      >
        <Grid
          item
          sx={{
            margin: "15px",
            // position: "absolute",
            // right: "10px",
          }}
        >
          Showing {data.length} results of page {pageRef.current}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {data.map((prod, ind) => {
          return (
            <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
              <div
                className="productCard"
                onClick={() => {
                  navigate("/product-details", {
                    state: prod,
                  });
                }}
                style={{
                  maxHeight: "100%",
                  padding: "10px",
                }}
              >
                <img
                  // width="300px"
                  style={{
                    maxWidth: "100%",

                    display: "block",
                  }}
                  src="https://ion.bluenile.com/sets/Jewelry-bn/194489/NOP/Images/LS_stage_0.jpg"
                  alt="image_loading"
                />
                <h5>id : {prod.prod_sku}</h5>
                <h5>{prod.prod_name}</h5>
                <h6>{prod.prod_type}</h6>
                <h6>Price : {prod.attr_14k_regular}</h6>
              </div>
            </Grid>
          );
        })}
        {data.length === 0 && (
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item>No Data</Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
