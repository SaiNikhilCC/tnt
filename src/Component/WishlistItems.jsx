import React, { useState } from "react";
import "../Styles/CartItem.css";
import { Link,useNavigate } from "react-router-dom";

const WishlistItems = ({ item, removeHandler }) => {
  const [size, setSize] = useState();
  const [price, setPeice] = useState();
  const navigate = useNavigate()

  const condition1 = item.size === 1 ? "S" : null;
  const condition2 = item.size === 2 ? "M" : null;
  const condition3 = item.size === 3 ? "L" : null;
  const condition4 = item.size === 4 ? "XL" : null;
  const condition5 = item.size === 5 ? "XXL" : null;

  const sizeu = item.size;

  const addToCartHandler = (data) => {
  
    

    navigate(`/wishlistorder`);

    localStorage.setItem("wi_list", JSON.stringify(data));
  };

  return (
    <div className="wishlist-container w-100">
      <div>
        <div className="wish-list d-flex align-items-center justify-content-between">
          <div className="thumb">
            <img
              style={{ width: "5rem" }}
              className="img-fluid rounded img-thumbnail"
              src={"https://apis.theneontribe.com" + item.product.thumbnail}
              alt={item.product_title}
            />
          </div>
          <div className="wishlist-info">
            <Link to={`/product/${item.product.id}`} className="cartitem_name">
              <p>{item.product.product_title}</p>
              <p>
                Size : {item.size === 1 ? "S" : null}
                {item.size === 2 ? "M" : null}
                {item.size === 3 ? "L" : null}
                {item.size === 4 ? "XL" : null}
                {item.size === 5 ? "XXL" : null}
              </p>
            </Link>
            <p>Color : {item.color}</p>
          </div>

          <p className="cartitem_price">
            ₹{item.size === 1 ? item.product.size_selling_price_1 : null}
            {item.size === 2 ? item.product.size_selling_price_2 : null}
            {item.size === 3 ? item.product.size_selling_price_3 : null}{" "}
            {item.size === 4 ? item.product.size_selling_price_4 : null}{" "}
            {item.size === 5 ? item.product.size_selling_price_5 : null}
          </p>
          <button
            style={{ float: "right" }}
            className="cartitem_deleteBtn"
            onClick={() => removeHandler(item.product)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={()=>addToCartHandler(item.product)}
          className="shop-collection-card-btn sign-btn"
          id="cart-btn"
          style={{ fontSize: "11px", padding: "5px" }}
        >
          Buy Now
        </button>
      </div>

      <hr />
    </div>
  );
};

export default WishlistItems;
