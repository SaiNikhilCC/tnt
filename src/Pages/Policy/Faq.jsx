import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "../../Styles/Policy.css"

const Faq = () => {
  return (
    <React.Fragment>
      <div className="tnt-container ">
      <h1 className="text-center">FAQ</h1>
        <div className="inner-content col-md-12 d-flex align-items-center justify-content-center mt-5">
          
          <div className="accordian mt-5 col-md-8 ">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  1. What if I require changes to my current design?{" "}
                </Accordion.Header>
                <Accordion.Body>
                  Ans:- If you require modifications to your current design, our team
                  is always available to assist you. Simply provide us with a
                  design reference, and we will provide you with a final mockup
                  that will be sent for manufacturing. If you are in contact
                  with our customer care executive, please let them know about
                  your design amendment requests. If the manufacturing of your
                  board has not been completed, we will incorporate those
                  changes as required.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                2. How long does it take to make a neon signboard? 
                </Accordion.Header>
                <Accordion.Body>
                  Ans:- The typical delivery time for crafting a neon signboard is approximately 8 to 10 working days. After you place your order, we usually require 5 days to prepare it, and an additional 5 days to ship it to your location. Please note that our manufacturing unit does not operate on Sundays. 
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                3. Although I like the product, I'm uncertain about which size to order ?
                </Accordion.Header>
                <Accordion.Body>
                Ans:- If you are unsure about which size to order, mid-range sizes are ideal for home decoration, and the best way to determine what size will suit your needs is to measure your wall physically with tape and use our website to find the appropriate size. Starting range products are also great for gifting.                 </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                4. I am looking for Cash on Delivery as a payment option ?
                </Accordion.Header>
                <Accordion.Body>
                Ans:- We do not offer Cash on Delivery as neon signboards are a piece of artwork with intricate details that are all handcrafted. We do, however, provide a 50-50% advance payment option for our customers. To learn more about this option, please contact our customer care team over WhatsApp. Rest assured, we prioritize post-service satisfaction for our clients.                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                5. Is there a delivery fee?
                </Accordion.Header>
                <Accordion.Body>
                Ans:- You will only need to pay premium courier charges if you require speedy delivery. Otherwise, we use premium courier companies that deliver the product for FREE within 5 days.                  </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>
                6. What if my product arrives broken during delivery?
                </Accordion.Header>
                <Accordion.Body>
                Ans:- If your product arrives broken, we have a breakage policy for every product. We request that you provide us with an unboxing video of the product to verify that it was delivered broken. Once you raise your concern, we will provide you with a new product within 5 days.                  </Accordion.Body>
              </Accordion.Item>






            </Accordion>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
