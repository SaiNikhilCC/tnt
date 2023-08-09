import React, { useState, useEffect, useRef, useContext } from "react";

import axios from "axios";

import Draggable from "react-draggable";

import { parse, v4 as uuidv4 } from "uuid";

import notAllowedImage from "../assets/images/notallowed.webp";

import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import Modal from "react-bootstrap/Modal";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsInfoCircle } from "react-icons/bs";
import WebFont from "webfontloader";
import { FaCheck } from "react-icons/fa";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

import "../Styles/Customize.css";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "./Usecontext/Context";

const Customizer = () => {
  const url = "https://3.111.36.104";
  const [selectedFont, setSelectedFont] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [value, setvalue] = useState("");

  const [amount, setAmount] = useState(0);

  const [textColor, setTextColor] = useState("");

  const [valueChange, setValueChange] = useState("");

  const [customise, setcoustmise] = useState([]);

  const [Emoji, setEmojis] = useState([]);

  const [counter, setcounter] = useState(0);

  const [backendimg, setbackendimg] = useState();

  const [arrayvalue, setarrayvalue] = useState([]);

  const [sizecounter, setsizecounter] = useState();

  const uniqueId = uuidv4();

  const [IDE, SETIDE] = useState();

  const [selectframe, setselectframe] = useState([]);

  // const [image, setimage] = useState("");

  const { image, setimage, finalprice, setfinalprice } =
    useContext(Usercontext);

  const [text, settext] = useState("");

  const divRef = useRef(null);

  const [shapeid, setshapeid] = useState("");

  const [backgroundid, setbackgrounid] = useState();

  const [descripton, setdescription] = useState("");

  const [loader, setloader] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [radiobutton, setradiobutton] = useState(1);
  const [secondchange, setsechondchange] = useState("");
  const [thirdchange, setthirdchange] = useState("");
  const [error, setError] = useState(false);
   const [subbutton,setsubbutton]=useState(true)
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();

  const handleKeyPress = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current.focus();
    }
  };

  // const [submitloader,setsubmitloader]=useState(false)

  const [Checked, setChecked] = useState(false);

  const storagedata = JSON.parse(localStorage.getItem("userInfo"));
  const Uiddata = storagedata && storagedata.data[0].uid;

  const navigate = useNavigate();
  const Navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setloader(false);
      setError(true);
    }, 7000);
    axios
      .get(`${url}/user/all-customizer-get/`)

      .then((res) => {
        setcoustmise(res.data);
        clearTimeout(timer);
        setloader(false);
      })

      .catch((err) => {
        console.log(err, "sdfsdfsdfasdf");
        setloader;
      });
    return () => clearTimeout(timer);
  }, []);

  // if(window.innerWidth==425){
  //   const bounds = {
  //     left: -30,

  //     top: -100,

  //     right:200,

  //     bottom: 450,
  //   };
  // }

  const bounds = {
    left: -30,

    top: -100,

    right: 550,

    bottom: 450,
  };

  useEffect(() => {
    if (customise.fonts && customise.fonts.length > 0) {
      WebFont.load({
        google: {
          families:
            customise.fonts && customise.fonts.map((font) => font.font_name),
        },
        // active: () => {
        //   setSelectedFont(customise && customise.fonts[0]); // Set the first font as the selected font
        // },
      });
    }
  }, [customise]);

  const fontlist = (font) => {

    setSelectedFont(font);
  };

  const [hightlightcolor, sethighlightcolor] = useState(
    customise.colors && customise.colors[0].color_code
  );

  const Colordata = (item) => {
    sethighlightcolor(item.color_code);
    setTextColor(item);
    
  };

  const sendbackgroundimg = (item) => {
    setbackendimg(`${url}${item.background_image} `);

    setbackgrounid(item.id);
  };

  // const concatenatedValues = [].concat(...arrayvalue.map(obj => Object.values(obj)));

  const concatenatedString = arrayvalue.map((obj) => obj.value).join("");

  // const concatenatedemoji = Emoji.map(obj => obj.emoji_price).join('');

  //   const emojidataw = Emoji.map((item)=>
  //   console.log(itme)
  //   {
  // return(
  //   <></>
  // )
  //   })
  //   console.log(emojidataw,"fdsfasdfs")

  const download = () => {
    const options = {
      useCORS: true, // Enable CORS support
    };

    html2canvas(divRef.current, options).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();

      const link = document.createElement("a");

      link.href = screenshotUrl;

      link.download = "screenshot.png";

      link.click();
    });
  };

  // const submitdata = (e, index) => {
  //   e.preventDefault();

  //   arrayvalue.push({ value, size: "", id: uniqueId });
  //   console.log(arrayvalue, "dfawrwendk");

  //   setvalue("");
  // };

  const senddata = () => {
    setShow(true);
    const options = {
      useCORS: true, // Enable CORS support
    };

    html2canvas(divRef.current, options).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();

      setimage(screenshotUrl);
    });
  };

  // const imagesize = (e) => {
  //   setsizecounter(e.target.value);
  // };

  useEffect(() => {
    const handleUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();

        event.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [unsavedChanges]);

  const bando = (item) => {
    SETIDE(item.id);
  };

  const stpe = customise.fonts && customise.fonts[0].id;

  const staticcolor = customise.colors && customise.colors[0].id;

  const staticcolore = customise.colors && customise.colors[0].color_code;

  // code for brightness controller

  const submitcustdata = async (e) => {
    e.preventDefault();
setsubbutton(false)
    const options = {
      useCORS: true, // Enable CORS support
    };
    html2canvas(divRef.current, options).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();

      setimage(screenshotUrl);
    });

    try {
      const canvas = await html2canvas(divRef.current, options);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      var screenshotFile = new File([blob], "screenshot.png", {
        type: "image/png",
      });

      const formData = new FormData();

      formData.append("image", screenshotFile);

      formData.append("text", `${value + secondchange + thirdchange}`);

      formData.append("size", highlight);

      formData.append("user", Uiddata);

      formData.append("font", selectedFont ? selectedFont.id : stpe);

      formData.append("color", textColor ? textColor.id : staticcolor);

      formData.append("shape", shapeid);
         formData.append("price", finalprice);
      formData.append("quantity", qty);
      formData.append("background_image", backgroundid);

      formData.append("is_controler", Checked);

      formData.append("description_by_user", descripton);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${url}/user/new-customizer/`,
        formData,
        config
      );

      if (response.data.status === 200) {
        response && Navigate(`/placeordercustom/${response.data.data.id}`);
     
        setUnsavedChanges(false);
      
      } else {
        Swal.fire({
          icon: "error",

          title: "Oops...",

          text: "Enter Some Data",

          footer: '<a href="">Why do I have this issue?</a>',
        });
        setsubbutton(true)
      }
    } catch (error) {
      console.error(error);

      // Handle the error
    }
  };

  const handleStart = () => {};

  const handleDrag = (e, data) => {
    const parentRect = divRef.current.getBoundingClientRect();
    const { x, y } = data;
    const leftBoundary = parentRect.left;
    const rightBoundary = parentRect.right - data.node.offsetWidth;
    const topBoundary = parentRect.top;
    const bottomBoundary = parentRect.bottom - data.node.offsetHeight;

    if (x < leftBoundary) {
      data.x = leftBoundary;
    } else if (x > rightBoundary) {
      data.x = rightBoundary;
    }

    if (y < topBoundary) {
      data.y = topBoundary;
    } else if (y > bottomBoundary) {
      data.y = bottomBoundary;
    }
  };

  const handleStop = () => {};

  const handleStart1 = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrag1 = () => {};

  const handleStop1 = (e) => {
    e.preventDefault;
    setIsDragging(false);
  };

  const handleInput = (e) => {
    setvalue(e.target.value);

    setAmount(2000);

    setUnsavedChanges(true);
  };

  useEffect(() => {
    if (value.length == 0) {
      setAmount(0);
    }

    setValueChange(value.replace(/\s+/g, "").length * 400);
  }, [value]);

  // ***************************  Emojis  start********************

  const [emojiid, setemojiid] = useState();

  const sendemojis = (item) => {
    setemojiid(item.id);

    Emoji.push({
      value: item["emoji"],
      size: "",
      price: item["emoji_price"],
      id: uniqueId,
    });

    setcounter(counter + 1);
  };

  const rotation = (e) => {
    SETROTATE(e.target.value);
  };

  const updatedata = () => {
    setarrayvalue(arrayvalue.filter((item) => item.id !== IDE));
  };

  const [shapeprice, setshapeprice] = useState(0);

  const shapedata = (item) => {
    setshapeprice(item.shape_price);

    setselectframe(`${url}${item.shape_image}`);
    setshapeid(item.id);
  };

  const updataemojivalue = (data) => {
    setEmojis(Emoji.filter((item) => item.id !== data.id));
    // setemojiid()
  };

  const secondchage = (e) => {
    setsechondchange(e.target.value);
  };
  const thirdchage = (e) => {
    setthirdchange(e.target.value);
  };

  const cleardata = () => {
    //  Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //      setvalue('')
    //      setsechondchange('')
    //     }
    //   })

    setvalue("");
    setsechondchange("");
    setthirdchange("");
    setEmojis([]);
    setemojiid()
  };

  const handleCheckboxChange = () => {
    setChecked(!Checked);
  };

  // var orgmeduium =  (customheight+(customheight*20/100))*(customwidth+(customwidth*20/100))

  var customheight = customise.dimensions && customise.dimensions[0].height;
  var customwidth = customise.dimensions && customise.dimensions[0].length;
  var customprice = parseFloat(
    customise.dimensions && customise.dimensions[0].price
  );

  

  const size = [
    {
      id: 1,
      value: "small",
      size: 30,
      width: customheight * customwidth,
      percentage: totalAmount,
    },

    {
      id: 2,
      value: "Medium",
      size: 40,
      width: parseFloat(
        (customheight + (customheight * 20) / 100) *
          (customwidth + (customwidth * 20) / 100)
      ),
      percentage: 20,
    },

    {
      id: 3,
      value: "Large",
      size: 50,
      width: parseFloat(
        (customheight +
          (customheight * 20) / 100 +
          ((customheight + (customheight * 20) / 100) * 25) / 100) *
          (customwidth +
            (customwidth * 20) / 100 +
            ((customwidth + (customwidth * 20) / 100) * 25) / 100)
      ),
      percentage: 25,
    },
  ];

  const [emojiprice, setemojiprice] = useState(0);
  var totalvalue = value.length + secondchange.length + thirdchange.length;

  const [highlight, sethighlight] = useState("small");

  const sizedatasend = (item) => {
    setsizecounter(item);
    sethighlight(item.value);
  };

  var totalAmount = Emoji.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);

  var totalprice = Emoji.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price;
  }, 0);

  var second;
  var third;
  var shapemoney = shapeprice && shapeprice;

  var shapeorg = shapeprice && shapeprice;

  useEffect(() => {
    if (sizecounter && sizecounter.percentage == 20) {
      second = totalAmount + (totalAmount * 20) / 100;
      totalAmount = parseFloat(second);
     
      shapemoney = shapeorg + (shapeorg * 20) / 100;
    } else if (sizecounter && sizecounter.percentage == 25) {
      totalAmount =
        totalprice +
        (totalprice * 20) / 100 +
        ((totalprice + (totalprice * 20) / 100) * 25) / 100;
      shapemoney =
        shapeorg +
        (shapeorg * 20) / 100 +
        ((shapeorg + (shapeorg * 20) / 100) * 25) / 100;
    }
  }, [
    value,
    secondchange,
    thirdchange,
    sizecounter,
    qty,
    customprice,
    totalAmount,
    emojiprice,
    sizecounter,
    shapeprice,
  ]);

  useEffect(() => {
    setfinalprice(
      Math.round(
        (totalvalue *
          customprice *
          (sizecounter ? sizecounter.width : customheight * customwidth) +
          eval(totalAmount) +
          parseFloat(shapemoney)) *
          qty
      )
    );
  }, [
    value,
    secondchange,
    thirdchange,
    sizecounter,
    qty,
    customprice,
    totalAmount,
    emojiprice,
    sizecounter,
    shapeprice,
  ]);

  localStorage.setItem("imagedata", image);
  localStorage.setItem("finalPrice", finalprice);
  localStorage.setItem("quantity", qty);

  //  useEffect(()=>{
  //  setsizecounter([
  //   ...sizecounter,sizecounter[0].id="1"
  //  ])
  //  },[])

  const shapedataempty = () => {
    setselectframe("");
    setshapeprice(0);
  };

  const clarall = () =>{
    setemojiid()
    setEmojis([])
    setemojiid()
  }

       const secondInputRef = useRef(null);
      const secondInputRef1 = useRef(null)
  
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          secondInputRef.current.focus();
        }
      };

      const handleKeyDown1 = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          secondInputRef1.current.focus();
        }
      };


  return (
    <div>
      {loader && (
        <div className="bg-dark">
          <div id="preloader" className="bg-dark">
            <div className="spinner">
              <span className="ball-1"></span>

              <span className="ball-2"></span>

              <span className="ball-3"></span>

              <span className="ball-4"></span>

              <span className="ball-5"></span>

              <span className="ball-6"></span>

              <span className="ball-7"></span>

              <span className="ball-8"></span>
            </div>
          </div>
        </div>
      )}
      {!loader && !error && (
        <div>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {image ? (
                  <img src={image} alt="Screenshot" style={{ width: "100%" }} />
                ) : (
                  <span class="loader"></span>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                {image && (
                  <button
                    onClick={download}
                    className="btn btn-success float-end my-3"
                  >
                    Download
                  </button>
                )}
              </Modal.Footer>
            </Modal>
          </div>

          <Container style={{ marginTop: "80px" }} id="customiser">
            <Row className="customiser-row">
              <Col md={12} sm={12} lg={6} className="mt-md-5 customiser-banner">
                <div
                  ref={divRef}
                  id="myDiv"
                  className="banner "
                  style={{
                    backgroundImage: `url(${backendimg})`,
                    backgroundColor: "black",
                    overflow: "hidden",
                    border: "2px solid white",
                    position: "relative",
                  }}
                >
                  <div
                    className="content"
                    style={{ backgroundImage: `url(${selectframe})` }}
                  >
                    <>
                      <span>
                        <div
                          class="offcanvas offcanvas-bottom bg-dark"
                          tabindex="-1"
                          id="offcanvasBottom"
                          aria-labelledby="offcanvasBottomLabel"
                        >
                          <div class="offcanvas-header">
                            <h5
                              class="offcanvas-title"
                              id="offcanvasBottomLabel"
                            >
                              Offcanvas bottom {IDE}
                            </h5>

                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>

                          <div class="offcanvas-body small">
                            <label for="customRange1" class="form-label">
                              Text Size
                            </label>
                          </div>

                          <div class="offcanvas-body small">
                            <label for="customRange2" class="form-label">
                              filter Size
                            </label>

                            <input
                              type="range"
                              class="form-range"
                              min="0"
                              max="360"
                              onChange={rotation}
                            />
                          </div>

                          <button className="btn btn-danger">Delete</button>
                        </div>
                      </span>

                      <Draggable
                        // axis="both"
                        handle=".handle"
                        defaultPosition={{ x: 40, y: 40 }}
                        position={null}
                        cancel="string"
                        bounds={bounds}
                        grid={[1, 1]}
                        scale={1}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                      >
                        <div
                          className="handle "
                          aria-controls="offcanvasBottom"
                        >
                          <h1
                            className="my-5"
                            style={{
                              fontFamily: selectedFont.font_name,
                              color: textColor
                                ? `#${textColor.color_code}`
                                : `#${staticcolore}`,
                              textShadow: `2px 2px 8px #${textColor.color_code} `,
                              cursor: "grab",
                              marginTop: "7px",
                              position: "absolute",
                              fontSize: sizecounter
                                ? `${sizecounter.size}px`
                                : `${30}px`,
                            }}
                          >
                            {radiobutton == 1 && value.length == 0 ? (
                              <h2
                                style={{
                                  color: textColor
                                    ? `#${textColor.color_code}`
                                    : `#${staticcolore}`,
                                  textShadow: `2px 2px 8px #${textColor.color_code} `,
                                }}
                              >
                                Start Your Customization
                              </h2>
                            ) : (
                              value.replace(/ /g, "\u00A0")
                            )}
                          </h1>
                        </div>
                      </Draggable>

                      <Draggable
                        axis="both"
                        handle=".handle"
                        defaultPosition={{ x: 80, y: 80 }}
                        position={null}
                        cancel="string"
                        bounds={bounds}
                        grid={[1, 1]}
                        scale={1}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                      >
                        <div
                          className="handle my-5"
                          aria-controls="offcanvasBottom"
                        >
                          <h1
                            style={{
                              fontFamily: selectedFont.font_name,
                              color: textColor
                                ? `#${textColor.color_code}`
                                : `#${staticcolore}`,
                              textShadow: `2px 2px 8px #${textColor.color_code} `,
                              cursor: "grab",
                              marginTop: "10px",
                              position: "absolute",
                              fontSize: sizecounter
                                ? `${sizecounter.size}px`
                                : `${30}px`,
                            }}
                            onClick={() => bando(item, index)}
                            onDoubleClick={() => updatedata(item)}
                          >
                            {secondchange.replace(/ /g, "\u00A0")}
                          </h1>
                        </div>
                      </Draggable>

                      <Draggable
                        axis="both"
                        handle=".handle"
                        defaultPosition={{ x: 120, y: 120 }}
                        position={null}
                        cancel="string"
                        bounds={bounds}
                        grid={[1, 1]}
                        scale={1}
                        onStart={handleStart}
                        onDrag={handleDrag}
                        onStop={handleStop}
                      >
                        <div
                          className="handle my-5 "
                          aria-controls="offcanvasBottom"
                        >
                          <h1
                            style={{
                              fontFamily: selectedFont.font_name,
                              color: textColor
                                ? `#${textColor.color_code}`
                                : `#${staticcolore}`,
                              textShadow: `2px 2px 8px #${textColor.color_code} `,
                              cursor: "grab",
                              position: "absolute",
                              marginTop: "15px",
                              fontSize: sizecounter
                                ? `${sizecounter.size}px`
                                : `${30}px`,
                            }}
                            onClick={() => bando(item)}
                            onDoubleClick={() => updatedata(item)}
                          >
                            {thirdchange.replace(/ /g, "\u00A0")}
                          </h1>
                        </div>
                      </Draggable>
                    </>

                    <div className="d-flex">
                      {Emoji.map((item) => {
                        return (
                          <Draggable
                            axis="both"
                            key={item.id}
                            handle=".handle"
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            grid={[1, 1]}
                            scale={1}
                            cancel=".no-drag"
                            onStart={handleStart1}
                            onDrag={handleDrag1}
                            onStop={handleStop1}
                            allowAnyClick={true}
                          >
                            <div className="handle">
                              {item.emojiitem != "" && (
                                <img
                                  role="button"
                                  onDoubleClick={() => updataemojivalue(item)}
                                  tabIndex={0}
                                  src={`${url}${item.value}`}
                                  style={{ width: "50px", cursor: "grab  " }}
                                />
                              )}
                            </div>
                          </Draggable>
                        );
                      })}
                    </div>
                  </div>

                  <div></div>
                </div>
              </Col>

              <Col
                md={12}
                sm={12}
                lg={6}
                className="d-flex justify-content-center align-items-center mt-md-5 mt-sm-5"
              >
                <div className="w-100">
                  <h1 style={{ textAlign: "left" }}>The neon customizer</h1>
                  <h3>&#8377;{finalprice}</h3>
                  <div className="info">
                    <div>
                      <form>
                        {radiobutton == 1 && (
                          <div>
                            <textarea
                              id="textarea"
                              maxLength="32"
                              className="form-control bg-black text-white"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={handleInput}
                              placeholder="text preview"
                              value={value}
                            ></textarea>
                            <span>{`${value.length}/32`}</span>
                          </div>
                        )}
                        {radiobutton == 2 && (
                          <div>
                            <textarea
                               onKeyDown={handleKeyDown}
                              id="textarea"
                              maxLength="16"
                              className="form-control bg-black text-white"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={handleInput}
                              placeholder="text preview"
                              value={value}
                            ></textarea>
                            <span>{`${value.length}/${32 / radiobutton}`}</span>
                            <textarea
                              id="textarea"
                              ref={secondInputRef}
                              maxLength="16"
                              className="form-control bg-black text-white my-3"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={secondchage}
                              placeholder="text preview"
                            ></textarea>
                            <span>{`${secondchange.length}/${
                              32 / radiobutton
                            }`}</span>
                          </div>
                        )}

                        {radiobutton == 3 && (
                          <div>
                            <textarea
                               onKeyDown={handleKeyDown}
                              id="textarea"
                              maxLength="11"
                              className="form-control bg-black text-white"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={handleInput}
                              placeholder="text preview"
                              value={value}
                            ></textarea>
                            <span>{`${value.length}/${11}`}</span>
                            <textarea
                             onKeyDown={handleKeyDown1}
                              ref={secondInputRef}
                              id="textarea"
                              maxLength="11"
                              className="form-control bg-black text-white my-3"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={secondchage}
                              placeholder="text preview"
                            ></textarea>
                            <span>{`${secondchange.length}/${11}`}</span>
                            <textarea
                              id="textarea"
                               ref={secondInputRef1}
                              maxLength="10"
                              className="form-control bg-black text-white my-3"
                              style={{
                                // fontFamily: selectedFont.font_name,
                                fontSize: "1.3rem",
                              }}
                              onChange={thirdchage}
                              placeholder="text preview"
                            ></textarea>
                            <span>{`${thirdchange.length}/${10}`}</span>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>

                  <hr />
                  <div className="d-flex gap-2">
                    <div>
                      <input
                        type="radio"
                        value="1"
                        name="Line"
                        checked={radiobutton == 1}
                        onChange={(e) => setradiobutton(e.target.value)}
                        onClick={cleardata}
                        className="line-btn"
                      />{" "}
                      1 Line
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="2"
                        name="Line"
                        checked={radiobutton == 2}
                        onChange={(e) => setradiobutton(e.target.value)}
                        onClick={cleardata}
                        className="line-btn"
                      />{" "}
                      2 Line
                    </div>
                    <div>
                      <input
                        type="radio"
                        value="3"
                        name="Line"
                        checked={radiobutton == 3}
                        onChange={(e) => setradiobutton(e.target.value)}
                        onClick={cleardata}
                        className="line-btn"
                      />{" "}
                      3 Line
                    </div>
                  </div>
                  <hr />
                  <div className="font-collection">
                    <h4>Pick Your Font family</h4>

                    <div className="all-font">
                      {customise.fonts &&
                        customise.fonts.map((font) => {
                          return (
                            <button
                              key={font.id}
                              className={
                                selectedFont && font.id == selectedFont.id
                                  ? "stylefont"
                                  : "btn-font"
                              }
                              style={{ fontFamily: font.font_name }}
                              onClick={() => fontlist(font)}
                            >
                              {font.font_name}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  <hr />

                  <div className="color-collection">
                    <h4>Pick Your Color</h4>
                    <div className="all-color">
                      <Swiper
                        modules={[Navigation, Scrollbar, A11y]}
                        spaceBetween={30}
                        slidesPerView={5}
                        navigation
                        scrollbar={{ draggable: true }}
                      >
                        {customise.colors &&
                          customise.colors.map((item) => {
                            return (
                              <SwiperSlide>
                                <span
                                  style={{
                                    backgroundColor: `#${item.color_code}`,
                                  }}
                                  className={
                                    item.color_code == textColor.color_code
                                      ? "jakas"
                                      : "jakas2"
                                  }
                                  onClick={() => Colordata(item)}
                                  key={item}
                                ></span>
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </div>
                  </div>

                  <hr />

                  {/* ************* emojis ************ */}

                  <div className="color-collection">
                    <h4 className="d-inline">Pick Your Emojis</h4>
                      <span className="float-end p-1" style={{cursor:"pointer",border:"1px solid white",borderRadius:"10px"}} onClick={clarall}>Clear All</span>
                    <div>
                      <span className="all-color">
                        {customise.emojis &&
                          customise.emojis.map((item, index) => {
                            return (
                              <img
                                src={`${url}${item.emoji}`}
                                style={{
                                  width: "50px",
                                  height: "70px",
                                  cursor: "pointer",
                                }}
                                onClick={() => sendemojis(item)}
                                className={
                                  setEmojis && item.id == emojiid
                                    ? "newclass"
                                    : ""
                                }
                              />
                            );
                          })}
                      </span>
                      <span className="d-flex align-items-center  gap-1">
                        <BsInfoCircle /> Double click on the emoji to delete in
                        customizer boxb
                      </span>
                    </div>
                  </div>

                  <hr className="my-5" />

                  <div className="color-collection">
                    <h4 className="d-inline">Pick Your Shapes</h4>
                     <span className="float-end p-1" style={{cursor:"pointer",border:"1px solid white",borderRadius:"10px"}}onClick={shapedataempty}>Remove Shape</span>
                    <div className="all-color">
                      {/* <img
                        src={notAllowedImage}
                        alt=" "
                        style={{
                          width: "67px",
                          height: "75px",
                          cursor: "pointer",
                          marginTop: ".6rem",
                        }}
                        onClick={shapedataempty}
                      /> */}
                      <Swiper
                        modules={[Navigation, Scrollbar, A11y]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        scrollbar={{ draggable: true }}
                      >
                        {customise.shapes &&
                          customise.shapes.map((item, index) => {
                            return (
                              <SwiperSlide key={item.id}>
                                <img
                                  src={`${url}${item.shape_image}`}
                                  className={
                                    selectframe && item.id == shapeid
                                      ? "newclass"
                                      : ""
                                  }
                                  style={{ width: "67px", height: "75px" }}
                                  onClick={() => shapedata(item)}
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </div>
                  </div>

                  <hr />

                  <div
                    className="color-collection"
                    style={{ justifyContent: "space-between" }}
                  >
                   
                      <h4 className="d-inline">Pick Your Background_Image</h4>
                      <span onClick={() => setbackendimg("")} className="float-end p-1" style={{cursor:"pointer",border:"1px solid white",borderRadius:"10px"}}>Remove Background</span>
                    <div className="all-color">
                      
                      <Swiper
                        modules={[Navigation, Scrollbar, A11y]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                     
                      >
                        {customise.data &&
                          customise.data.map((item) => {
                            return (
                              <SwiperSlide key={item.id}>
                                <img
                                  src={`${url}${item.background_image}`}
                                  style={{ width: "67px", height: "75px" }}
                                  onClick={() => sendbackgroundimg(item)}
                                  className={
                                    backendimg && item.id == backgroundid
                                      ? "newclass"
                                      : ""
                                  }
                                />
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>
                    </div>
                  </div>

                  <hr className="my-5" />
                  <h4>Pick Your Size</h4>

                  <div
                    className="color-collection"
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    {size.map((item) => {
                      return (
                        <div>
                          <button
                            className={
                              item.value == highlight
                                ? "btn btn-success"
                                : "btn btn-danger"
                            }
                            onClick={() => sizedatasend(item)}
                          >
                            {item.value}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <hr />

                  <div
                    className="d-flex align-items-center justify-content-around"
                    id="qty"
                  >
                    <div className="d-flex align-items-center  gap-2">
                      <label>Quantity:</label>
                      <button
                        onClick={() => setQty(qty - 1)}
                        className="qty"
                        disabled={qty === 1}
                      >
                        {" "}
                        -{" "}
                      </button>

                      <p className="mb-0 " style={{ fontSize: "1.3rem" }}>
                        {qty}
                      </p>
                      <button onClick={() => setQty(qty + 1)} className="qty">
                        +
                      </button>
                    </div>
                    <div>
                      <input type="checkbox" onChange={handleCheckboxChange} />
                      &nbsp; <label>Brightness Controller</label>
                    </div>
                    <h3>&#8377;{finalprice}</h3>
                  </div>

                  <hr />
                  <h5 style={{ cursor: "pointer" }} onClick={senddata} className="p-2">
                    {shapeid || value || secondchage ?  (
                      <button className="preview float-end ">Preview</button>
                    ):null }
                  </h5>
                  <div>
                    <label>Instruction :</label>
                    <textarea
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "white",
                        Row: "10",
                      }}
                      onChange={(e) => setdescription(e.target.value)}
                    ></textarea>
                  </div>
                  <hr />

                  <div className="d-flex align-items-center justify-content-center">
                    {Uiddata != null ? (
                      <button
                        onClick={submitcustdata}
                        className="shop-collection-card-btn sign-btn"
                        id="cart-btn"
                      >
                       {subbutton ? "submit" :"Loading . . ."}
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/signin")}
                        id="cart-btn"
                        className="shop-collection-card-btn sign-btn"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center" }}>
          <div class="section">
            <h1 class="error">404</h1>
            <div class="page">Ooops!!! Somethings went wrong</div>
            <button
              id="cart-btn"
              className="shop-collection-card-btn sign-btn"
              onClick={() => window.location.reload()}
            >
              {" "}
              Please Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customizer;
