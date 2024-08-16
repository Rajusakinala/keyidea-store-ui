import { useCallback, useEffect, useRef, useState } from "react";
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
import { ProductDetails } from "./ProductDetails";

import Slider from "@mui/material/Slider";
export default function Dashboard() {
  const [data, setdata] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const newPage = useRef(1);
  const [page, setPage] = useState(1);
  const [resData, setResData] = useState();
  const [selected, setSelected] = useState(null);

  const [gender, setGender] = useState("Mens");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // price
  function valuetext(value) {
    return `${value}`;
  }

  const minDistance = 10;

  const [value1, setValue1] = useState([0, 100]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = async (event) => {
    console.log("event.target.value", event.target.value);
    setGender(event.target.value);

    setPageNumber(1);
    getData2(event.target.value);
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
    "all",
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
    // if (loading) {
    await axios
      .get(
        `https://key-idea-store-api.vercel.app/get-excel-data?pageNumber=${pageNumber}&gender=${gender}`
      )
      .then((res) => {
        // setPageNumber((pre) => pre + 1);
        setdata(res.data.data);
        setResData(res.data);
        console.log("res.data", res.data);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        setdata([]);
        setResData({});

        newPage.current = 1;

        console.log("err", err);
      });
    // } else {
    //   console.log("not loading");
    // }
  };
  const getData2 = async (gen = "Mens") => {
    // if (loading) {
    await axios
      .get(
        `https://key-idea-store-api.vercel.app/get-excel-data?pageNumber=${pageNumber}&gender=${gen}`
      )
      .then((res) => {
        // setPageNumber((pre) => pre + 1);
        setdata(res.data.data);
        setResData(res.data);

        setPage(res.data.pageNumber);

        console.log("res.data", res.data);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        setdata([]);
        setResData({});

        newPage.current = 1;

        console.log("err", err);
      });
    // } else {
    //   console.log("not loading");
    // }
  };
  const getDatawithPage = async (pag = 1) => {
    console.log("pag", pag);
    console.log("first", newPage.current);
    // if (loading) {
    await axios
      .get(
        `https://key-idea-store-api.vercel.app/get-excel-data?pageNumber=${newPage.current}&gender=${gender}`
      )
      .then((res) => {
        // setPageNumber((pre) => pre + 1);
        setdata(res.data.data);
        setResData(res.data);

        setPage(res.data.pageNumber);
        console.log("res.data", res.data);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        setdata([]);
        setResData({});

        newPage.current = 1;
        console.log("err", err);
      });
    // } else {
    //   console.log("not loading");
    // }
  };

  useEffect(() => {
    getData();
  }, []);
  let a = 1;

  const handleScroll = () => {
    // console.log(
    //   "scroll",
    //   window.innerHeight,
    //   document.documentElement.scrollTop,
    //   document.documentElement.offsetHeight
    // );
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 20
    )
      a = a + 1;
    if (a > 3) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Adds smooth scrolling
      });
      a = 1;
      console.log("page reached down, so loading more data...", pageNumber);
      let peg = pageNumber + 1;
      setPageNumber((prev) => prev + 1);
      console.log(
        "page reached down, so loading more data...bellow",
        pageNumber
      );
      newPage.current += 1;
      getDatawithPage(peg);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  return (
    <div>
      {!selected && (
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
                value={gender}
                onChange={handleChange}
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
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                  marks={marks}
                />
              </Box>
            </Menu>
          </Grid>
        </Grid>
      )}
      {!selected && (
        <Grid
          container
          sx={{
            margin: "10px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Grid
            item
            sx={{
              margin: "10px",
              // position: "absolute",
              // right: "10px",
            }}
          >
            Showing {data.length} results of page {newPage.current}
          </Grid>
        </Grid>
      )}
      {!selected && (
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
                    setSelected(prod);
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
      )}
      {selected && (
        <ProductDetails selected={selected} setSelected={setSelected} />
      )}
    </div>
  );
}
