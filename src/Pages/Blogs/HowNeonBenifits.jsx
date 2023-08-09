import React from "react";
import { Link } from "react-router-dom";

const HowNeonBenifits = () => {
  return (
    <React.Fragment>
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="row g-5">
                <div className="col-md-12 wow slideInUp" data-wow-delay="0.1s">
                  <div className=" blog-item   rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-4 ">
                      <h2 className="mb-3 blog-title">
                        How Neon Signs Can Benefit Your Business
                      </h2>
                      <p>
                        Increasing Visibility, Attracting Customers, and Adding
                        Character to Storefronts
                      </p>
                      <p>
                        Neon signs have been used for over a century to
                        advertise businesses and attract customers. But why are
                        they still such a popular choice? In this article, we'll
                        explore the many benefits of using neon signs for your
                        business, including increased visibility, customer
                        attraction, and character.
                      </p>
                      <h4 className="blog-title">Increasing Visibility </h4>
                      <p>
                        One of the primary benefits of neon signs is their
                        ability to increase visibility. Neon signs are bright,
                        colorful, and eye-catching, making them an excellent
                        choice for businesses that want to stand out from the
                        competition. Whether you're located on a busy street or
                        tucked away in a corner, a neon sign can help customers
                        find your business and attract attention to your
                        storefront.
                      </p>
                     
                      <h4 className="blog-title">Attracting Customers </h4>
                      <p>
                      In addition to increasing visibility, neon signs can also attract customers. When used in conjunction with other forms of advertising, such as billboards or flyers, neon signs can help build brand awareness and generate interest in your business. Neon signs can also create a sense of excitement and curiosity, encouraging customers to come inside and see what your business has to offer. 
                      </p>
                    
                      <h4 className="blog-title">
                      Adding Character 
                      </h4>
                      <p>
                      Finally, neon signs can add character and personality to your storefront. Custom neon signs can be designed to feature your business's name, logo, or message, giving your storefront a unique and memorable look. Whether you're a small business or a large corporation, a neon sign can help create a distinctive brand identity and set your business apart from the competition. 
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            className="img-fluid"
                            src="./../../src/assets/images/blog1.jpg"
                            alt=""
                          />
                          <img
                            className="img-fluid"
                            src="./../../src/assets/images/black_neon.jpg"
                            alt=""
                          />
                        </div>
                        <div className="col-md-6">
                          <img
                            src="./../../src/assets/images/good_vibes.jpg"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <p className="mt-4">
                      Final word for the Tribe! 
                      </p>
                      <p>
                      Neon signs are a classic and timeless form of advertising that can benefit any business. Whether you're looking to increase visibility, attract customers, or add character to your storefront, a neon sign can help you achieve your goals. From simple signs to elaborate designs, neon signs offer endless possibilities for customization and creativity. If you're looking for a way to make your business stand out and leave a lasting impression, a neon sign is a great choice. 
                      </p>
                    
                    </div>
                  </div>
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

export default HowNeonBenifits;
