import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBox from "../Component/MessageBox";
import { getError } from "../utils";
import Button from "react-bootstrap/esm/Button";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
const itemsPerPage = 9;

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrderHistory = () => {
  const [value, setvalue] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo.data[0].uid;

  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.post(
          `http://3.111.36.104/user/particular-user-orders-history/`,
          {
            user: uid,
          },

          { headers: { Authorization: `bearer ${userInfo.access}` } }
        );
        console.log(data);
        setvalue(data.data);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = value.slice(itemOffset, endOffset);
  console.log(currentItems);
  const pageCount = Math.ceil(value.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % value.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  return (
    <Container id="container">
      <div style={{ marginTop: "100px" }}>
        <div>
          <h1>Order History</h1>
          {loading ? (
            <>Loading</>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ color: "#FFF" }}>ID</th>
                  <th style={{ color: "#FFF" }}>DATE</th>
                  <th style={{ color: "#FFF" }}>TOTAL AMOUNT</th>
                  <th style={{ color: "#FFF" }}>PAID</th>
                  <th style={{ color: "#FFF" }}>ORDER ITEMS</th>
                  <th style={{ color: "#FFF" }}>STATUS</th>
                  <th style={{ color: "#FFF" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order) => {
                  // setorderdata(order)
                  return (
                    <>
                      <tr key={order.id}>
                        <td style={{ color: "#FFF" }}>{order.id}</td>
                        <td style={{ color: "#FFF" }}>
                          {order.order_placedAt.slice(0, 10)}
                        </td>
                        <td style={{ color: "#FFF" }}>{order.total_amount}</td>
                        <td style={{ color: "#FFF" }}>
                          {order.payment_method}
                        </td>
                        <td style={{ color: "#FFF" }}>
                          {order.order_items.length}
                        </td>
                        <td style={{ color: "#FFF" }}>
                          {order.order_status == 1 && "Order Placed"}

                          {order.order_status == 2 && "Order Confirmed"}

                          {order.order_status == 3 && "Order Shipped"}

                          {order.order_status == 4 && "On The Way"}

                          {order.order_status == 5 && "Order Delivered"}

                          {order.order_status == 10 && "Request For Return"}

                          {order.order_status == 20 &&
                            "Request For Cancellation"}

                          {order.order_status == 100 && "Order Returned"}

                          {order.order_status == 200 && "Order Canceled"}
                        </td>
                        <td>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => {
                              navigate(`/order/${order.id}`);
                            }}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        containerClassName="pagination justify-content-end"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        nextClassName="page-item"
        nextLinkClassName="page-link"
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        activeClassName="active"
        previousClassName="page-item"
        previousLinkClassName="page-link"
      />
    </Container>
  );
};

export default OrderHistory;
