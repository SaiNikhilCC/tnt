import React from "react";
import { Link } from "react-router-dom";

const NeonSignForhomes = () => {
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
                        src="./../../src/assets/images/blog3.png"
                        alt=""
                      />
                    </div>
                    <div className="p-4 ">
                      <h2 className="mb-3 blog-title">
                        Neon Sign Design Ideas for Your Home or Office
                      </h2>
                      <p>
                        Adding a Touch of Personality to Your Living or
                        Workspaces
                      </p>
                      <p>
                        Neon signs are a popular choice for adding a touch of
                        personality and style to homes and offices. From custom
                        messages to intricate designs, neon signs offer endless
                        possibilities for customization and creativity. In this
                        article, we'll explore some neon sign design ideas that
                        can inspire you to add a unique and eye-catching element
                        to your living or work spaces.
                      </p>
                      <h4 className="blog-title">Custom Messages </h4>
                      <p>
                        One of the most popular ways to use neon signs in homes
                        and offices is by creating custom messages. Whether it's
                        a favorite quote, a special date, or a personal mantra,
                        custom messages can be designed to fit any taste or
                        preference. You can choose from a variety of fonts,
                        colors, and sizes to create a truly personalized sign
                        that reflects your individuality.
                      </p>

                      <h4 className="blog-title">Iconic Images </h4>
                      <p>
                        Another way to use neon signs in your living or work
                        space is by featuring iconic images. From classic logos
                        to famous landmarks, neon signs can be used to showcase
                        your favorite places and things. You can choose from a
                        variety of images and colors to create a striking and
                        memorable sign that adds a unique touch to any space.
                      </p>

                      <h4 className="blog-title">Abstract Designs </h4>
                      <p>
                        For those who prefer a more artistic and abstract
                        approach, neon signs can be used to create intricate and
                        visually stunning designs. From geometric shapes to
                        fluid lines, neon signs offer endless possibilities for
                        creating unique and eye-catching pieces of art. These
                        signs can be used as standalone pieces or combined with
                        other elements to create a cohesive and visually
                        appealing design.
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
                      <h4 className="mt-4 blog-title">Inspiring Words </h4>
                      <p>
                        In addition to custom messages, neon signs can also be
                        used to feature inspiring words and phrases. Whether
                        it's a motivational quote, a positive affirmation, or a
                        simple word of encouragement, neon signs can be used to
                        add a touch of inspiration and motivation to any space.
                        You can choose from a variety of fonts and colors to
                        create a sign that perfectly captures your message.
                      </p>
                      <p>Final word for the Tribe! </p>
                      <p>
                        Neon signs offer endless possibilities for adding a
                        unique and eye-catching element to your living or work
                        spaces. From custom messages to iconic images, abstract
                        designs, and inspiring words, neon signs can be
                        customized to fit any taste or preference. Whether
                        you're looking to add a touch of personality to your
                        home or office, a neon sign is a great choice for
                        creating a memorable and visually striking piece of
                        decor.{" "}
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

export default NeonSignForhomes;
