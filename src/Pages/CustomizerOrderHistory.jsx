import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const CustomizerOrderHistory = () => {
  const [value, setvalue] = useState([]);
  const itemsPerPage = 6;
const navigate=useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const uid = userInfo.data[0].uid;

  const fetchData = async () => {
    try {
      const data = await axios.post(
        `http://3.111.36.104/user/particular-user-all-order-for-customizer/`,
        {
          user_id: uid,
        },

        { headers: { Authorization: `bearer ${userInfo.access}` } }
      );

      setvalue(data.data.data);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = value.slice(itemOffset, endOffset);
 
  const pageCount = Math.ceil(value.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % value.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Container>
        <div>
          <h1 className="text-center" style={{marginTop:"100px"}}>Customizer Order History</h1>

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
              {currentItems &&
                currentItems.map((order) => {
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
                        <td style={{ color: "#FFF" }}>{order.quantity}</td>

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
                              navigate(`/ordercustomizer/${order.id}`);
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
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
    </div>
  );
};

export default CustomizerOrderHistory;
