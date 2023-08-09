import React, { useState, useEffect } from "react";
import { url } from "../api";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";

import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

const EditAddress = () => {
  const { id } = useParams();
  const navigate = new useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  var uid = userInfo.data[0].uid;
  // const [address,setAddress] = useState({});
  const initialvalues = {
    full_name: "",
    mobile: "",
    hno: "",
    area_street: "",
    alternate_mobile: "",
    pincode: "",
    city: "",
    state: "",
  };
  const [values, setvalue] = useState(initialvalues);

  const getAddress = () => {
    axios
      .post(
        `${url}particular-address-details/`,
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
        setvalue(res.data.data);
        
        // console.log(address)
      });
  };

  //  const [full_name, setName] = useState(allAddress.full_name);
  //  const [mobile, setMobile] = useState(allAddress.mobile);
  //  const [hno, setHouse] = useState(allAddress.hno);
  //  const [area_street, setArea] = useState(allAddress.area_street);
  //  const [alternate_mobile, setAlternet] = useState(allAddress.alternate_mobile);
  //  const [pincode, setPincode] = useState(allAddress.pincode);
  //  const [city, setCity] = useState(allAddress.city);
  //  const [state, setState] = useState(allAddress.state);
  // const [full_name, setName] = useState();
  //  const [mobile, setMobile] = useState();
  //  const [hno, setHouse] = useState();
  //  const [area_street, setArea] = useState();
  //  const [alternate_mobile, setAlternet] = useState();
  //  const [pincode, setPincode] = useState();
  //  const [city, setCity] = useState();
  //  const [state, setState] = useState();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setvalue({ ...values, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();


    axios
      .post(
        `https://3.111.36.104/user/edit-address/`,
        {
          address_id: id,
          full_name: values.full_name,
          mobile: values.mobile,
          hno: values.hno,
          area_street: values.area_street,
          alternate_mobile: values.alternate_mobile,
          pincode: values.pincode,
          city: values.city,
          state: values.state,

          is_home: true,
          user: uid,
        },
        {
          headers: {
            " Authorization": `bearer ${userInfo.access} `,
          },
        }
      )
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            background: "#151515",
            title: "<h5 style='color:#1ddb4f'>" + "address Updated" + "</h5>",
            showConfirmButton: false,
            timer: 1500,
          });
          getAddress();
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <React.Fragment>
      <Container className="small-container" style={{marginTop:"80px"}}>
        <div>
          <h1 className="my-3 text-center">Edit Address</h1>
          <div>
            <Form>
              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6 ">
                  <Form.Label className="col-md-3">Full Name</Form.Label>
                  <input
                    name="full_name"
                    type="text"
                    value={values.full_name}
                    onChange={handleInput}
                    placeholder="Enter your full name"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label className="col-md-3">Mobile</Form.Label>
                  <input
                    name="mobile"
                    type="text"
                    value={values.mobile}
                    placeholder="Enter mobile number"
                    onChange={handleInput}
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label className="col-md-3">House Number</Form.Label>
                  <input
                    name="hno"
                    type="text"
                    value={values.hno}
                    onChange={handleInput}
                    placeholder="Enter house no"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-md-6" controlId="area">
                  <Form.Label className="col-md-3">Area/Street</Form.Label>
                  <input
                    name="area_street"
                    type="text"
                    value={values.area_street}
                    onChange={handleInput}
                    placeholder="Enter area/street"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6" controlId="city">
                  <Form.Label className="col-md-3">City</Form.Label>
                  <input
                    name="city"
                    type="text"
                    value={values.city}
                    onChange={handleInput}
                    placeholder="Enter City"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="postalCode">
                  <Form.Label className="col-md-3">Pin code</Form.Label>
                  <input
                    name="pincode"
                    type="text"
                    value={values.pincode}
                    onChange={handleInput}
                    placeholder="Enter pin code"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="d-flex gap-5">
                <Form.Group className="mb-3 col-md-6" controlId="country">
                  <Form.Label className="col-md-3">State</Form.Label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    value={values.state}
                    onChange={handleInput}
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>

                <Form.Group className="mb-3 col-md-6" controlId="country">
                  <Form.Label className="col-md-3">Alternate Mobile</Form.Label>
                  <input
                    type="text"
                    name="alternate_mobile"
                    onChange={handleInput}
                    value={values.alternate_mobile}
                    placeholder="Alternate Mobile nmuber"
                    required
                    className="shop-collection-card-btn input-field col-md-8"
                  />
                </Form.Group>
              </Form.Group>

              <div className="mb-3">
                <button
                  variant="primary"
                  type="submit"
                  className="sign-btn"
                  onClick={submitHandler}
                  style={{ float: "right" }}
                >
                  Update
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default EditAddress;
