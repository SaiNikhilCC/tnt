import axios from "axios";
import { Children, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Usercontext } from "./Usecontext/Context";
export default function EditProfile() {
  const navigate = useNavigate();
  const [counter, setcounter] = useState(0)
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { updataprofile, setupdateprofile } = useContext(Usercontext)
  const uid = userInfo.data[0].uid;



  function userdata() {
    axios
      .post("https://3.111.36.104/user/user-profile/", {
        uid,
      })
      .then((res) => {
       
        setProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    userdata()
  }, [])

  const [profile, setProfile] = useState({
    uid: uid,
    name: "",
    email: "",
    phone: "",
    profile: ""
  });

  const editdata = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value, });

  };
  const handleFile = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.files[0] })
  }


  function isFile(variable) {
    return variable instanceof File;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setcounter(counter + 1)
    const formData = new FormData();
    formData.append("uid", profile.uid);
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    if (isFile(profile.profile)) {
      formData.append("profile", profile.profile);
    }
    axios
      .put(`https://3.111.36.104/user/edit-user-profile/`, formData)
      .then((res) => {
  
        if (res.data.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            background: "#151515",
            title:
              "<h5 style='color:#1ddb4f'>" + "Updated Personal info" + "</h5>",
            showConfirmButton: false,
            timer: 900,
          });
          navigate("/")
          // window.location.reload()
          setupdateprofile(updataprofile + 1)
        }
      })
      .catch((err) => console.log(err));
    // Swal.fire({
    //   position: "top-middle",
    //   icon: "error",
    //   title: "something went wrong",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  };

  return (
    <Container className="small-container">
      <div>
        <h1 className="my-3 text-center">Edit Profile</h1>

        <div>
          <Form onSubmit={handleSubmit} action="post">
            <Form.Group className="d-flex gap-4">
              <Form.Group className="mb-3 col-md-6" controlId="name">
                <Form.Label className="col-md-2">Name</Form.Label>
                <input
                  type="text"
                  required
                  className="shop-collection-card-btn input-field col-md-10"
                  value={profile.name}
                  onChange={editdata}
                  name="name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6" controlId="email">
                <Form.Label className="col-md-2">Email</Form.Label>
                <input
                  type="email"
                  required
                  className=" input-field col-md-10"
                  value={profile.email}
                  onChange={editdata}
                  name="email"
                />
              </Form.Group>

            </Form.Group>
            <Form.Group className="d-flex gap-4">
              <Form.Group className="mb-3 col-md-6" controlId="email">
                <Form.Label className="col-md-2">Phone</Form.Label>
                <input
                  type="number"
                  required
                  className="col-md-10 input-field"
                  value={profile.phone}
                  readOnly
                  name="phone"
                  onChange={editdata}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6" controlId="email">
                <Form.Label className="col-md-2">Profile Pic</Form.Label>
                <input
                  type="file"

                  className="col-md-10 input-field"
                  name="profile"
                  onChange={handleFile}
                />
              </Form.Group>


            </Form.Group>



            <div className="mb-3">
              <button
                type="submit"
                className="shop-collection-card-btn sign-btn"
                id="cart-btn"
                style={{ float: "right" }}
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
