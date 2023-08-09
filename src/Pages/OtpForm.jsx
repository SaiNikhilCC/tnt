import React, { useContext, useRef, useState,useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import { url } from "../api";
import { GrRefresh } from "react-icons/gr";
import { redirect, useLocation, useNavigate } from "react-router-dom";

export const OtpForm = ({ number }) => {
  const USER_ID = sessionStorage.getItem("userID");
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [otpRef, setOtpRef] = useState(" ");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  // code for resend otp
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${url}resend-otp/`, {
        phone: number,
      })
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          toast.success("OTP Sent To Your Registered Mobile Number");
        }
      })
      .catch((err) => toast.success("something went wrong", err));
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    setMinutes(1);
    setSeconds(30);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://3.111.36.104/user/verify-otp/",
        {
          uid: USER_ID,
          otp: otpRef,
        }
      );


      var status = data["status"];
      if (status == 400) {
        toast.error("incorrect otp found");
      } else {
        toast.success("otp verified");

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(redirect || "/");
        window.location.reload();
      }
    } catch (err) {
      toast.error(getError(err.message));
    }
   
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds])
  

  return (
    <div className="sign-in col-md-8">
      <div className="shadow">
        <Container className="small-container ">
          <h2 className="my-3 text-center">OTP Verification</h2>
          <Form >
            <Form.Group
              className="d-flex justify-content-center align-items-center gap-3"
              controlId="phone"
            >
              <label>OTP</label>
              <input
                type="text"
                onChange={(e) => setOtpRef(e.target.value)}
                
                className="shop-collection-card-btn input-field m-0"
                style={{ width: "50%" }}
              />
            </Form.Group>

            <div className="mt-3 d-flex justify-content-center gap-2 ">
            <div className="countdown-text">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p className="m-0">Didn't recieve code?</p>
          )}

          <button
          className="otp-btn"
            disabled={seconds > 0 || minutes > 0}
            
            onClick={handleSubmit}
          >
            Resend OTP
          </button>
        </div>
             
              
            </div>
            <div className="mt-3 d-flex justify-content-center gap-2 ">
            {
 <Button type="submit" className="sign-btn" disabled={otpRef===" "} onClick={submitHandler}>
 Verify OTP
</Button>
              }
            </div>
            
            
          </Form>
        </Container>
      </div>
    </div>
  );
};
