import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OtpForm } from "./OtpForm";
import {Col,Row} from "react-bootstrap"
import "../Styles/signin.css";
import '../Styles/Hero.css';
import video from './../assets/images/Neon-flash_4.mp4';


export default function SignUp() {
  const [otpForm, showForm] = useState(true);

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const regx=/[^0-9]/g

  //   const handleChange = (e) => {
  //   // Add logic here to restrict the input length to ten characters
  //   const newValue = e.target.value.slice(0, 10);
  //   setValue(newValue);
  // };

  const submitHandler = async (e) => {
    e.preventDefault();

   if(phone.length==0  ){
    toast.error("please enter number")
   }else if(phone.length>10 || phone.length<10 ) {
    toast.error("Number must be 10 digit")
   }
   else if (phone.length==10){
    try {
      const { data } = await axios.post(
        "http://3.111.36.104/user/register-user/",
        {
          name,
          phone,
          email,
          device_id: "web",
          firebase_id: "web",
        }
      );
      
 if(data.status==200){
  showForm(false);
  
  sessionStorage.setItem("userID", data.data.uid);
 }
 else{
  toast.error("user already exist");
 }
      //ctxDispatch({type:'USER_SIGNIN', payload: data})
      //localStorage.setItem('userInfo', JSON.stringify(data));
      // navigate(redirect || '/');
    } catch (err) {
      toast.error("Invalid email or password");
    }
    
   }
   
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container d-flex justify-content-center" style={{marginTop:'100px'}}>
      {otpForm ? (
        <Row>
          <h1 className="my-3">Sign In</h1>
          <Col md={6} sm={12} lg={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
            
              />
            </Form.Group>

            <div className="mb-3">
              <Button type="submit" className="sign-btn">Sign In</Button>
            </div>

            <div className="mb-3">
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
          </Form>
          </Col>
          <Col md={6} sm={12} lg={6}>
          <video className="elementor-video" width="600" src={video} autoPlay="autoplay" loop={true}
                    muted="muted" playsInline="" controlsList="nodownload" style={{marginTop: "-4rem",
                      marginLeft: "1rem"
                  }}></video>
          </Col>
         
        </Row>
      ) : (
        <>
          <OtpForm />
        </>
      )}
    </Container>
  );
}
