import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { url } from "./../api";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import "./../Styles/Contact.css";

const AddAddress = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo.data[0].uid;

  const [validated, setValidated] = useState(false);

  

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

  //for adding the address
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
    const number = address.mobile;
    const alternate = address.alternate_mobile;
    if (number.length >= 12 || number.length < 10) {
      toast.error("please Enter 10 digits mobile number");
    } else if (alternate.length >= 12 || alternate.length < 10) {
      toast.error("please Enter 10 digits Alternate mobile number");
    } else {
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
                "<h5 style='color:#1ddb4f'>" +
                "address added successfull" +
                "</h5>",
              showConfirmButton: false,
              timer: 1500,
            });
            allAddress();
            
          }
        })
        .catch((err) => console.log(err));
    }
  };

 

 

 

  const allAddress = () => {
    
    navigate("/shipping");
  };

  return (
    <div>
      
      <div className="container small-container" style={{marginTop:"100px"}}>
       

        <h1 className="my-3">Add Address</h1>

      
         
            <Form noValidate validated={validated} autocomplete="off">
              <Form.Group className="d-flex gap-5">
                <Form.Group
                  className="mb-3 col-md-6 col-sm-12 "
                  controlId="validationCustom01"
                >
                  <Form.Label className="col-md-3 col-sm-3">
                    Full Name
                  </Form.Label>
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
                <Form.Group
                  className="mb-3 col-md-6 col-sm-12"
                  controlId="validationCustom02"
                >
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
                  <Form.Label className="col-md-3 col-sm-3">
                    House Number
                  </Form.Label>
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
                  <Form.Label className="col-md-3 col-sm-3">
                    Area/Street
                  </Form.Label>
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
                <Form.Group
                  className="mb-3 col-md-6 col-sm-12"
                  controlId="city"
                >
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
                <Form.Group
                  className="mb-3 col-md-6 col-sm-12"
                  controlId="postalCode"
                >
                  <Form.Label className="col-md-3 col-sm-3">
                    Pin code
                  </Form.Label>
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
                <Form.Group
                  className="mb-3 col-md-6 col-sm-12"
                  controlId="country"
                >
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

                <Form.Group
                  className="mb-3 col-md-6 col-sm-12"
                  controlId="country"
                >
                  <Form.Label className="col-md-3 col-sm-3">
                    Alternate Mobile
                  </Form.Label>
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
          
       
      </div>
    </div>
  );
};

export default AddAddress;
