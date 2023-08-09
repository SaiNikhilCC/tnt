import React, { useState, useEffect, useRef } from "react";
import Messagechat from "./Messagechat";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import SendChatMessage from "./SendChatMessage";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages); 
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main>
        {messages &&
          messages.map((message) => (
            <Messagechat key={message.id} message={message} />
          ))}
      </main>
      <div>{/* <SendChatMessage /> */}</div>
    </>
  );
};

export default Chat;
