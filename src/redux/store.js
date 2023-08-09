import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { getCartReducer } from "./reducers/cartReducer";
import { getWishListReducer } from "./reducers/wishlistReducer";
//Reducers

const reducer = combineReducers({
  getCart: getCartReducer,
  getwishlist: getWishListReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
