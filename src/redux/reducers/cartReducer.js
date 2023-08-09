import * as actionTypes from "../constants/cartConstants";

const cartItems = {
  loading: true,
  cartItems: [],
  error: null,
};

//GETIING CART VALUES
export const getCartReducer = (state = cartItems, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const obj = action.payload;
      console.log(obj);
      let x = [];
      x = state.cartItems.slice().concat(obj);
      console.log(x);
      return {
        ...state,
        cartItems: x,
      };

    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload[0].id) {
            return { ...item, quantity: action.payload[0].quantity };
          }
          return item;
        }),
      };

    case actionTypes.REMOVE_FROM_CART:
      console.log(state.cartItems);

      const datar = state.cartItems.filter((item) => {
        return item.product.id !== action.payload.id;
      });

      return {
        ...state,
        cartItems: datar,
      };

    case actionTypes.REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.GET_CART_REQUEST:
      return {
        loading: true,
        cartItems: [],
      };
    case actionTypes.GET_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };
    case actionTypes.GET_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
