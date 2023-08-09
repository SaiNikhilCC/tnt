import { useState } from "react";
import * as actionTypes from "../constants/cartConstants";

import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = (id, qty, size, colorname) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let url = "http://3.111.36.104/user/add-item-to-cart/";
  let options = {
    method: "POST",
    url: url,

    data: {
      product: id,
      user: userInfo.data[0].uid,
      quantity: qty,
      is_controller: false,
      size: size,
      color: colorname,
    },
  };
  let response = await axios(options);

  let record = response.data;

  if (record.status == "200") {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: response.data.data,
    });
  } else {
    toast.error("Something went Wrong");
  }
};

export const updateToCart = (id, qty, sizeu) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  axios
    .post(`http://3.111.36.104/user/update-cart/`, {
      user: userInfo.data[0].uid,
      product: id,
      quantity: qty,
      size: sizeu,
    })
    .then((response) => {
      // Dispatch a success action
      dispatch({
        type: actionTypes.UPDATE_CART,
        payload: response.data.errors,
      });
    })
    .catch((error) => {
      // Dispatch an error action
      dispatch({
        type: "UPDATE_CART_ITEM_ERROR",
        payload: error.message,
      });
    });
};

//REMOVE CART ITEMS
export const removeFromCart = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  try {
    await axios
      .post(`http://3.111.36.104/user/remove-item-from-cart/`, {
        user: userInfo.data[0].uid,
        product: id.id,
      })
      .then((response) => {
        dispatch({
          type: actionTypes.REMOVE_FROM_CART,
          payload: id,
        });
      });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_FROM_CART_FAIL, error: error.message });
  }
};

//GET CART

export const getcart = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CART_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.post(
      `http://3.111.36.104/user/get-users-cart/`,
      {
        user: userInfo.data[0].uid,
      }
    );
    dispatch({
      type: actionTypes.GET_CART_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CART_FAIL,
      payload: error.message,
    });
  }
};
