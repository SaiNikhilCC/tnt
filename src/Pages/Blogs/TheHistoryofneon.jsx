import React from "react";
import { Link } from "react-router-dom";

const TheHistoryofneon = () => {
  return (
    <React.Fragment>
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="row g-5">
                <div className="col-md-12 wow slideInUp" data-wow-delay="0.1s">
                  <div className="blog-item  rounded overflow-hidden">
                    <div className="blog-img position-relative overflow-hidden">
                      <img
                        className="img-fluid"
                        src="./../../src/assets/images/blog1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="p-4 ">
                      <h1 className="mb-3 blog-title">
                        The History of Neon Signs 
                      </h1>
                      <p>From Humble Beginnings to Iconic Advertisements </p>
                      <p>
                        Neon signs have been a staple of advertising for over a
                        century, but where did they come from, and how have they
                        evolved over time? In this article, we'll take a look at
                        the origins of neon signs, how they're made, and how
                        they've been used in advertising throughout history.{" "}
                      </p>
                      <h4 className="blog-title">Origins of Neon Signs </h4>
                      <p>
                        The history of neon signs dates back to the early 1900s,
                        when French engineer Georges Claude invented the first
                        neon lamp in 1902. The lamp consisted of a sealed glass
                        tube filled with neon gas and an electrode at each end.
                        When a high voltage was applied to the electrodes, the
                        gas inside the tube glowed brightly, creating a
                        distinctive and eye-catching light.{" "}
                      </p>
                      <p>
                        Claude's invention quickly caught on, and neon signs
                        began appearing in Paris and other major cities across
                        Europe. In 1923, neon signs made their way to the United
                        States, where they quickly became a popular form of
                        advertising.{" "}
                      </p>
                      <h4 className="blog-title">Types of Neon Lights </h4>
                      <p>
                        Today, there are several types of neon lights, each with
                        its own unique properties and applications.{" "}
                      </p>
                      <ul>
                        <li>
                          <h6 className="blog-title">
                            Traditional Neon Signs:
                          </h6>{" "}
                          <p>
                            These signs are made using glass tubes filled with
                            neon gas, which glows brightly when a current is
                            applied. Traditional neon signs are often used for
                            outdoor advertising and storefront displays.
                          </p>
                        </li>
                        <li>
                          <h6 className="blog-title">Cold Cathode Tubes:</h6>{" "}
                          <p>
                            Cold cathode tubes are similar to traditional neon
                            signs, but they're made using a different type of
                            gas and a higher voltage. They're often used for
                            indoor lighting and decorative purposes.
                          </p>
                        </li>
                        <li>
                          <h6 className="blog-title">LED Neon Signs:</h6>{" "}
                          <p>
                            LED neon signs use light-emitting diodes (LEDs) to
                            create a neon-like glow. They're more
                            energy-efficient and durable than traditional neon
                            signs, and they're often used for indoor signage and
                            home decor.
                          </p>
                        </li>
                      </ul>
                      <h4 className="blog-title">
                        Advertising with Neon Signs
                      </h4>
                      <p>
                        Neon signs have been used in advertising since their
                        inception, and they continue to be a popular choice for
                        businesses looking to attract attention and stand out
                        from the competition.
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
                        In the early days of neon signs, businesses used them to
                        advertise everything from beer to cigarettes to car
                        dealerships. Over time, neon signs became more elaborate
                        and artistic, featuring intricate designs and unique
                        shapes.
                      </p>
                      <p>Today, neon signs are still used in advertising, but they're also a popular choice for home decor and personal expression. Custom neon signs can be designed to feature any message or image, making them a versatile and creative option for businesses and individuals alike. </p>
                      <p>Final word for the Tribe! </p>
                      <p>Neon signs have come a long way since their invention in the early 1900s. From humble beginnings as a simple lamp, they've evolved into a versatile and iconic form of advertising and decoration. Whether you're a business owner looking to attract customers or an individual looking to add some personality to your space, neon signs are a great choice for making a statement and standing out from the crowd. </p>

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

export default TheHistoryofneon;
