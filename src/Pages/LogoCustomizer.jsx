import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogoCustomizer = () => {
  const [logodata, setlogodata] = useState([]);
  const [backimg, setbackimg] = useState();
  const [text, settext] = useState("");
  const [email, setemail] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(backimg,"backimg data trigered")

  const uid = userInfo &&  userInfo.data[0].uid;
const navigate= useNavigate()
  const api = "https://3.111.36.104";
  useEffect(() => {
    axios
      .get(`${api}/user/all-templates/`)
      .then((res) => {
        setlogodata(res.data.data);
        console.log(res.data.data,"done data trigered")

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputchange = (e) => {
    settext(e.target.value);
  };
  const inputemail = (e) => {
    setemail(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("template_product", backimg && backimg.id);
    formData.append("user", uid);
    formData.append("text", text);
    formData.append("email", email);
    axios
      .post("https://3.111.36.104/user/place-order-logo-template/", formData, {
        headers: {
          " Authorization": `bearer ${userInfo.access} `,
        },
      })

      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            background: "#151515",
            title: "<h5 style='color:#1ddb4f'>" + "Order Placed" + "</h5>",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const datasend = (item) =>{
    setbackimg(item)
    settext("")
  }
  return (
    <div>
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="row">
          <div
            className="col-md-6 banner"
            style={{
              backgroundColor: "black",
              overflow: "hidden",
              border: "2px solid white",
              position: "relative",
            }}
          >
            <div
              className="content"
              style={{
                backgroundImage: `url(${api}${
                  backimg ?  backimg.template_image : null
                })`,
              }}
            ></div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="container">
              <div className="row" style={{ height: "380px" }}>
                {logodata.map((item) => {
                  return (
                    <div className="col-md-4 col-sm-4">
                      <img
                        src={`${api + item.template_image}`}
                        className="img-fluid"
                        style={{ width: "80%" }}
                        onClick={() => datasend(item)}
                        onLoad={()=>setbackimg(item)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <form onSubmit={handlesubmit}>
              <p>Type your Text</p>
              <input
                type="text"
                required
                value={text}
                className="form-control bg-black text-white"
                 maxLength={backimg && backimg.max_characters}
                onChange={inputchange}
              ></input>
              
             <span>{`${text.length}/ ${backimg && backimg.max_characters}`}</span>
              <p className="my-3">Type your Email</p>
              <input
                type="email"
                required
                className="form-control bg-black text-white"
                onChange={inputemail}
               
              ></input>

              <button  className="shop-collection-card-btn sign-btn my-2" >submit</button>
              {/* {text.length > 0 && email.endsWith("@gmail.com") ? (
                <button className="shop-collection-card-btn sign-btn my-2" type="button">
                  Submit
                </button>
              ) : (
                <button
                  className="shop-collection-card-btn sign-btn my-2"
                  disabled
                >
                  Submit
                </button>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCustomizer;
