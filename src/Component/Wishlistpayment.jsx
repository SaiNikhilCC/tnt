
import React, { useEffect, useState } from "react";
import CheckoutSteps from "../Component/CheckoutSteps";
import Modal from 'react-bootstrap/Modal';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Wishlistpayment = () => {
    const [show, setShow] = useState(false);
  const navigate=useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
  
  const {id}=useParams()
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo && userInfo.data[0].uid;
    const [getAddress, setAddress] = useState([]);
    const [coupon, setCoupon] = useState([]);
    const [couponid, setCouponid] = useState();
    const [finalamt, setfinalamt] = useState();
    const [OrderId,setId]=useState();
    const wishlistitem = JSON.parse(localStorage.getItem("wi_list"))
  
   
    const getparticularAddress = () => {
        axios
          .post(
            `http://3.111.36.104/user/particular-address-details/`,
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
          amount:(finalamt ?  wishlistitem.size_selling_price_1 - finalamt : wishlistitem && wishlistitem.size_selling_price_1)*100,
          currency: "INR",
          name: "THE NEON TRIBE",
          description: "for testing purpose",
          handler: function (response) {
            axios
              .post(
                `http://3.111.36.104/user/create-order/`,
                {
                  user: uid,
                  address: id,
                  is_coupon_applied:false,
                  total_amount:finalamt ? wishlistitem && wishlistitem.size_selling_price_1 - finalamt : wishlistitem && wishlistitem.size_selling_price_1,
                  payment_done: true,
                  payment_method:"online",
                  quantity:"1",
                  transaction_id: String(response.razorpay_payment_id),
                  is_paid:true,
                  coupon:couponid,
                },
                {
                  headers: {
                    Authorization: `bearer ${userInfo.access} `,
                  },
                }
              )
              .then((res)=>{
            const orid= res.data.data.id

               axios
               .post(
                 "http://3.111.36.104/user/add-order-items/",
                 {
                   order:res.data.data.id,
                   quantity:1,
                   product:wishlistitem && wishlistitem.id ,
                   color: "red",
                   size:1,
                 },
                 {
                   headers: {
                     Authorization: `bearer ${userInfo.access} `,
                   },
                 }
                
               )
               .then((res)=>{
                if (res.status == 200) {

                  navigate(`/order/${orid}`);

                  toast.success("order is placed");

                }
               })
             
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
      const getCoupon = () => {
        axios.get("http://3.111.36.104/user/get-coupons/").then((res) => {
          setCoupon(res.data.data);
        });
      };

      useEffect(()=>{
getCoupon()
      },[])

      const couponApply = (copamt, id,min_price) => {
        if(min_price <= wishlistitem.size_selling_price_1){
          setfinalamt(copamt);
          setCouponid(id);
          toast.success("coupon applied successfully");
    
        }else{
          toast.error(`this coupon is valid for minimum purchase of ${min_price}`);
    
    
        }
       
    
      };

  return (
    <div style={{marginTop:"70px"}}>
        
    
    <div className="container small-container ">
      <h1 className="">Order Preview</h1>
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
                            src={wishlistitem && "http://3.111.36.104"+wishlistitem.thumbnail}
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
                              <h5 className="d-flex text-center ms-4">1
                                
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
                              <h5 className="d-flex text-center ms-4"> {wishlistitem && wishlistitem.size_selling_price_1
}
                                
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
                     Total Price : {wishlistitem && wishlistitem.size_selling_price_1
}
                  </h4>

                  <p className="d-flex justify-content-between">
                    <b>
                      {finalamt ? (
                        <button onClick={handleShow} style={{ cursor: "pointer" }} className="coupon">
                          Coupon Code
                        </button>
                      ) : (
                        <button onClick={handleShow} style={{ cursor: "pointer" }}  className="coupon">
                          Select Coupon
                        </button>
                      )}
                    </b>
                    <p> {finalamt ? <>&#8377;- {finalamt}/-</> : "Coupon not applied"} </p>
                  </p>
                 
                 <h5>Final amount : {finalamt ?wishlistitem && wishlistitem.size_selling_price_1
-finalamt :wishlistitem && wishlistitem.size_selling_price_1
}</h5>
                  
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
                        couponApply(i.max_price, i.id,i.min_price_for_coupon_avail);
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

   
  </div>
  )
}

export default Wishlistpayment

