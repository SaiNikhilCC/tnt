import React, { useEffect, useState } from "react";
import "./../Styles/Shop.css";
import axios from "axios";
import { url } from "../api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "../Styles/Hero.css";

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

const Category = () => {
  const [cat, setCategory] = useState([]);
  const[loading,setloading]=useState(true)

  const getCategory = () => {
    axios
      .get(`${url}all-category/`)
      .then((res) => {
        setloading(false)
        setCategory(res.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <React.Fragment>
      {loading ?<>
      
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
        </div></>:<>

      <div className="Shop-Collection tnt-container">
        <h1 className="text-center">
          SHOP <span style={{ color: "#fe4003" }}>COLLECTION</span>
        </h1>
      </div>

      <div
        className=" tnt-container  shop-collection-cards mt-5 mb-5 "
        id="card-container"
      >
      <div className="col-md-12">
        <h3 className="category-title">Category List</h3>
        <Carousel
          responsive={responsive}
          showDots={true}
          swipeable={false}
          draggable={true}
        >
          {cat.map((item) => {
            return (
              <div className=" mt-5 " key={item.id}>
                <div className="card" style={{ margin: "2rem",  }}>
                  <Link to={`/category/${item.id}`}>
                    <img
                      className="card-img-top shop-collection-cards-card-image-top"
                      src={item.category_image}
                      alt="Card image cap"
                      style={{height:"20rem"}}
                    />
                  </Link>
                  <div className="card-body shop-collection-cards-card-content text-center">
                    <h5 className="card-title">{item.category}</h5>
                    <p className="card-text"></p>
                    <Link reloadDocument to={`/category/${item.id}`}>
                      <button
                        style={{ padding: "10px !important" }}
                        className=" shop-collection-card-btn"
                      >
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
      
      </>}


      
    </React.Fragment>
  );
};

export default Category;
