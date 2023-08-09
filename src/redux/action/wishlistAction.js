import * as actionTypes from "../constants/wishlistConstants";
import axios from "axios";

export const addToWishList = (id, size, colorname) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let url = "http://3.111.36.104/user/add-to-wishlist/";
  let options = {
    method: "POST",
    url: url,

    data: {
      product: id,
      user: userInfo.data[0].uid,
      size: size,
      color: colorname,
    },
  };
  let response = await axios(options);

  let record = response.data;

  if (record.status == "200") {
    dispatch({
      type: actionTypes.ADD_TO_WISHLIST,
      payload: response.data.data,
    });
  } else {
    toast.error("Something went Wrong");
  }
};

//REMOVE CART ITEMS
export const removeFromWishList = (id) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  try {
    await axios
      .post(`http://3.111.36.104/user/remove-from-wishlist/`, {
        product: id.id,
        user: userInfo.data[0].uid,
      })
      .then((response) => {
        dispatch({
          type: actionTypes.REMOVE_FROM_WISHLIST,
          payload: id,
        });
      });
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FROM_WISHLIST_FAIL,
      error: error.message,
    });
  }
};

export const getwishlist = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_WISHLIST_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await axios.post(
      `http://3.111.36.104/user/get-users-wishlist/`,
      {
        user_id: userInfo.data[0].uid,
      }
    );
    dispatch({
      type: actionTypes.GET_WISHLIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_WISHLIST_FAIL,
      payload: error.message,
    });
  }
};
