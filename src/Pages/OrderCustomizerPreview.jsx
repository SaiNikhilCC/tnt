import axios from "axios";

import React, { useEffect, useState } from "react";

import { Card, Col, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import MessageBox from "../Component/MessageBox";

import { url } from "../api";

import Swal from "sweetalert2";

const OrderCustomizerPreview = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const params = useParams();

  const { id } = params;

  const [ordersdata, setOrderdata] = useState([]);

  const [orderitem, setOrderitem] = useState([]);

  const [returnStatus, setReturnStatus] = useState("Return Order");

  const [disable, setDisable] = useState(false);

  const [cancelStatus, setCancelStatus] = useState("cancel Order");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `https://apis.theneontribe.com/user/particular-order-details-for-customizer/`,

          {
            order_id: id,
          },

          { headers: { Authorization: `bearer ${userInfo.access}` } }
        );

        setOrderdata(data.data);

        // console.log(data.data);

        setOrderitem(data.data.customized_product);

       
      } catch (error) {
        toast.error(error);
      }
    };

    fetchData();

    if (!userInfo) {
      return navigate("/login");
    }
  }, []);

  const datacheck = ordersdata.address
    ? ordersdata.customized_product
    : "Loading";

  // code for cencel Order

  const cancelOrder = () => {
    axios
      .post(
        `${url}customizer-order-request-for-order-cancellation/`,

        { order_id: id },

        { headers: { Authorization: `Bearer ${userInfo.access}` } }
      )

      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            position: "top-middle",

            icon: "success",

            background: "#151515",

            title:
              "<h5 style='color:#1ddb4f'>" +
              "Request send for cancellation" +
              "</h5>",

            showConfirmButton: false,

            timer: 1500,

          });
          window.location.reload()
          setCancelStatus("product cancelled");

          setDisable(true);
        }
      })

      .catch((err) => console.log(err));
  };

  const returnOrder = () => {
    axios
      .post(
        `${url}customizer-order-request-order-return/`,

        { order_id: id },

        { headers: { Authorization: `Bearer ${userInfo.access}` } }
      )

      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            position: "top-middle",

            icon: "success",

            background: "#151515",

            title:
              "<h5 style='color:#1ddb4f'>" +
              "Request send for Return" +
              "</h5>",

            showConfirmButton: false,

            timer: 1500,
          });
          window.location.reload()
          setReturnStatus("request for return order");

          setDisable(true);
        }
      })

      .catch((err) => console.log(err));
  };

  // code for cencel Order

  return (
    <div>
      <div className="container small-container" style={{marginTop:"100px"}}>
        <h1 className="my-3">Customizer Order {id}</h1>

        <Row>
          <Col md={8}>
            <Card
              className="mb-3"
              style={{ backgroundColor: "#151515", width: "100%" }}
            >
              <Card.Body>
                <Card.Title>Shipping Address</Card.Title>

                <Card.Text>
                  <strong>Name : </strong>
                  {ordersdata.address
                    ? ordersdata.address.full_name
                    : "Loading"}{" "}
                  <br />
                  <strong>Address: </strong>
                  {ordersdata.address ? ordersdata.address.hno : "Loading"}{" "}
                  {ordersdata.address
                    ? ordersdata.address.area_street
                    : "Loading"}
                  ,{ordersdata.address ? ordersdata.address.city : "Loading"},{" "}
                  {ordersdata.address ? ordersdata.address.pincode : "Loading"},
                  {ordersdata.address ? ordersdata.address.state : "Loading"} .
                  <br />
                  <strong>mobile No : </strong>
                  {ordersdata.address
                    ? ordersdata.address.mobile
                    : "Loading"}, <br />
                  <strong>Alternate numbers : </strong>
                  {ordersdata.address
                    ? ordersdata.address.alternate_mobile
                    : "Loading"}
                </Card.Text>

                
                  <MessageBox variant="success">
                  {ordersdata.order_status == 1 && "Order Placed"}

{ordersdata.order_status == 2 && "Order Confirmed"}

{ordersdata.order_status == 3 && "Order Shipped"}

{ordersdata.order_status == 4 && "On The Way"}

{ordersdata.order_status == 5 && "Order Delivered"}

{ordersdata.order_status == 10 && "Request For Return"}

{ordersdata.order_status == 20 &&
  "Request For Cancellation"}

{ordersdata.order_status == 100 && "Order Returned"}

{ordersdata.order_status == 200 && "Order Canceled"}
                  </MessageBox>
               

                <div className="status-btn d-flex gap-3">

  {ordersdata.order_status == 3 || ordersdata.order_status == 4  ?<> <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For Cancellation
                      </button> <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For Return
                      </button> </>  : null  }


                  {ordersdata.order_status == 1 && <button
                        className="btn btn-danger"
                        disabled={disable}
                        onClick={cancelOrder}
                      >
                        Request For Cancellation
                      </button>  }

                      {ordersdata.order_status == 5 &&  <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For Cancellation
                      </button>  }

                      {ordersdata.order_status == 5 && <button
                        className="btn btn-danger"
                        disabled={disable}
                        onClick={returnOrder}
                      >
                        Request For Return
                      </button>  }

                      {ordersdata.order_status == 1 && <button
                        className="btn btn-danger"
                        disabled="disabled"
                        onClick={returnOrder}
                      >
                        Request For Return
                      </button>  }


                      {ordersdata.order_status == 20 && <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For Cancellation
                      </button>  }

                      {ordersdata.order_status == 20 && <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For Return
                      </button>  }

                      {ordersdata.order_status == 10 && <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For return
                      </button>  }

                      {ordersdata.order_status == 2 &&  <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                      Request For return
                      </button>
                      }
  
                     {ordersdata.order_status == 2 && 
                     <button
                     className="btn btn-danger"
                     disabled={disable}
                     onClick={cancelOrder}
                   >
                     Request For Cancellation
                   </button> } 

                      {ordersdata.order_status == 10 && <button
                        className="btn btn-danger"
                        disabled="disabled"
                       
                      >
                     Request For Cancellation
                      </button>  }
                  {/* {ordersdata.is_delivered && ordersdata.is_delivered ? (
                    <>
                      <button
                        className="btn btn-danger"
                        disabled
                        onClick={cancelOrder}
                      >
                        Cancel Order
                      </button>

                      <button
                        className="btn btn-primary"
                        disabled
                        onClick={returnOrder}
                      >
                        Return order
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-danger"
                        disabled={disable}
                        onClick={cancelOrder}
                      >
                        {cancelStatus}
                      </button>

                      <button
                        className="btn btn-primary"
                        disabled={disable}
                        onClick={returnOrder}
                      >
                        {returnStatus}
                      </button>
                    </>
                  )} */}
                </div>
              </Card.Body>
            </Card>

            <Card
              className="mb-3"
              style={{ backgroundColor: "#151515", width: "100%" }}
            >
              <Card.Body>
                <Card.Title>Payment</Card.Title>

                <Card.Text>
                  <strong>Method:</strong> {ordersdata.payment_method}
                  <strong></strong>
                </Card.Text>

                {ordersdata.payment_done ? (
                  <MessageBox variant="success">Payment Done</MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card
              className="mb-3"
              style={{ backgroundColor: "#151515", width: "100%" }}
            >
              <Card.Body>
                <Card.Title>Items</Card.Title>

                <div variant="flush">
                  <>
                    <div variant="flush">
                     

                      <div className="align-items-center d-flex justify-content-between">
                        <Col md={3}>
                          <img
                            style={{ width: "100px" }}
                            className="img-fluid rounded img-thumbnail"
                            src={"https://apis.theneontribe.com" + orderitem.image}
                          ></img>{" "}
                        </Col>

                        <Col md={3} className="d-flex">
                          {" "}
                          <div>
                            <Link to={`/product/`} className="cartitem_name">
                              <p className="d-flex">{orderitem.text}</p>
                            </Link>

                            <span className="order-color ">
                              Size : {orderitem ? orderitem.size : null}
                            </span>

                            <span className="order-color ms-3">
                              Color :{" "}
                              {orderitem.color && orderitem.color.color_name}
                            </span>
                          </div>
                        </Col>

                        <Col
                          md={3}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <span
                            style={{ padding: "2px" }}
                            className="order-color"
                          >
                            quantity : {orderitem.quantity}
                          </span>{" "}
                        </Col>

                        <Col
                          md={2}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {" "}
                          <p className="cartitem_price">
                            ₹{orderitem && orderitem.price}
                            /-
                          </p>
                        </Col>
                      </div>

                      <hr />
                    </div>
                  </>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <div className="cartscreen_right">
              <div className="cartscreen_info">
                <p style={{ textAlign: "center" }}>
                  Subtotal ({ordersdata.quantity}) items
                </p>

                <hr />

                <div style={{ width: "100%" }}>
                  <p style={{ float: "left" }}>
                    <b>Total Amount :</b>{" "}
                    <span>&#8377;{ordersdata.total_amount} /-</span>
                  </p>

                  <br />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderCustomizerPreview;
