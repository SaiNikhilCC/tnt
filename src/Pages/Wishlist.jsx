import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getwishlist as listWishList } from "../redux/action/wishlistAction";
import { Link } from "react-router-dom";

import { removeFromWishList } from "../redux/action/wishlistAction";

import WishlistItems from "../Component/WishlistItems";

export const Wishlist = () => {
  const dispatch = useDispatch();

  const getwishlist = useSelector((state) => state.getwishlist);
  const { wishListItems, loading, error } = getwishlist;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    dispatch(listWishList());
  }, []);

  const removeHandler = (id) => {
    dispatch(removeFromWishList(id));
  };

  return (
    <>
      <div className="cartscreen w-100 d-flex justify-content-center">
        <div className="w-100">
          {userInfo ? (
            <>
              {wishListItems.length === 0 ? (
                <div>
                  Your Wish List is empty <Link to="/">Go Back</Link>
                </div>
              ) : (
                wishListItems.map((item) => (
                  <WishlistItems
                    key={item.product.id}
                    item={item}
                    removeHandler={removeHandler}
                  />
                ))
              )}
            </>
          ) : (
            <>
              <h1>b m </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};
