import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Col, Row } from "react-bootstrap";
import { OtpForm } from "./OtpForm";
import "../Styles/signin.css";

const Signin = () => {
  
  const phoneRef = useRef();

  const [otpForm, showForm] = useState(true);

  const [number, setNumber] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const regx=/[^0-9]/g

  const submitHandler = async (e) => {
    e.preventDefault();
    

    try {
      if (number.length == 0) {
        toast.error("please fill Mobile Number");
      } else if (number.length < 10) {
        toast.error("Enter valid 10 digits phone number");
      } else {
        let url = "http://3.111.36.104/user/login/";

        let options = {
          method: "POST",
          url: url,
          data: { phone: number },
        };

        let response = await axios(options);

        const passuid = response.data.data[0].uid;
        sessionStorage.setItem("userID", passuid);
        

        let record = response.data;

        if (record.status == "200") {
          toast.success(record.message);

          showForm(false);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (err) {
      toast.error("User not Found, Create Account");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Container className="d-flex justify-content-center ">
        {otpForm ? (
          <div className="sign-in col-md-8">
            <div className="shadow">
              <Form onSubmit={submitHandler}>
                <h2 className="text-center">Sign In</h2>
                <Form.Group controlId="number">
                  <label>Phone Number</label><br/>
                  <input
                    type="text"
                    value={number.replace(regx,'')}
                    onChange={(e) => setNumber(e.target.value)}
                    width={"100%"}
                    placeholder="Phone Number"
                    
                    className="shop-collection-card-btn input-field"
                    maxLength={12}
                    minLength={10}
                  />
                </Form.Group>
                <button type="submit" className="mt-3 sign-btn">
                  Sign OTP
                </button>
                <div className="new-customer">
                  <p>
                    New customer?{" "}
                    <Link to={`/signup?redirect=${redirect}`}>
                      Create your account
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <>
            <OtpForm  number={number}/>
          </>
        )}
      </Container>
    </div>
  );
};

export default Signin;
