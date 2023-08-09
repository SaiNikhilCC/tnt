import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop";
import AbousUs from "./Pages/AbousUs";
import Contact from "./Pages/Contact";
import ProductScreen from "./Pages/Productdetails";
import Cart from "./Pages/Cart";
import Signin from "./Pages/Signin";
import Footer from "./Component/Footer";
import SignUp from "./Pages/SignUp";
import ShippingAddressScreen from "./Pages/ShippingAddressScreen";
import Faq from "./Pages/Policy/Faq";
import Privacy from "./Pages/Policy/Privacy";
import TermCondition from "./Pages/Policy/Term";
import Cancellation from "./Pages/Policy/Cancellation";
import Payment from "./Pages/Policy/Payment";
import Refund from "./Pages/Policy/Refund";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CategoryPage from "./Component/CategoryPage";
import FOF from "./Pages/F0F";
import EditProfile from "./Pages/EditProfile";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderHistory from "./Pages/OrderHistory";
import OrderSummary from "./Pages/OrderSummary";
import EditAddress from "./Pages/EditAddress";
import Customizer from "./Pages/Customizer";
import Blog from "./Pages/Policy/Blog";
import TheHistoryofneon from "./Pages/Blogs/TheHistoryofneon";
import HowNeonBenifits from "./Pages/Blogs/HowNeonBenifits";
import NeonSignForhomes from "./Pages/Blogs/NeonSignForhomes";
import ImpactOfNeon from "./Pages/Blogs/ImpactOfNeon";
import Chat from "./Component/Chat";
import ChatUI from "./Component/ChatUI";
import Context from "./Pages/Usecontext/Context.jsx";
import PrivacyPolicy from "./Pages/Policy/Privacypolicy";
import Placeordercustom from "./Pages/Placeordercustom";
import Customizerorderpay from "./Pages/Customizerorderpay";
import CustomizerOrderHistory from "./Pages/CustomizerOrderHistory";
import OrderCustomizerPreview from "./Pages/OrderCustomizerPreview";
import LogoCustomizer from "./Pages/LogoCustomizer";
import AddAddress from "./Pages/AddAddress";
import Wishlistorderpay from "./Component/Wishlistorderpay";
import Wishlistpayment from "./Component/Wishlistpayment";
const App = () => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo",));
  // const isPrime=userInfo && userInfo.data[0].is_prime;

  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <ToastContainer position="bottom-center" limit={1} />

        <Routes>
          {/*------------------------------Routes for signup/signin---------------------------------------------- */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          {/*------------------------------Routes for signup/signin close---------------------------------------------- */}

          {/*------------------------------Routes for All main pages---------------------------------------------- */}

          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/aboutus" element={<AbousUs />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/addaddress" element={<AddAddress />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/editAddress/:id" element={<EditAddress />} />
          <Route path="/userprofile" element={<EditProfile />} />
          <Route path="/placeorder/:id" element={<PlaceOrderScreen />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderSummary />} />
          <Route
            path="/ordercustomizer/:id"
            element={<OrderCustomizerPreview />}
          />
          <Route path="/customizer" element={<Customizer />} />
          <Route path="/placeordercustom/:id" element={<Placeordercustom />} />
          <Route path="/customizerpay/:id" element={<Customizerorderpay />} />
          <Route
            path="/customizerorderhistory"
            element={<CustomizerOrderHistory />}
          />
          <Route path="/logocustomizer" element={<LogoCustomizer />} />
          <Route path="/wishlistorder" element={<Wishlistorderpay />} />

          <Route path="/wishlispatment/:id" element={<Wishlistpayment />} />
          <Route path="*" element={<FOF />} />
          {/*------------------------------Routes for All main pages close---------------------------------------------- */}

          {/* ------------------------------------all blogs routes--------------------- */}
          <Route path="/blog" element={<Blog />} />

          <Route
            path="/the-history-of-neon-signs"
            element={<TheHistoryofneon />}
          />
          <Route
            path="/How-neon-signs-can-benefit-your-business"
            element={<HowNeonBenifits />}
          />
          <Route
            path="/Neon-sign-design-ideas-for-your-home-Office"
            element={<NeonSignForhomes />}
          />
          <Route
            path="/The-impact-of-color-in-neon-signs"
            element={<ImpactOfNeon />}
          />
          {/* ------------------------------------all blogs routes close--------------------- */}

          {/* ------------------------------------all policyPages routes --------------------- */}

          <Route path="/privacyPolicy" element={<Privacy />} />
          <Route path="/term&condition" element={<TermCondition />} />
          <Route path="/cancellationPolicy" element={<Cancellation />} />
          <Route path="/paymentPolicy" element={<Payment />} />
          <Route path="/refundpolicy" element={<Refund />} />
          <Route path="policy" element={<PrivacyPolicy/> }/>
          {/* ------------------------------------all policyPages routes close--------------------- */}
        </Routes>

        {/*---------------------------- chat component--------------- */}
        {/* {isPrime && isPrime ?<><ChatUI /></>:<></>} */}
        <ChatUI />

        {/*---------------------------- Footer component--------------- */}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
