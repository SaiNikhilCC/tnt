
import React, { useEffect, useState } from "react";
import CheckoutSteps from "../Component/CheckoutSteps";
import Modal from 'react-bootstrap/Modal';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {AiFillEye} from 'react-icons/ai'
const Customizerorderpay = () => {
    const [show, setShow] = useState(false);
  const navigate=useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const {id}=useParams()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo && userInfo.data[0].uid;
    const [getAddress, setAddress] = useState([]);
    
    const getparticularAddress = () => {
        axios
          .post(
            `https://3.111.36.104/user/particular-address-details/`,
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
      useEffect(()=>{
        getparticularAddress();
      },[])

      const createOrder = () => {
      
    
        var options = {
          key: "rzp_test_clcZrcRVXkqpH0",
          key_secret: "pMtzs9k7YF2TODQSEE51D1uy",
          amount: localStorage.getItem("finalPrice") * 100,
          currency: "INR",
          name: "THE NEON TRIBE",
          description: "for testing purpose",
          handler: function (response) {
            axios
              .post(
                `https://3.111.36.104/user/place-new-order-customizer/`,
                {
                  user: uid,
                  address: id,
                  total_amount:localStorage.getItem("finalPrice"),
                  payment_method: "online",
                  payment_done: true,
                  customized_product:localStorage.getItem("customid"),
                  quantity:localStorage.getItem("quantity"),
                  transaction_id: String(response.razorpay_payment_id),
                  is_paid:true,
                },
                {
                  headers: {
                    Authorization: `bearer ${userInfo.access} `,
                  },
                }
              )
              .then((res)=>{

               navigate(`/ordercustomizer/${res.data.data.id}`)
              })
            .catch((err)=>{
                console.log(err)
            })
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

  return (
    <div>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
    <div className="container small-container">
      <h1 className="my-3">Order Preview</h1>
      <Row className="cart-col">
        <Col md={12} xl={8} >
          <Card className="mb-3" style={{ backgroundColor: "#151515" ,width:"100%"}}>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
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
              <Link to="/placeordercustom/:id">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3" style={{ backgroundColor: "#151515",position:"relative",width:"100%" }}>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <div variant="flush" className="d-flex" >
              <Col md={4}>
                {/* <p  style={{position:"absolute",zIndex:'1',fontSize:"1.5rem",left:"100px",top:"32px"}}><AiFillEye  onClick={handleShow}/></p> */}
                          <img
                            style={{ width: "100px",border: "5px solid black"}}
                            className="img-fluid rounded img-thumbnail"
                            src={localStorage.getItem("imagedata")}
                            // alt={item.product_title}
                          />
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-center">
                          {" "}
                          <div>
                            <Link
                            //   to={`/product/${item.product.id}`}
                              className="cartitem_name"
                            >
                                <h5>Quantity  </h5>
                              <h5 className="d-flex text-center ms-4"> {localStorage.getItem("quantity")}
                                
                              </h5>
                            </Link>
                              
                          </div>
                        </Col>

                        <Col md={4} className="d-flex align-items-center justify-content-center">
                          {" "}
                          <div>
                            <Link
                            //   to={`/product/${item.product.id}`}
                              className="cartitem_name"
                            >
                                <h5>Total Price  </h5>
                              <h5 className="d-flex text-center ms-4"> {localStorage.getItem("finalPrice")}
                                
                              </h5>
                            </Link>
                              
                          </div>
                        </Col>
                       
              </div>
              {/* <Link to="/cart">Edit</Link> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={4}>
            <div className="cartscreen_right">
              <div className="cartscreen_info">
               
                <hr />
                <div style={{ width: "100%" }}>
                  <h4 className="d-flex justify-content-between">
                     Total Price : {localStorage.getItem("finalPrice")}
                  </h4>
                 
                 
                  
                </div>
              </div>

              
              

         

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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Customize Screen Shot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <img style={{width:"30rem"}} src={localStorage.getItem("imagedata")} />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>

   
  </div>
  )
}

export default Customizerorderpay

