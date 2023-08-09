import React, { useEffect, useState } from "react";
import CheckoutSteps from "../Component/CheckoutSteps";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import { getcart as listCart } from "../redux/action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";


const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getAddress, setAddress] = useState([]);

  const [navpagechanger, setNavpagechanger] = useState();

  const  orderId=navpagechanger;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo.data[0].uid;

  const [coupon, setCoupon] = useState([]);
  const getCart = useSelector((state) => state.getCart);
  const { cartItems, loading, error } = getCart;

  const params = useParams();
  const { id } = params;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [finalamt, setfinalamt] = useState();
  const [couponid, setCouponid] = useState();
  const [couponcode,setcouponcode]=useState()
  

  const getparticularAddress = () => {
    axios
      .post(
        `https://apis.theneontribe.com/user/particular-address-details/`,
        {
          address_id: id,
        },
        {
          headers: {
            Authorization: `bearer ${userInfo.access} `,
          },
        }
      )
      .then((res) => {
        setAddress(res.data.data);
      });
  };

  useEffect(() => {
    dispatch(listCart());

    getCoupon();
  }, []);

  const getCoupon = () => {
    axios.get("https://apis.theneontribe.com/user/get-coupons/").then((res) => {
      setCoupon(res.data.data);
    });
  };

  useEffect(() => {
    getparticularAddress();
  }, []);

  const createOrder = () => {
    var amount = totalfinaldata;
    var quality = getCartCount();

    var options = {
      key: "rzp_test_clcZrcRVXkqpH0",
      key_secret: "pMtzs9k7YF2TODQSEE51D1uy",
      amount: amount * 100,
      currency: "INR",
      name: "THE NEON TRIBE",
      description: "for testing purpose",
      handler: function (response) {
        axios
          .post(
            `https://apis.theneontribe.com/user/create-order/`,
            {
              user: uid,
              address: id,
              is_coupon_applied: false,
              total_amount: amount,
              payment_method: "online",
              payment_done: true,
              quantity: quality,
              coupon: couponid,
              transaction_id: String(response.razorpay_payment_id),
            },
            {
              headers: {
                Authorization: `bearer ${userInfo.access} `,
              },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              setNavpagechanger(res.data.data.id);
              const orid= res.data.data.id
              cartItems.map((i) => {
                axios
                  .post(
                    "https://apis.theneontribe.com/user/add-order-items/",
                    {
                      order: res.data.data.id,
                      quantity: i.quantity,
                      product: i.product.id,
                      color:i.color,
                      size:i.size,
                    },
                    {
                      headers: {
                        Authorization: `bearer ${userInfo.access} `,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      axios
                        .post(
                          "https://apis.theneontribe.com/user/empty-users-cart/",
                          {
                            user: uid,
                          },
                          {
                            headers: {
                              Authorization: `bearer ${userInfo.access} `,
                            },
                          }
                        )
                        .then((res) => {
                          if (res.status == 200) {
                            navigate(`/order/${orid}`);
                            toast.success("order is placed");
                          }
                        });
                    }
                  });
              });
            } else {
              toast.error("order not created");
            }
          });
        // alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "shaukmuzeef",
        email: "muzeef@codeconnex.com",
        contact: "9959456647",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#151515",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
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



  const couponApply = (copamt,coupdfsadf, id,min_price) => {
    if(min_price <= getCartSubTotal()){
      setcouponcode(coupdfsadf)
      setfinalamt(copamt);
      setCouponid(id);
      toast.success("coupon applied successfully");

    }else{
      toast.error(`this coupon is valid for minimum purchase of ${min_price}`);


    }
   

  };

  const totalfinaldata = finalamt
    ? getCartSubTotal() - Number(finalamt)
    : getCartSubTotal();

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Order Details</h1>
        <Row className="cart-col">
          <Col md={12} xl={8} >
            <Card className="mb-3" style={{ backgroundColor: "#151515",width:"100%" }}>
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>
                <Card.Text>
                  <strong>Name : </strong>
                  {getAddress.full_name} <br />
                  <strong>Address: </strong>
                  {getAddress.hno} {getAddress.area_street},{getAddress.city},{" "}
                  {getAddress.pincode},{getAddress.state}.<br />
                  <strong>mobile No : </strong>
                  {getAddress.mobile}, <br />
                  <strong>Alternate numbers : </strong>
                  {getAddress.alternate_mobile}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="mb-3" style={{ backgroundColor: "#151515",width:"100%" }}>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <div variant="flush">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="align-items-center d-flex justify-content-between">
                        <Col md={3}>
                          <img
                            style={{ width: "100px" }}
                            className="img-fluid rounded img-thumbnail"
                            src={"https://apis.theneontribe.com" + item.product.thumbnail}
                            alt={item.product_title}
                          ></img>{" "}
                        </Col>
                        <Col md={3} className="d-flex">
                          {" "}
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="cartitem_name"
                            >
                              <p className="d-flex">
                                {item.product.product_title}
                              </p>
                            </Link>
                            <span className="order-color"> Size : {item.size === 1 ? "S" : null}
                            {item.size === 2 ? "M" : null}
                            {item.size === 3 ? "L" : null}{" "}
                            {item.size === 4 ? "XL" : null}{" "}
                            {item.size === 5 ? "XXL" : null} &nbsp; </span>
                            <span className="order-color">Color : {item.color}</span>
                          </div>
                        </Col>

                        <Col
                          md={3}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <span style={{ padding: "2px" }} className="order-color">
                            {" "}
                            quantity : {item.quantity}
                          </span>{" "}
                        </Col>
                        <Col
                          md={2}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {" "}
                          <p className="cartitem_price">
                            ₹
                            {item.size === 1
                              ? item.product.size_selling_price_1
                              : null}
                            {item.size === 2
                              ? item.product.size_selling_price_2
                              : null}
                            {item.size === 3
                              ? item.product.size_selling_price_3
                              : null}{" "}
                            {item.size === 4
                              ? item.product.size_selling_price_4
                              : null}{" "}
                            {item.size === 5
                              ? item.product.size_selling_price_5
                              : null}{" "}
                            /-
                          </p>
                        </Col>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <Link to="/cart">Edit</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} xl={4}>
            <div className="cartscreen_right">
              <div className="cartscreen_info">
                <p style={{ textAlign: "center" }}>
                  Subtotal ({getCartCount()}) items
                </p>
                <hr />
                <div style={{ width: "100%" }}>
                  <p className="d-flex justify-content-between">
                    <b>Total Amount :</b><span>&#8377; {getCartSubTotal()} /-</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <b>
                      {finalamt ? (
                        <button onClick={handleShow} style={{ cursor: "pointer" }} className="coupon">
                           {couponcode}
                        </button>
                      ) : (
                        <button onClick={handleShow} style={{ cursor: "pointer" }}  className="coupon">
                          Select Coupon
                        </button>
                      )}
                    </b>
                    <p> {finalamt ? <>&#8377;- {finalamt}/-</> : "Coupon not applied"} </p>
                  </p>
                  <p className="d-flex justify-content-between">
                    <b>Sub Total Amount :</b><span>&#8377; {totalfinaldata} /-</span>
                  </p>
                  
                </div>
              </div>

              
              

              {finalamt ? (
                <>
                  <div style={{ width: "100%" }}>
                    <p style={{ float: "left" }}>
                      <b> </b>
                    </p>
                    <p style={{ float: "right", color: "red" }}>
                      <b style={{ color: "#FFF" }}>You Save :</b>{" "}
                      <b> &#8377; {finalamt} /- </b>
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className=" justify-content-center">
                <center>
                  <button onClick={() => createOrder()} className="sign-btn">
                    &nbsp; Payment to proceed
                  </button>
                </center>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Coupons</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <h6 style={{ textAlign: "center" }}>BEST OFFERS FOR YOU</h6>
          {coupon.map((i) => {
            return (
              <div
                key={i.id}
                style={{
                  border: "1px solid red",
                  borderRadius: "15px",
                  padding: "10px",
                  marginTop: "6px",
                }}
              >
                <p
                  style={{
                    color: "#FFF",
                    textAlign: "justify",
                  }}
                >
                  {i.coupon_description}
                  <hr />
                </p>
                <p style={{ color: "#FFF" }}>
                  Coupon Code : <b>{i.coupon_code}</b>{" "}
                </p>
                <p>
                  <ul>
                    <li>This offer is penalized for you</li>
                    <li>Maximum instant discount of {i.max_price}</li>
                    <li>
                      Applicable for minimum purchase of instant{" "}
                      {i.min_price_for_coupon_avail}
                    </li>
                  </ul>
                </p>
                <p>
                  <center>
                    <button
                      type="submit"
                      className="sign-btn"
                      onClick={() => {
                        couponApply(i.max_price,i.coupon_code, i.id,i.min_price_for_coupon_avail);
                        handleClose();
                      }}
                    >
                      Apply Now
                    </button>
                  </center>
                </p>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlaceOrderScreen;
