import React from "react";
import "./../../Styles/Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <React.Fragment>
      <div className="container-fluid py-md-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className=" row gap-5 p-0">
                
                <div className="col-md-5 wow slideInUp p-0" data-wow-delay="0.1s">
                <Link to={"/the-history-of-neon-signs"}>
                  <div className="blog-item  rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3">
                          <i className="far fa-user text-primary me-2"></i>John
                          Doe
                        </small>
                        <small>
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          01 Jan, 2045
                        </small>
                      </div>
                      <h4 className="mb-3">The History of Neon Signs: </h4>
                      <p>From Humble Beginnings to Iconic Advertisements </p>
                      <Link className="text-uppercase sign-btn" to={""}>
                        Read More <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  </Link>
                </div>
                
                
                <div className="col-md-5 wow slideInUp p-0" data-wow-delay="0.6s">
                  <Link to={"/How-neon-signs-can-benefit-your-business"}>
                  <div className="blog-item  rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3">
                          <i className="far fa-user text-primary me-2"></i>John
                          Doe
                        </small>
                        <small>
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          01 Jan, 2045
                        </small>
                      </div>
                      <h4 className="mb-3">
                        How Neon Signs Can Benefit Your Business:
                      </h4>
                      <p>
                        Increasing Visibility, Attracting Customers, and Adding
                        Character to Storefronts
                      </p>
                      <Link className="text-uppercase sign-btn" to={""}>
                        Read More <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-5 wow slideInUp p-0" data-wow-delay="0.1s">
                  <Link to="/Neon-sign-design-ideas-for-your-home-Office">
                  <div className="blog-item  rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog3.png"
                        alt=""
                      />
                    </div>
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3">
                          <i className="far fa-user text-primary me-2"></i>John
                          Doe
                        </small>
                        <small>
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          01 Jan, 2045
                        </small>
                      </div>
                      <h4 className="mb-3">
                        Neon Sign Design Ideas for Your Home or Office:
                      </h4>
                      <p>
                        Adding a Touch of Personality to Your Living or Work
                        Spaces
                      </p>
                      <Link className="text-uppercase sign-btn" to={""}>
                        Read More <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-5 wow slideInUp p-0" data-wow-delay="0.6s">
                  <Link to="/The-impact-of-color-in-neon-signs">
                  <div className="blog-item  rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog4.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-4">
                      <div className="d-flex mb-3">
                        <small className="me-3">
                          <i className="far fa-user text-primary me-2"></i>John
                          Doe
                        </small>
                        <small>
                          <i className="far fa-calendar-alt text-primary me-2"></i>
                          01 Jan, 2045
                        </small>
                      </div>
                      <h4 className="mb-3">
                        The Impact of Color in Neon Signs:
                      </h4>
                      <p>
                        Using Psychology to Influence Customer Behaviour and
                        Buying Decisions.
                      </p>
                      <Link className="text-uppercase sign-btn" to={""}>
                        Read More <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  </Link>
                  
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="mb-5 wow slideInUp" data-wow-delay="0.1s">
                <div className="section-title section-title-sm position-relative pb-3 mb-4">
                  <h3 className="mb-0">Recent Post</h3>
                </div>
                <div className="d-flex rounded overflow-hidden mb-3" style={{backgroundColor:"#151515"}}>
                  <img
                    className="img-fluid"
                    src="./../../src/assets/images/blog4.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <Link
                    to={"/The-impact-of-color-in-neon-signs"}
                    className="h5 fw-semi-bold d-flex align-items-center  px-3 mb-0"
                  >
                    The Impact of Color in Neon Signs
                  </Link>
                </div>
                <div className="d-flex rounded overflow-hidden mb-3" style={{backgroundColor:"#151515"}}>
                  <img
                    className="img-fluid"
                    src="./../../src/assets/images/blog2.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <Link
                    to={"/How-neon-signs-can-benefit-your-business"}
                    className="h5 fw-semi-bold d-flex align-items-center px-3 mb-0"
                  >
                   How Neon Signs Can Benefit Your Business
                  </Link>
                </div>
                <div className="d-flex rounded overflow-hidden mb-3" style={{backgroundColor:"#151515"}}>
                  <img
                    className="img-fluid"
                    src="./../../src/assets/images/blog3.png"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <Link
                    to={"/Neon-sign-design-ideas-for-your-home-Office"}
                    className="h5 fw-semi-bold d-flex align-items-center  px-3 mb-0"
                  >
                  Neon Sign Design Ideas for Your Home or Office
                  </Link>
                </div>
                <div className="d-flex rounded overflow-hidden mb-3" style={{backgroundColor:"#151515"}}>
                  <img
                    className="img-fluid"
                    src="./../../src/assets/images/blog1.jpg"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <Link
                    to={"/the-history-of-neon-signs"}
                    className="h5 fw-semi-bold d-flex align-items-center  px-3 mb-0"
                  >
                    The History of Neon Signs
                  </Link>
                </div>
            
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blog;
