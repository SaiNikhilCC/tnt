import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "./Product";
import Accordion from "react-bootstrap/Accordion";
import ReactPaginate from "react-paginate";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "SUB_CAT":
      return { ...state, subCategories: action.payload, loading: false };
    default:
      return state;
  }
};

const CategoryPage = () => {
  const itemsPerPage = 8;
  const [catdata, setCat] = useState([]);
  const [subcat, setSubCategory] = useState([]);
  const [data, setdatafilter] = useState([]);
  const [allcatdata, setAllcat] = useState([]);
  const[subCategories,setSubCategoryItem]=useState({})

  const params = useParams();
  const { id } = params;

  const [{ loading, error, products, resultf }, dispatch] = useReducer(
    reducer,
    {
      products: [],
      resultf: [],
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "http://3.111.36.104/sadmin/all-products/"
        );

        

        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const getCategory = () => {
    axios
      .get(
        `http://3.111.36.104/user/particular-category-sub-category-list/${id}`
      )
      .then((res) => {


        setSubCategory(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  const cat = () => {
    axios
      .get(`http://3.111.36.104/user/category-details/${id}/`)
      .then((res) => {


        setCat(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  const allcat = () => {
    axios
      .get(`http://3.111.36.104/user/all-category/?page=1`)
      .then((res) => {
        console.log(res,"all cat done")
        setAllcat(res.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategory();
    cat();
    allcat();
  }, []);

  const passfildata = async (item) => {
    const resultf = products.filter((x) => x.sub_category.id == item.id);
    setdatafilter(resultf);
    
  };

 
  const catfilterHeading = catdata.map((i) => i.category);

  const catfilter = products.filter(
    (x) => x.category.id == catdata.map((i) => i.id)
  );

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = catfilter.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(catfilter.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % catfilter.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return loading ? (
    <div className="bg-dark" >
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
  ) : error ? (
    <h2>error</h2>
  ) : (
    <>
      <div>
        <Container style={{ marginTop: "60px" }}>
          <br />
          <h4>Selected category : {catfilterHeading}</h4>
         
          
          <br />
          <Row>
            <Col
              md={3}
              sm={12}
              className="justify-content-center align-items-center"
            >
              <div style={{ background: "#151515", borderRadius: "10px" }}>
                <div className="mt-4">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Sub-categories</Accordion.Header>

                      <Accordion.Body>
                        {subcat.map((item) => {
                     
                          return (
                          <div
                            style={{ cursor: "pointer" }}
                            key={item.id}
                            onClick={() => passfildata(item)}
                          >
                            <hr />

                            <h6 style={{ textAlign: "center" }} >
                              {item.sub_category}
                            </h6>
                          </div>
                          )
})}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Other categories</Accordion.Header>

                      <Accordion.Body>
                        <div>
                          {allcatdata.map((i) => {
                            return (
                            <Link
                              reloadDocument
                              to={`/category/${i.id}`}
                              key={i.id}
                            >
                              <hr />

                              <h6 style={{ textAlign: "center" }} className={catfilterHeading==i.category?"active-sub":""}>
                                {i.category}
                              </h6>
                            </Link>
                            )
})}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </Col>
            <Col md={9} sm={12}>
              <div className="homescreen_products">
                {loading ? (
                  <h2>Loading....</h2>
                ) : error ? (
                  <h2>Error</h2>
                ) : (
                  <>
                    { data.length > 0 ? (
                      <div className="d-flex flex-wrap gap-2">
                        {data.map((product) => (
                          <Product key={product.id} product={product}></Product>
                        ))}
                      </div>
                    ) : (
                      <>
                        {currentItems.map((product) => (
                          <Product key={product.id} product={product}></Product>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
          {/* <ReactPaginate
            breakLabel="..."
            containerClassName="pagination justify-content-end"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={8}
            nextClassName="page-item"
            nextLinkClassName="page-link"
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            activeClassName="active"
            previousClassName="page-item"
            previousLinkClassName="page-link"
          /> */}
        </Container>
      </div>
    </>
  );
};

export default CategoryPage;
