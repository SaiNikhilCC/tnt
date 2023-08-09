import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Cart.css";

//Actions
import { getcart as listCart } from "../redux/action/cartActions";
import { updateToCart, removeFromCart } from "../redux/action/cartActions";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../Component/CartItem";



const Cart = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCart = useSelector((state) => state.getCart);
  const { cartItems, loading, error } = getCart;

  useEffect(() => {
    dispatch(listCart());
  }, []);

  const qtyChangeHandler = (id, qty, sizeu) => {
    dispatch(updateToCart(id, qty, sizeu));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  



  const finalPrices = cartItems.map((i) => {
    const discountedPrice1 =
      i.size === 1 ? i.product.size_selling_price_1 * i.quantity : 0;
    const discountedPrice2 =
      i.size === 2 ? i.product.size_selling_price_2 * i.quantity : 0;
    const discountedPrice3 =
      i.size === 3 ? i.product.size_selling_price_3 * i.quantity : 0;
    const discountedPrice4 =
      i.size === 4 ? i.product.size_selling_price_4 * i.quantity : 0;
    const discountedPrice5 =
      i.size === 5 ? i.product.size_selling_price_5 * i.quantity : 0;
    const taxIncludedPrice =
      Number(discountedPrice1) +
      Number(discountedPrice2) +
      Number(discountedPrice3) +
      Number(discountedPrice4) +
      Number(discountedPrice5);
    return taxIncludedPrice;
  });

  const getCartSubTotal = () => {
    return finalPrices.reduce((a, b) => a + b, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((quantity, i) => Number(i.quantity) + quantity, 0);
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div className="cartscreen w-100 d-flex justify-content-center" style={{marginTop:"120px"}}>
      <div className="col-sm-12 col-md-12 col-lg-10 d-md-flex justify-content-center" id="cart-container">
      <div className="cartscreen_left col-md-8 col-sm-12">
        <h2 className="text-center">Shopping Cart</h2>

        { userInfo?<>
          {cartItems.length === 0 ? (
          <div>
            You Cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
        
        
        
        
        
        
        </>:<><h1>balo na </h1></>}
        
      </div>

      <div className="cartscreen_right col-md-4 col-sm-12">
        <div className="cartscreen_info">
          <p>Subtotal ({getCartCount()}) items</p>
          <hr />
          <div style={{ width: "100%" }} className="d-flex">
            <p className="d-flex w-100">
              <b className="d-flex w-100 justify-content-around">Total Amount : <span>{getCartSubTotal()} /-</span></b>{" "}
            </p>
           
          </div>
        </div>
        <div>
          <center>
            <button
              onClick={checkoutHandler}
              className="sign-btn"
              disabled={cartItems.length === 0}
            >
              Proceed to CheckOut
            </button>
          </center>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Cart;
