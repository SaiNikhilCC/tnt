import * as actionTypes from "../constants/wishlistConstants";

const wishListItems = {
  loading: true,
  wishListItems: [],
  error: null,
};

//GETIING CART VALUES
export const getWishListReducer = (state = wishListItems, action) => {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_REQUEST:
      return {
        loading: true,
        wishListItems: [],
      };
    case actionTypes.GET_WISHLIST_SUCCESS:
      return {
        loading: false,
        wishListItems: action.payload,
      };
    case actionTypes.GET_WISHLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionTypes.REMOVE_FROM_WISHLIST:
      console.log(state.wishListItems);

      const datar = state.wishListItems.filter((item) => {
        return item.product.id !== action.payload.id;
      });

      return {
        ...state,
        wishListItems: datar,
      };

    case actionTypes.GET_WISHLIST_REQUEST:
      return {
        loading: true,
        wishListItems: [],
      };
    case actionTypes.GET_WISHLIST_SUCCESS:
      return {
        loading: false,
        wishListItems: action.payload,
      };

    default:
      return state;
  }
};
