import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/images/logo.webp";
import { AiOutlinePhone } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <React.Fragment>
      <div
        className="text-white mt-5 pt-5 w-100 d-flex justify-content-center"
        style={{ background: "#151515" }}
        id="footer"
      >
        <div className="col-md-10">
          <div className=" row  pt-5 m-0 ">
            <div className=" col-lg-3 col-md-6 mb-2 ">
              <div className="logo ">
                <Link className="logo" to={"/"}>
                  <img src={logo} alt="logo" style={{ width: "200px" }} />
                </Link>
                <p className="text-justify" style={{ textAlign: "justify" }}>
                  Welcome to India's best neon signboard selling company. We're
                  proud to be the leading provider of high-quality, custom neon
                  signs in India, and we're committed to helping our customers
                  create bold, eye-catching designs that stand out from the
                  crowd{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center justify-content-sm-start footer-col">
              <div className="address mb-2 ">
                <h5 className="font-weight-bold  mb-3 footer-heading">
                  Address
                </h5>
                <div className="d-flex flex-column ">
                  <p className="mb-2 d-flex gap-1">
                    {" "}
                    <span>
                      <FiMapPin />
                    </span>{" "}
                    Green Grace Apartment, Khajaguda,
                    <br /> Hyderabad - 500032
                  </p>
                  <p className="mb-2 d-flex gap-1">
                    <span>
                      <CiMail />
                    </span>{" "}
                    <a href="mailto:Contact@theneontribe.com">
                      Contact@theneontribe.com
                    </a>{" "}
                  </p>
                  <p className="mb-0 d-flex gap-1">
                    <span>
                      <AiOutlinePhone />
                    </span>
                    <a href="tel:78936 63007"> 78936 63007</a>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center justify-content-sm-start footer-col">
              <div className="">
                <div className=" mb-2">
                  <h5 className="font-weight-bold  mb-2 footer-heading">
                    Quick Links
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link to={"/"} target="_blank" className="list-item-link">
                      Home
                    </Link>
                    <Link to="/shop" target="_blank" className="list-item-link">
                      {" "}
                      Shop
                    </Link>
                    <Link
                      to={"/aboutus"}
                      target="_blank"
                      className="list-item-link"
                    >
                      About us
                    </Link>
                    <Link
                      to={"/faq"}
                      target="_blank"
                      className="list-item-link"
                    >
                      FAQ
                    </Link>
                    <Link
                      to={"/contactus"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Contact Us
                    </Link>
                    <Link
                      to={"/blog"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Blogs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6  col-sm-12 d-flex justify-content-center justify-content-sm-start footer-col">
              <div className="">
                <div className=" mb-2">
                  <h5 className="font-weight-bold  mb-2 footer-heading">
                    Consumer Policy
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link
                      to={"/privacyPolicy"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/term&condition"
                      target="_blank"
                      className="list-item-link"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      to={"/paymentPolicy"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Payment Policy
                    </Link>
                    <Link
                      to={"/cancellationPolicy"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Cancellation Policy
                    </Link>
                    <Link
                      to={"/refundPolicy"}
                      target="_blank"
                      className="list-item-link"
                    >
                      Refund Policy
                    </Link>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top border-light mx-xl-5 py-4">
            <div className=" px-xl-0">
              <p className="mb-md-0 text-center  text-white">
                2023 &copy; All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
