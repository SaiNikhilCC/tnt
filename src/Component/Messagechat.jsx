import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import "../Styles/chat.css";
import {
  doc,
  onSnapshot,
  query,
  collection,
  collectionGroup,
  orderBy,
} from "firebase/firestore";

const Messagechat = () => {
  const [messages, setMessages] = useState([]);

  const chatInfo = JSON.parse(localStorage.getItem("chat"));

  useEffect(() => {
    const getChats = () => {
      const documentRef = doc(db, "chatrooms", chatInfo.chatRoomid);

      const nestedCollectionRef1 = collection(documentRef, "messages");

      const unsubscribe1 = onSnapshot(
        query(nestedCollectionRef1, orderBy("createdOn")),
        (snapshot) => {
          const newData = [];
          snapshot.forEach((doc) => {
            newData.push(doc.data());
          });
          setMessages(newData);
        },
        (error) => {
          console.error("Error fetching Nested Collection 1:", error);
        }
      );

      return () => {
        unsubscribe1();
      };
    };
    getChats();
  }, []);

  return (
    <div>
      {messages.map((i) => {
        return (
          <>
            <div
              className={`message ${
                i.senderid !== "8448158042" ? "owner" : "false"
              }`}
            >
              <div className="messageContent">
                <div >
                  {i.isText ? (
                    <p className="d-flex  flex-column">
                      <span>{i.text}</span>
                    <span style={{fontSize:".7rem"}}>
                          
                          { i.isText && i.createdOn  ? (
                                      <>
                                        {i.createdOn
                                          .toDate()
                                          .toLocaleTimeString([], {
                                            hour:"2-digit",
                                            minute: "2-digit",
                                          })}
                                      </>
                                    ) : (
                                      <>Loding </>
                                    )}</span>                  
                    
                    
                    </p>
                  ) : (
                    <>
                      <img src={i.text} width={"100%"} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Messagechat;
