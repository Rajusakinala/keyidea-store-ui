/* eslint-disable react/prop-types */
// import React from 'react'

import { Button, Grid } from "@mui/material";

export const ProductDetails = ({ selected, setSelected }) => {
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          onClick={() => {
            setSelected(null);
          }}
          variant="outlined"
        >
          Go back
        </Button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img
            // width="300px"
            style={{
              maxWidth: "100%",
              // maxHeight: "100%",
              border: "2px solid gray",
              borderRadius: "10px",
              display: "block",
            }}
            src="https://ion.bluenile.com/sets/Jewelry-bn/194489/NOP/Images/LS_stage_0.jpg"
            alt="image_loading"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>Product code: {selected.prod_sku}</h2>
          <h2>{selected.prod_name}</h2>
          <h3>{selected.prod_long_desc}</h3>
          <h4>Type : {selected.prod_type}</h4>
          <h4>Sections: {selected.prodmeta_section}</h4>
          <h4>Sub Category: {selected.prod_subcategory}</h4>
          <h4>Price : {selected.attr_14k_regular}</h4>
          <h4>
            Shipment takes <i>{selected.prodmeta_ship_days}</i> days
          </h4>
        </Grid>
      </Grid>
    </div>
  );
};
