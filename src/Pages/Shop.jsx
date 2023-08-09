import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Product from "../Component/Product";
import Col from "react-bootstrap/Col";
import "../Styles/Shop.css";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Category from "../Component/Category";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SUB_CAT":
      return { ...state, subCategories: action.payload, loading: false };
    default:
      return state;
  }
};

const Shop = () => {
  const [catd, resultcat] = useState([]);

  const [{ loading, error, products, resultf }, dispatch] = useReducer(
    reducer,
    {
      products: [],
      resultf: [],
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "https://3.111.36.104/user/get-all-products/?page=1"
        );

        dispatch({ type: "FETCH_SUCCESS", payload: result.data.results });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <br />

      <Category />

      {/* 
  <div className='row'>
      <Container>
     <div className="homescreen">
     <h2  style={{padding:"20px", textAlign:'center'}}>All Products</h2>
     <div className="homescreen_products">
        {loading ? (
          <h2>Loading....</h2>
        ):error ? (
          <h2>Error</h2>
        ):(
          products.map((product) => (
            
               <Product key={product.id} product={product}></Product>
            
          ))
        )  }
        </div>
        </div>
        </Container>
     
     </div> */}
    </div>
  );
};

export default Shop;
