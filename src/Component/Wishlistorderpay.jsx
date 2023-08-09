import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CheckoutSteps from "../Component/CheckoutSteps";
import axios from "axios";
import { url } from "./../api";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";

const Wishlistorderpay = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo.data[0].uid;
  const [validated, setValidated] = useState(false);


  const [getAddress, setGetAddress] = useState([]);

  const {id}=useParams()

  const [address, setAddress] = useState({
    user: uid,
    full_name: "",
    mobile: "",
    hno: "",
    area_street: "",
    alternate_mobile: "",
    pincode: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();
  //for getting the address
  const fetchAddress = () => {
    axios
      .post(
        `${url}particular-user-all-address/`,
        {
          user_id: uid,
        },
        {
          headers: {
            Authorization: `bearer ${userInfo.access} `,
          },
        }
      )
      .then((res) => {
        setGetAddress(res.data.data);
      });
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  //for adding the address
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("user", address.user);
    formdata.append("full_name", address.full_name);
    formdata.append("mobile", address.mobile);
    formdata.append("hno", address.hno);
    formdata.append("area_street", address.area_street);
    formdata.append(" alternate_mobile", address.alternate_mobile);
    formdata.append(" pincode", address.pincode);
    formdata.append(" city", address.city);
    formdata.append(" state", address.state);

    axios
      .post(`${url}add-address/`, formdata, {
        headers: {
          Authorization: `bearer ${userInfo.access} `,
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            background: "#151515",
            title:
              "<h5 style='color:#1ddb4f'>" + "Updated Personal info" + "</h5>",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(`/placeorder/${id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const editAddress = (id) => {
    navigate(`/editAddress/${id}`);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const deleteAddress = async (id) => {
    await axios
      .delete(`https://apis.theneontribe.com/user/remove-address/`, {
        headers: {
          Authorization: `bearer ${userInfo.access} `,
          // Add any other required headers here
        },
        data: { address_id: id },
      })
      .then((response) => {
        // API call was successful
        toast.success("Address deleted successfully");
        // Add any additional logic you need here
      })
      .catch((error) => {
        // Error occurred during the API call
        toast.error("Error:", error);
      });
  };

  const navigatepayement = (id) => {
    
    navigate(`/wishlispatment/${id}`);
  };

   localStorage.setItem("customid",id)
  return (
    <div className="mt-5">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
      <button  variant="primary"  onClick={()=>navigate("/addaddress")} className={getAddress.length > 0 ?"d-block sign-btn float-end":"d-none"}>
          Add address
        </button>

        <h1 className="my-3">Shipping Address</h1>

        {getAddress.length > 0 ? (
          <>
            <Container className="card-container ">
              {getAddress.map((item) => {
                return (
                  <div className="card" key={item.id}>
                    <div
                      className="card-body"
                      onClick={() => navigatepayement(item.id)}
                    >
                      <p>
                        <b>Full Name:</b> {item.full_name}
                      </p>
                      <p>
                        <b>mobile :</b> {item.mobile}
                      </p>
                      <p>
                        <b>House Number :</b> {item.hno}
                      </p>
                      <p>
                        <b>Area/Street :</b>
                        {item.area_street}
                      </p>
                      <p>
                        <b>City :</b>
                        {item.city}
                      </p>
                      <p>
                        <b>Pin Code :</b>
                        {item.pincode}
                      </p>
                      <p>
                        <b>Alternate Mobile :</b>
                        {item.alternate_mobile}
                      </p>
                      <p>
                        <b>State :</b>
                        {item.state}
                      </p>
                    </div>
                    <div className="btn-grp">
                      <button
                        className="card-btn"
                        style={{ color: "#37A0E6" }}
                        onClick={() => editAddress(item.id)}
                      >
                        <BiEdit />
                      </button>
                      <button
                        className="card-btn"
                        style={{ color: "red" }}
                        onClick={() => deleteAddress(item.id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </Container>
          </>
        ) : (
          <>
           <Form noValidate validated={validated} autocomplete="off">
              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6 col-sm-12 "  controlId="validationCustom01">
                  <Form.Label className="col-md-3 col-sm-3">Full Name</Form.Label>
                  <Form.Control
                    name="full_name"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className=" input-field col-md-8 col-sm-9"
                    autocomplete="false"
                    
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="validationCustom02">
                  <Form.Label className="col-md-3 col-sm-3">Mobile</Form.Label>
                  <Form.Control
                    name="mobile"
                    type="number"
                    placeholder="Enter mobile number"
                    onChange={handleInputChange}
                    required
                    className=" input-field col-md-8 col-sm-9"
                    
                    maxLength={12}
                    minLength={10}
                    
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6 col-sm-12">
                  <Form.Label className="col-md-3 col-sm-3">House Number</Form.Label>
                  <Form.Control
                    name="hno"
                    type="number"
                    onChange={handleInputChange}
                    placeholder="Enter house no"
                    required
                    className=" input-field col-md-8 col-sm-9"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3 col-md-6 col-sm-12">
                  <Form.Label className="col-md-3 col-sm-3">Area/Street</Form.Label>
                  <Form.Control
                    name="area_street"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter area/street"
                    required
                    className=" input-field col-md-8 col-sm-9"
                  />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="city">
                  <Form.Label className="col-md-3 col-sm-3">City</Form.Label>
                  <Form.Control
                    name="city"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    required
                    className=" input-field col-md-8 col-sm-9"
                  />
                                                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>
                <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="postalCode">
                  <Form.Label className="col-md-3 col-sm-3">Pin code</Form.Label>
                  <Form.Control
                    name="pincode"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter pin code"
                    required
                    className=" input-field col-md-8 col-sm-9"
                  />
                                                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="country">
                  <Form.Label className="col-md-3 col-sm-3">State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    onChange={handleInputChange}
                    required
                    className=" input-field col-md-8 col-sm-9"
                  />
                </Form.Group>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


                <Form.Group className="mb-3 col-md-6 col-sm-12" controlId="country">
                  <Form.Label className="col-md-3 col-sm-3">Alternate Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="alternate_mobile"
                    onChange={handleInputChange}
                    placeholder="Alternate Mobile nmuber"
                    required
                    maxLength="11"
                    className=" input-field col-md-8 col-sm-9"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>
              </Form.Group>

              <br />

              <div className="mb-3">
                <button
                  variant="primary"
                  type="submit"
                  className="sign-btn"
                  onClick={submitHandler}
                >
                  Continue
                </button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlistorderpay;
