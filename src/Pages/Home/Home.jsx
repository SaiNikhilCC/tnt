import React, { useEffect, useState,Fragment } from "react";
import axios from "axios";
import HeroSection from "../../Component/HeroSection";
import Category from "../../Component/Category";
import { url } from "../../api";
import Carousel from "react-multi-carousel";

import "../../Styles/Home.css";
import ReactCompareImage from "react-compare-image";
import image from "./../../assets/images/Layer-6-1024x231.png";
import image2 from "./../../assets/images/WHy-neon-tribe.webp";
import image3 from "./../../assets/images/Layer 44.png";
import image4 from "./../../assets/images/free.png";
import image5 from "./../../assets/images/premium.png";
import image6 from "./../../assets/images/power-efficient.png";
import image7 from "./../../assets/images/world-class.png";
import image8 from "./../../assets/images/satisfaction.png";
import image9 from "./../../assets/images/easy-customization.png";
import before from "./../../assets/images/Rectangle-16.png";
import after from "./../../assets/images/Layer-50.png";
import { Link, useNavigate } from "react-router-dom";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1224, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Home = () => {

  const navigate = useNavigate()

  const Url = "https://3.111.36.104"

  const [product, setProduct] = useState([]);

  const [banners, setBanners] = useState([]);
// fetching the product api
  const getproduct = () => {
    axios.get(`${url}get-all-products/`).then((res) => {
      setProduct(res.data.results);
    });
  };
  useEffect(() => {
    getproduct();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://3.111.36.104/sadmin/all-banner/');
      setBanners(response.data.data);
                                                      } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };


  const bannerdata = (banner) =>{
    navigate(`/category/${banner.category}`)
  }


  return (
    <>
      {/* ---------------------------hero section---------------------- */}
      <div className="container" style={{marginTop:"100px", maxWidth:"1400px"}}>
          

          <Slider {...settings}>
               
               {Array.isArray(banners) ? (
                 banners.map((banner) => (
                   <div key={banner.id}>
                     {/* Render the banner data */}
                     <img src = {Url+banner.banner} style={{width:"100vw",height:'70vh'}} onClick={()=>bannerdata(banner)} />
                  </div>
                 ))
               ) : (
                 <p>No banners available.</p>
               )}
              
             </Slider>
          </div>
      <HeroSection />
       
         
        {/* ---------------------------category section---------------------- */}
      <div
        className=" mt-5 mb-5  d-md-flex justify-content-md-center"
        id="card-container"
      >
        
        <div className="col-md-10">
          <Category />
        </div>
      </div>

      <div className="tnt-container Neon-Tribe col-md-12 d-flex justify-content-center ">
        <div className="col-10">
          <h1 className="text-left">
            WHY <br />
            NEON TRIBE
          </h1>
        </div>
      </div>
      <div className="neon-tribe-img ">
        <img src={image} alt="background" />
      </div>
      <div className=" why-neon-tribe-person-img text-center">
        <img src={image2} alt="why-neon-tribe" />
      </div>

      <section>
        <div className="container">
          <div className="tnt-container why-tribe-content-rows">
            <div className="row">
              <div className="col-md-6  col-xl-3 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image3} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>ONE YEAR</h5>
                    <p> WARRANTY</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-3 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image4} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>FAST + FREE</h5>
                    <p> SHIPPING</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xl-3 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image5} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>PREMIUM</h5>
                    <p> QUALITY</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xl-3 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image6} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>POWER</h5>
                    <p> EFFICIENT</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-md-3 mt-sm-2">
              <div className="col-md-4 col-sm-12 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image7} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>WORLD className</h5>
                    <p> CRAFTMANSHIP</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 mt-2">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content ">
                  <div className="icon icon-sm pl-4">
                    <img src={image8} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>100% CUSTOMER</h5>
                    <p> SATISFACTION RATE</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 mt-2 ">
                <div className="d-flex why-tnt-icon-boxes why-tribes-content">
                  <div className="icon icon-sm pl-4">
                    <img src={image9} />
                  </div>

                  <div className="pl-4 why-us">
                    <h5>EASY</h5>
                    <p> CUSTOMIZATIONS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tnt-container col-md-12 mt-4 d-flex justify-content-center">
        <div className="preview-img col-md-8">
          <ReactCompareImage
            hover={true}
            vertical={false}
            leftImage={before}
            rightImage={after}
          />
        </div>
      </section>
              {/* ---------------------------category section---------------------- */}

      <section className="tnt-container mt-4">
        <div className="Shop-Collection tnt-container"></div>
        <div
          className=" tnt-container  shop-collection-cards mt-5 mb-5 d-md-flex justify-content-md-center  "
          id="card-container"
        >
          <div className="col-md-10">
            <h3 className="text-left">POPULAR  PRODUCTS</h3>

            <Carousel
              responsive={responsive}
              showDots={true}
              swipeable={false}
              draggable={true}
            >
              {product.map((item) => {
                return (
                  <div className=" mt-5 " key={item.id}>
                    <div className="card" >
                      <Link to={`/product/${item.id}`}>
                        <img
                          className="card-img-top shop-collection-cards-card-image-top"
                          src={item.thumbnail}
                          alt="Card image cap"
                          style={{ height: "20rem" }}
                        />
                      </Link>
                      <div className="card-body shop-collection-cards-card-content text-center">
                        <h5 className="card-title">{item.product_title}</h5>
                        <p className="card-text"> &#8377; {item.size_selling_price_1}</p>
                        <Link to={`/product/${item.id}`}>
                          <button className="shop-collection-card-btn">
                            SHOP
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
