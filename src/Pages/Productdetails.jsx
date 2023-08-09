import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
  Toast,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import Rating from "../Component/Rating";
import { FaCheck } from "react-icons/fa";
import "../Styles/Productdetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import StarsRating from "react-star-rate";

import { addToCart } from "../redux/action/cartActions";
import { useDispatch } from "react-redux";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const dispatch = useDispatch();
  const [review, setReview] = useState([]);
  const [loadingreview, setLoadingReview] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [qty, setQty] = useState(1);
  const [value, setValue] = useState(0);
  // const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [color, setColor] = useState();
  const [colorname, setColorName] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
 
  const [selling, setSelling] = useState();
  const [actual, setActual] = useState();
  const params = useParams();
  const { id } = params;
  const [image, setimage] = useState([]);

  const navigate = useNavigate();

  const getcolorCode = (code, color, curColor) => {
   
    setColor(code);
    setimage(curColor.image);
    //   toast(`selected color : ${color}`, {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //     className: 'toast-message'
    // });
    setColorName(color);
  };
  const sendData = (item) => {
    setimage(item.image);
  };

  const getSize = (w, h, size, sellingprice, actualPrice) => {
   
    setWidth(w);
    setHeight(h);
    setSize(size);
    
    setSelling(sellingprice);
    setActual(actualPrice);
   
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !value) {
      toast.error("Please enter comment and rating");
      return;
    }
    try {
      const { data } = await axios.post(
        `https://3.111.36.104/user/post-review/`,
        {
          user: userInfo.data[0].uid,
          product: id,
          ratings: value,
          name: userInfo.data[0].name,
          subject: comment,
          description: "",
        },
        {
          headers: { Authorization: `Bearer ${userInfo.access}` },
        }
      );

   
      toast.success("Review submitted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const addToCartHandler = () => {
    if (userInfo) {
      if (color == null) {
        toast.error("please slect color");
      } else if (size == null) {
        toast.error("please select Size");
      } else {
        dispatch(addToCart(id, qty, size, colorname));
        navigate("/cart");
        window.location.reload();

      


      }
    } else {
      navigate("/signin");
    }
  };

  const [{ loading, error, product, loadingCreateReview }, dispatchr] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatchr({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.post(
          `https://3.111.36.104/user/particular-product-details/`,
          {
            product_id: id,
          }
        );
        dispatchr({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        dispatchr({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();

    const reviewData = async () => {
      setLoadingReview(true);
      try {
        const resultReview = await axios.get(
          `https://3.111.36.104/user/particular-product-reviews/${id}/`
        );
        setReview(resultReview.data.data);
        setLoadingReview(false);
      } catch (err) {
        toast.error(err);
      }
    };
    reviewData();
    setSize(size);
  }, [id]);


const [size, setSize] = useState(1);

var fixwidth = product[0] &&  product[0].size_width_1
var fixheight =product[0] && product[0].size_height_1


const uid =userInfo &&  userInfo.data[0].uid;

// filter data trigered

console.log(uid,"dta trigered")


const filteredUsers = review.filter(user => user.user.uid ==uid );




var COLOR =product[0] &&  product[0].product_images[0]

  return loading ? (
    <div className="bg-dark">
    <div id="preloader" className="bg-dark">
      <div className="spinner">
        <span className="ball-1"></span>

        <span className="ball-2"></span>

        <span className="ball-3"></span>

        <span className="ball-4"></span>

        <span className="ball-5"></span>

        <span className="ball-6"></span>

        <span className="ball-7"></span>

        <span className="ball-8"></span>
      </div>
    </div>
  </div>
  ) : error ? (
    <h2>error</h2>
  ) : (
    <div>
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col md={12} sm={12} lg={6}>
            <img
              src={"https://3.111.36.104" + image}
              width="100%"
              alt={product[0].product_title}
              style={{ borderRadius: "20px" }}
            />
            <div className="related-image">
              <Swiper
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    Width: 375,
                  },
                  468: {
                    slidesPerView: 3,
                    Width: 468,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={50}
                slidesPerView={5}
                onSlideChange={() => console.log("slide change")}
             

                navigation={true}
                modules={[Navigation]}
              >
                {product[0].product_images.map((item) => {
                  return (
                    <SwiperSlide>
                      <img
                        src={"https://3.111.36.104" + item.image}
                        className="small-img"
                        onClick={() => sendData(item)}
                        onLoad={() => setimage(COLOR && COLOR.image)}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Col>
          <Col
            md={12}
            sm={12}
            lg={6}
            className="d-flex justify-content-center align-items-center mt-md-5 mt-sm-5"
          >
            <div className="w-100">
              <h1 style={{ textAlign: "left" }}>{product[0].product_title}</h1>
              <br />

              <p className="info_description">{product[0].description}</p>

              <Rating
                rating={product[0].rating}
                numReviews={product[0].numReviews}
              ></Rating>
              <hr />
              <div>
                <div className="d-flex">
                  <h3>color :</h3>{" "}
                  {colorname ? (
                    <p style={{ padding: "8px" }}>{colorname}</p>
                  ) : (
                   <p style={{ padding: "8px" }}>{ COLOR.color_name}</p>
                  )}
                </div>

                <p style={{ display: "flex" }}>
                  {product[0].product_images.map((curColor, index) => {
                    return (
                      <button
                        key={index}
                        style={{ backgroundColor: curColor.color_code }}
                        className={
                          color === curColor.color_code
                            ? "btnStyle active"
                            : "btnStyle"
                        }
                        onClick={() =>
                          getcolorCode(
                            curColor.color_code,
                            curColor.color_name,
                            curColor
                          )
                        }
                      >
                        {color === curColor.color_code ? <FaCheck /> : null}
                      </button>
                    );
                  })}
                </p>
              </div>
              <hr />
              <div className="d-flex">
                <h3>Size:</h3>
                <p style={{ padding: "7px" }}>W : {width ? width : fixwidth}</p>
                <p style={{ padding: "7px" }}>H : {height ? height : fixheight}</p>
              </div>
              <div className="d-flex">
                {product[0].size_lable_1 ? (
                  <button
              className={ size==1 ?"size-btn active-size":"size-btn "}
                    onClick={() =>
                      getSize(
                        product[0].size_width_1,
                        product[0].size_height_1,
                        1,
                        product[0].size_selling_price_1,
                        product[0].size_actual_price_1
                      )
                    }
                  >
                    {product[0].size_lable_1}
                  </button>
                ) : product[0].size_lable_1}
                {product[0].size_lable_2 ? (
                  <button
                  className={size==2 ?"size-btn active-size":"size-btn "}
                    onClick={() =>
                      getSize(
                        product[0].size_width_2,
                        product[0].size_height_2,
                        2,
                        product[0].size_selling_price_2,
                        product[0].size_actual_price_2
                      )
                    }
                  >
                    {product[0].size_lable_2}
                  </button>
                ) : null}
                {product[0].size_lable_3 ? (
                  <button
                  className={size==3 ?"size-btn active-size":"size-btn "}
                    onClick={() =>
                      getSize(
                        product[0].size_width_3,
                        product[0].size_height_3,
                        3,
                        product[0].size_selling_price_3,
                        product[0].size_actual_price_3
                      )
                    }
                  >
                    {product[0].size_lable_3}
                  </button>
                ) : null}
                {product[0].size_lable_4 ? (
                  <button
                  className={size==4 ?"size-btn active-size":"size-btn "}
                    onClick={() =>
                      getSize(
                        product[0].size_width_4,
                        product[0].size_height_4,
                        4,
                        product[0].size_selling_price_4,
                        product[0].size_actual_price_4
                      )
                    }
                  >
                    {product[0].size_lable_4}
                  </button>
                ) : null}
                {product[0].size_lable_5 ? (
                  <button
                  className={size==5 ?"size-btn active-size":"size-btn "}
                    onClick={() =>
                      getSize(
                        product[0].size_width_5,
                        product[0].size_height_5,
                        5,
                        product[0].size_selling_price_5,
                        product[0].size_actual_price_5
                      )
                    }
                  >
                    {product[0].size_lable_5}
                  </button>
                ) : null}
              </div>
              <hr />

              <Row>
                <Col className="d-flex align-items-center gap-3">
                  <p>Price : </p>

                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#17DD7E",
                    }}
                  >
                    ₹{selling ?  selling :product[0] &&  product[0].size_selling_price_1 }
                  </p>

                  <p
                    style={{
                      fontSize: "1rem",
                      textDecoration: "line-through",
                      color: "red",
                    }}
                  >
                    {" "}
                    ₹{" "}
                    {actual ? actual 
                     
                      :product[0] &&  product[0].size_actual_price_1}
                  </p>

                  {/* <p>{Math.round((((actual ? actual 
                     
                     :product[0] &&  product[0].size_actual_price_1)-(selling ?  selling :product[0] &&  product[0].size_selling_price_1))/product[0].size_actual_price_1)*100)}%Off</p> */}
                </Col>
              </Row>
              <hr />
              <div className="d-flex align-items-center justify-content-center">
                <button
                  onClick={addToCartHandler}
                  className="shop-collection-card-btn sign-btn"
                  id="cart-btn"
                >
                  {" "}
                  Add to cart
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="my-3">
          {loadingreview ? (
            <h1>Loding.....</h1>
          ) : error ? (
            <h2>error</h2>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <div className="customer-review">
                    <h2>Reviews</h2>

                    {review.length === 0 && <p>There is no review</p>}

                    <div className="review">
                      {review
                        .slice(0, 5)
                        
                        .map((review) => (
                          <div
                            className="list-review"
                            key={review.id}
                            style={{ borderBottom: "1px solid white" }}
                          >
                            <span clasName="mt-3">{review.user.name}</span>

                            <Rating
                              rating={review.ratings}
                              caption=" "
                            ></Rating>

                            <span>Subject : {review.subject}</span>

                            
                            <span>Post Date : {review.created_date}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className="my-3"
                    style={{
                      background: "#151515",
                      padding: "20px",
                      borderRadius: "15px",
                    }}
                  >
                    {filteredUsers.length == 0  &&  userInfo ?   (
                      <form onSubmit={submitHandler}>
                        <h2>Write a customer review</h2>

                        <div className="d-flex align-items-center">
                          <StarsRating
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                          />
                          <span>{value}</span>
                        </div>

                        

                        <Form.Group className=" align-items-md-center  d-md-flex m-3">
                          <Form.Label className="col-md-3 col-sm-12">
                            
                            Comment :
                          </Form.Label>
                          <textarea
                            type="textarea"
                            placeholder="Leave a comment here"
                            value={comment}
                            required
                            className="shop-collection-card-btn input-field col-md-8 col-sm-12"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>

                        <div className="mb-3">
                          <Button type="submit" className="sign-btn">
                            Submit
                          </Button>
                          {loadingCreateReview && <LoadingBox></LoadingBox>}
                        </div>
                      </form>
                    ) :null }

                {
                  filteredUsers.length >0 && <span>Review Submited </span>
                }

                {
                  !userInfo && <MessageBox>
                  Please{" "}
                  <Link
                    style={{ color: "#FFF" }}
                    to={`/signin?redirect=/product/${product.id}`}
                  >
                    Sign In
                  </Link>{" "}
                  to write a review
                </MessageBox>
                }
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductScreen;
