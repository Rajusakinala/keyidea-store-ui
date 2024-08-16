import { Button, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  console.log("location", location);
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          onClick={() => {
            navigate(-1);
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
          <h2>Product code: {product.prod_sku}</h2>
          <h2>{product.prod_name}</h2>
          <h3>{product.prod_long_desc}</h3>
          <h4>Type : {product.prod_type}</h4>
          <h4>Sections: {product.prodmeta_section}</h4>
          <h4>Sub Category: {product.prod_subcategory}</h4>
          <h4>Price : {product.attr_14k_regular}</h4>
          <h4>
            Shipment takes <i>{product.prodmeta_ship_days}</i> days
          </h4>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
