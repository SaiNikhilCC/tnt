import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "../Styles/Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "./../assets/images/logo.webp";
import { BsFillBagFill, BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { PopupMenu } from "react-simple-widgets";
import { url } from "./../api";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { AiOutlineClose, AiOutlineHistory } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiFillHeart } from "react-icons/ai";
import { Wishlist } from "../Pages/Wishlist";
import {BiDownArrow} from 'react-icons/bi'

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  boxShadow: 24,
  p: 4,
  zIndex: "999999999999",
};

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [query, setSearchValue] = useState("");
  const [result, setResult] = useState([]);

  const [isExpand, setExpand] = useState(false);

  const [show, setShow] = useState(false);

  const handleClosew = () => setShow(false);
  const handleShoww = () => setShow(true);
  //code for profile------------------------------------------------

  const uid = userInfo && userInfo.data[0].uid;
  function getProfile() {
    axios
      .post(`${url}user-profile/`, { uid })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {}, []);

  useEffect(() => {
    if (userInfo) {
      getProfile();
    } else {
      console.log("not found");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  //code for search filter-----------
  const handlechange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchfilter = () => {
    axios.post(`${url}products/`, { query }).then((res) => {
      setResult(res.data.data);
    });
  };

  useEffect(() => {
    searchfilter();
  }, [query]);

  const navigate = useNavigate();
  return (
    <>
      <div className="tnt-container  " id="header">
        <div className="row-container d-flex align-items-center justify-content-around p-4">
          <div className=" logo">
            <Link className="logo-className" to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className={isExpand ? "navbar-menu expandable" : "navbar-menu"}>
            <div className="nav-menu">
              <div
                className={!isExpand ? "cls-btn" : "cls-btn show"}
                onClick={() => setExpand(!isExpand)}
              >
                <AiOutlineClose />
              </div>
              <ul className="nav-list">
                <li>
                  <NavLink
                    to={"/"}
                    className="list-item-link"
                    onClick={() => setExpand(!isExpand)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  Customizer <BiDownArrow style={{marginTop:"-2px",color:"red"}}/>
                  <ul className="nav-dropdown">
                    <li>
                      <NavLink
                        to={"/customizer"}
                        className="list-item-link"
                        onClick={() => setExpand(!isExpand)}
                      >
                        Name Customizer
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/logocustomizer"}
                        className="list-item-link"
                        onClick={() => setExpand(!isExpand)}
                      >
                        Logo Customizer
                      </NavLink>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <NavLink to={"/logocustomizer"} className="list-item-link" onClick={()=>setExpand(!isExpand)}>
                    Logo Customizer
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to={"/shop"}
                    className="list-item-link"
                    onClick={() => setExpand(!isExpand)}
                  >
                    Shop Collection
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/aboutus"}
                    className="list-item-link"
                    onClick={() => setExpand(!isExpand)}
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/contactus"}
                    className="list-item-link"
                    onClick={() => setExpand(!isExpand)}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className=" menu-right-icons">
            <ul className="nav-list">
              <li>
                <button onClick={handleOpen} className="search-btn">
                  <BsSearch />
                </button>
              </li>
              <li>
                {" "}
                {userInfo ? (
                  <>
                    <div className="flex">
                      <div>
                        <div
                          className="relative cursor-pointer mr-[15px]"
                          onClick={handleShoww}
                        >
                          <AiFillHeart size={22} color="#FFF"  style={{cursor:"pointer"}}/>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </li>

              <li>
                {userInfo ? (
                  <>
                    {" "}
                    <Link to={"/cart"}>
                      <BsFillBagFill />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/signin"}>
                      <BsFillBagFill />
                    </Link>
                  </>
                )}
              </li>
              <li>
                <PopupMenu style={{ positon: "relative" }}>
                  <button className="search-btn">
                    <FaUserAlt />
                  </button>
                  {userInfo ? (
                    <div className="card1">
                      <div className="card2">
                        {profile &&
                          profile.map((user) => {
                            return (
                              <div
                                className="card-body px-4 py-4"
                                key={user.id}
                              >
                                <div
                                  id="circle-avatar"
                                  className="text-center mx-auto mb-4"
                                >
                                  <img
                                    src={"https://apis.theneontribe.com" + user.profile}
                                    alt="profile"
                                  />
                                </div>

                                <p className="text-center mb-0">{user.name}</p>
                                <p className="text-center mb-2">{user.email}</p>
                                <p className="text-center">
                                  <Link to={"/userprofile"}>
                                    {" "}
                                    <AiOutlineEdit />
                                    &nbsp;Edit Profile
                                  </Link>
                                </p>

                                <p className="text-center">
                                  <Link to={"/orderHistory"}>
                                    {" "}
                                    <AiOutlineHistory />
                                    &nbsp;Order History
                                  </Link>
                                </p>
                                <p className="text-center">
                                  <Link to={"/customizerorderHistory"}>
                                    {" "}
                                    <AiOutlineHistory />
                                    &nbsp; Customizer Order History
                                  </Link>
                                </p>

                                <hr />

                                <hr
                                  className="mb-0"
                                  style={{ margin: "0 -24px 0" }}
                                />

                                <hr style={{ margin: "0 -24px 24px" }} />

                                <div className="d-grid">
                                  <button
                                    className="btn btn-secondary"
                                    onClick={logout}
                                  >
                                    <small>Logout</small>
                                  </button>
                                </div>
                              </div>
                            );
                          })}{" "}
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary mt-5"
                      style={{ position: "absolute" }}
                      onClick={() => navigate("/signin")}
                    >
                      <small> login</small>
                    </button>
                  )}
                </PopupMenu>
              </li>
              <li>
                <button
                  className="burger-menu"
                  onClick={() => {
                    setExpand(!isExpand);
                  }}
                >
                  <RxHamburgerMenu />
                </button>
              </li>
            </ul>
            {/* code for modal */}
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <button onClick={handleClose} className="close-modal-btn">
                    <AiOutlineClose />
                  </button>
                  <input
                    placeholder="search Product..."
                    className="search-input"
                    onChange={handlechange}
                  />

                  {result.slice(0, 5).map((data) => {
                    return (
                      <ul className="search-result">
                        <Link
                          to={`/product/${data.id}`}
                          target="_blank"
                          className="search-list-link"
                        >
                          <li className="search-list-item">
                            <img
                              src={"https://apis.theneontribe.com" + data.thumbnail}
                              alt="thumb"
                              style={{ width: "30px" }}
                            />
                            {data.product_title}
                          </li>
                        </Link>
                      </ul>
                    );
                  })}
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClosew}
        placement="end"
        style={{ backgroundColor: "#262626", zIndex: "9999" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>WishList</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Wishlist />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
