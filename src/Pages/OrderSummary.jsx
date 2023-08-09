import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../Component/MessageBox";
import { url } from "../api";
import Swal from "sweetalert2";


const OrderSummary = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const params = useParams();
  const { id } = params;

  const [ordersdata, setOrderdata] = useState([]);
  const [orderitem, setOrderitem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `https://apis.theneontribe.com/user/order-details/`,
          {
            order_id: id,
          },

          { headers: { Authorization: `bearer ${userInfo.access}` } }
        );
        setOrderdata(data.data);
        console.log(data.data.order_items);
        setOrderitem(data.data.order_items);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
    if (!userInfo) {
      return navigate("/login");
    }
  }, []);

  const hello = ordersdata.address ? ordersdata.address.full_name : "Loding";

  const datacheck = ordersdata.address ? ordersdata.order_items : "Loading";
// code for cencel Order
  const cancelOrder = () => {
    
axios.post(
        `${url}request-for-order-cancellation/`,
        { order_id: id },
        { headers: { "Authorization": `Bearer ${userInfo.access}` } }
      )
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            background: "#151515",
            title:
              "<h5 style='color:#1ddb4f'>" + "Request send for cancellation" + "</h5>",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload()
        }
      })
      .catch((err) => console.log(err));
  };
  const returnOrder = () => {
    
    axios.post(
            `${url}request-order-return/`,
            { order_id: id },
            { headers: { "Authorization": `Bearer ${userInfo.access}` } }
          )
          .then((res) => {
            if (res.status == 200) {
              Swal.fire({
                position: "top-middle",
                icon: "success",
                background: "#151515",
                title:
                  "<h5 style='color:#1ddb4f'>" + "Request send for Return" + "</h5>",
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload()
            }
          })
          .catch((err) => console.log(err));
      };
    

  // code for cencel Order


  return (
    <div>
      <div className="container small-container " style={{marginTop:"100px"}}>
        <h1 className="my-3">Order {id}</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3" style={{ backgroundColor: "#151515",width:"100%" }}>
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
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

                {/* {ordersdata.order_deliveredAt ? (
                  <MessageBox variant="success">
                    Delivered at {ordersdata.order_deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )} */}
                <MessageBox>
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
                  
                  
                 
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-3" style={{ backgroundColor: "#151515",width:"100%" }}>
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {ordersdata.payment_method}
                  <strong></strong>
                </Card.Text>
                {ordersdata.payment_done ? (
                  <MessageBox variant="success">
                     Payment Done
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3" style={{ backgroundColor: "#151515",width:"100%" }}>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <div variant="flush">
                  {
                   
                      <div variant="flush">
                        {orderitem.map((item) => (
                          <div key={item.id}>
                            <div className="align-items-center d-flex justify-content-between">
                              <Col md={3}>
                                <img
                                  style={{ width: "100px" }}
                                  className="img-fluid rounded img-thumbnail"
                                  src={
                                    "https://apis.theneontribe.com" +
                                    item.product.thumbnail
                                  }
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
                                  <span className="order-color">
                                    {" "}
                                    Size : {item.size === 1 ? "S" : null}
                                    {item.size === 2 ? "M" : null}
                                    {item.size === 3 ? "L" : null}{" "}
                                    {item.size === 4 ? "XL" : null}{" "}
                                    {item.size === 5 ? "XXL" : null} &nbsp;{" "}
                                  </span>
                                  <span className="order-color">
                                    Color : {item.color}
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
                    
                  }
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

export default OrderSummary;
