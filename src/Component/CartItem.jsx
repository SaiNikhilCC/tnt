import React, { useState } from "react";
import "../Styles/CartItem.css";
import { Link } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import { Row, Col } from "react-bootstrap";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  const [size, setSize] = useState();
  const [price, setPeice] = useState();

  const condition1 = item.size === 1 ? "S" : null;
  const condition2 = item.size === 2 ? "M" : null;
  const condition3 = item.size === 3 ? "L" : null;
  const condition4 = item.size === 4 ? "XL" : null;
  const condition5 = item.size === 5 ? "XXL" : null;

  const sizeu = item.size;

  return (
    <div className="align-items-center gap:2 d-sm-flex cart-head m-2" style={{borderBottom: "1px solid #5e5c5c",
      padding: "1rem 0rem"}}>
      
        <Col
          md={3} sm={2}
          className="d-flex align-items-center justify-content-md-center "
        >
          <img
            style={{ width: "6vw" }}
            className="img-fluid rounded "
            src={"https://apis.theneontribe.com" + item.product.thumbnail}
            alt={item.product_title}
          />{" "}
        </Col>

        <Col md={3} sm={4} className="d-flex">
         
          <div className="info">
            <Link to={`/product/${item.product.id}`} className="cartitem_name">
              {item.product.product_title}
            </Link>
           <p> Size : {item.size === 1 ? "S" : null}
            {item.size === 2 ? "M" : null}
            {item.size === 3 ? "L" : null} {item.size === 4 ? "XL" : null}{" "}
            {item.size === 5 ? "XXL" : null} </p> 
            <p>            Color : {item.color}</p>
          </div>
          
        </Col>

        <Col
          md={1} sm={2}
          className="d-flex align-items-center justify-content-md-center gap:1"
        >
          
          <p className="cartitem_price" style={{fontSize:"1.2rem",margin:"0px"}}>
            ₹{item.size === 1 ? item.product.size_selling_price_1 : null}
            {item.size === 2 ? item.product.size_selling_price_2 : null}
            {item.size === 3 ? item.product.size_selling_price_3 : null}{" "}
            {item.size === 4 ? item.product.size_selling_price_4 : null}{" "}
            {item.size === 5 ? item.product.size_selling_price_5 : null}
          </p>
        </Col>
        <Col
          md={3} sm={2}
          className="d-flex align-items-center justify-content-md-center"
        >
          <button
            variant="light"
            className="cart-btn"
            onClick={() =>
              qtyChangeHandler(item.product.id, item.quantity - 1, sizeu)
            }
            disabled={item.quantity === 1}
          >
            <i className="fas fa-minus-circle"></i>
          </button>
          <span style={{ padding: "2px" }}>{item.quantity}</span>
          <button
            variant="light"
            className="cart-btn"
            onClick={() =>
              qtyChangeHandler(item.product.id, item.quantity + 1, sizeu)
            }
            disabled={item.quantity === item.no_of_products}
          >
            <i className="fas fa-plus-circle"></i>
          </button>
        </Col>
        <Col md={2} sm={2}>
          <button
            className="cartitem_deleteBtn"
            onClick={() => removeHandler(item.product)}
          >
           <AiFillDelete/>
          </button>
        </Col>
      
      <hr />
    </div>

  );
};

export default CartItem;
