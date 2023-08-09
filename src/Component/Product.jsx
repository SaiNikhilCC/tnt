import React, { useEffect, useReducer, useState } from "react";
import "../Styles/Product.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Rating from "../Component/Rating";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { Wishlist } from "../Pages/Wishlist";
import { removeFromWishList } from "../redux/action/wishlistAction";
import { url } from "./../api";
import { addToWishList } from "../redux/action/wishlistAction";
import { useDispatch } from "react-redux";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, productw: action.payload, loading: false };
    default:
      return state;
  }
};

const Product = (props) => {
  const [{ loading, error, productw, loadingCreateReview }, dispatchr] =
    useReducer(reducer, {
      productw: [],
      loading: true,
      error: "",
    });

  const dispatch = useDispatch();

  const [productd, setProduct] = useState([]);

  const { product } = props;
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const Wishlist = (id, size, colorname) => {
    if (userInfo) {
      if (helloi == false) {
        dispatch(addToWishList(id, size, colorname));
        toast.success("Add to WishList");
        window.location.reload()
      } else {
        dispatch(removeFromWishList(product));
        toast.success("Remove to wishlist");
        window.location.reload();
      }
    } else {
      navigate("/signin");
    }
  };
  const id1 = product.id;
  const productSkuCode = product.sku_code;

  useEffect(() => {
    // Fetch wishlist data from the
    const getWishlist = async () => {
      dispatchr({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.post(
          `http://3.111.36.104/user/get-users-wishlist/`,
          {
            user_id: userInfo.data[0].uid,
          }
        );
        dispatchr({ type: "FETCH_SUCCESS", payload: data.data });
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getWishlist();
  }, []);

  const getproduct = () => {
    axios.get(`${url}get-all-products/`).then((res) => {
      setProduct(res.data.results);
    });
  };
  useEffect(() => {
    getproduct();
  }, []);

  const w1filter = productw.map((x) => x.product);

  var wishlistarray = w1filter.map((y) => y.id);
  var productarray = productd.map((x) => x.id);

  
  const helloi = productw.some(
    (item) => item.product.sku_code === productSkuCode
  );

  return (
    <div>
      <div>
        <div className="product" style={{ position: "relative" }}>
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <img
              className="card-img-top shop-collection-cards-card-image-top"
              style={{ width: "100%", height: "250px", borderRadius: "18px" }}
              src={"http://3.111.36.104"+ product.thumbnail}
              alt={product.thumbnail}
            />
          </Link>
          <div className="product_info">
            <p className="info_name">
              {product.product_title.length > 24
                ? product.product_title.slice(0, 24) + "..."
                : product.product_title}
            </p>
            <p className="info_description">
              {product.description.length > 60
                ? product.description.slice(0, 60) + "..."
                : product.description}
            </p>
            <b>₹{product.size_selling_price_1}</b>{" "}
            <del style={{ color: "red", fontSize: "13px" }}>
              {" "}
              ₹ {product.size_actual_price_1}
            </del>
            <b className="ms-2 text-success">{Math.round(((product.size_actual_price_1-product.size_selling_price_1)/product.size_actual_price_1)*100)}%Off</b>
            {product.available_quantity === 0 ? (
              <Button variant="light" disabled>
                Out of Stock
              </Button>
            ) : (
              <center></center>
            )}
          </div>

          {helloi ? (
            <AiFillHeart
              size={22}
              style={{
                position: "absolute",
                marginTop: "2px",
                right: "25px",
                color: "red",
                borderColor: "red",
              }}
              className="cursor-pointer"
              onClick={() => Wishlist(id1, 1, "Red")}
            />
          ) : (
            <AiOutlineHeart
              size={22}
              style={{
                position: "absolute",
                marginTop: "2px",
                right: "25px",
                color: "red",
                borderColor: "red",
              }}
              className="cursor-pointer"
              onClick={() => Wishlist(id1, 1, "Red")}
              title="Add to wishlist"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
