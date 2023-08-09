import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendChatMessage = () => {
  const [input, setInput] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const sendMessage = async (e) => {
    e.preventDefault();
    const input =xyz.value;
    if (input.length === 5) {
      alert("Please enter a valid message");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: input,
      name: userInfo.data[0].name,
      uid: userInfo.data[0].uid,
      timestamp: serverTimestamp(),
    });
    // setInput();
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage}>
      <input className="xyz"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendChatMessage;
