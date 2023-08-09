import React, { useEffect } from "react";
import "../Styles/chat.css";
import { useState } from "react";
import { db, storage } from "../firebase";
import {
  where,
  getDocs,
  query,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Messagechat from "./Messagechat";
import logo from "../assets/img/logo.png";
import Img from "../assets/img/img.png";
import {IoMdSend} from "react-icons/io"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const ChatUI = () => {
  const [chatShow, setChatShow] = useState(false);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);

  const [img, setImg] = useState(null);
  const [text, setText] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const chatInfo = JSON.parse(localStorage.getItem("chat"));

  const chatactive = async () => {
    const snapshot = await getDocs(
      query(
        collection(db, "chatrooms"),
        where("users", "array-contains", userInfo.data[0].uid)
      )
    );

    if (snapshot.docs.length === 0) {
      const dbRef = collection(db, "chatrooms");

      const data = {
        chatRoomid: "Loading",
        users: [userInfo.data[0].uid, "8448158042"],
        userid: userInfo.data[0].uid,
        userName: userInfo.data[0].name,
        firebseToken: userInfo.access,
        createdOn: serverTimestamp(),
        lastMessage: text,
      };

      await addDoc(dbRef, data)
        .then((docRef) => {
          updateDoc(doc(db, "chatrooms", docRef.id), {
            chatRoomid: docRef.id,
            userid: userInfo.data[0].uid,
            users: [userInfo.data[0].uid, "8448158042"],
            userName: userInfo.data[0].name,
            firebseToken: userInfo.access,
            createdOn: serverTimestamp(),
            lastMessage: text,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      try {
        const snapshot1 = query(
          collection(db, "chatrooms"),
          where("users", "array-contains", userInfo.data[0].uid)
        );

        const querySnapshot = await getDocs(snapshot1);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        console.error(error);
      }
      localStorage.setItem("chat", JSON.stringify(user));
    }
  };

  if (userInfo) {
    if (chatShow) {
      setDoc(doc(db, "users", userInfo.data[0].uid), {
        isUserOnline: true,
        lastSeenTime: serverTimestamp(),
        userImage: " ",
        userName: userInfo.data[0].name,
        userNumber: userInfo.data[0].phone,
        userid: userInfo.data[0].uid,
        firebseToken: userInfo.access,
        chatroomid: " ",
      });
    } else {
      setDoc(doc(db, "users", userInfo.data[0].uid), {
        isUserOnline: false,
        lastSeenTime: serverTimestamp(),
        userImage: " ",
        userName: userInfo.data[0].name,
        userNumber: userInfo.data[0].phone,
        userid: userInfo.data[0].uid,
        firebseToken: userInfo.access,
        chatroomid: " ",
      });
    }
  }

  const handleSend = async (e) => {
    e.preventDefault();
    setText(" ")
    // setImg(" ")

    if (img) {
      const random = Math.floor(Math.random() * 100) + 1;

      const storageRef = ref(storage, `chat_images/${random}`);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const additemRef = collection(
              db,
              "chatrooms",
              chatInfo.chatRoomid,
              "messages"
            );

            await addDoc(additemRef, {
              createdOn: serverTimestamp(),
              isText: false,
              Messsageid: "123456",
              seen: false,
              senderid: userInfo.data[0].uid,
              text: downloadURL,
            });
          });
        }
      );
    } else {
      const additemRef = collection(
        db,
        "chatrooms",
        chatInfo.chatRoomid,
        "messages"
      );

      await addDoc(additemRef, {
        createdOn: serverTimestamp(),
        isText: true,
        Messsageid: "123456",
        seen: false,
        senderid: userInfo.data[0].uid,
        text,
      });

      await updateDoc(doc(db, "chatrooms", chatInfo.chatRoomid), {
        lastMessage: text,
      });
    }
  };

  return (
    <>
      {userInfo ? (
        <>
          <div className="chat-bar-collapsible">
            <button
              id="chat-button"
              type="button"
              className="collapsible"
              onClick={() => setChatShow(!chatShow)}
            >
              Chat with us!
              <i
                id="chat-icon"
                style={{ color: "#fff" }}
                className="fa fa-fw fa-comments-o"
              ></i>
            </button>

            <div className={chatShow ? "contents-show" : "contents"}>
              <div className="full-chat-block">
                <div className="outer-container">
                  {chatInfo ? (
                    <>
                      <div className="chat-container">
                        <div id="chatbox">
                          <p id="botStarterMessage" className="botText">
                            <Messagechat />
                          </p>
                          <div className="chat-bar-input-block">
                            <div id="userInput">
                              <textarea
                                required
                                id="textInput"
                                className="input-box"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                type="text"
                                name="msg"
                                placeholder="Type Your message"
                              />
                              <div className="send">
                                <input
                                  type="file"
                                  id="file"
                                  onChange={(e) => setImg(e.target.files[0])}
                                />
                                <label
                                  htmlFor="file"
                                  style={{ padding: "5px" }}
                                >
                                  <img src={Img} alt="" />
                                </label>
                                <button type="submit" onClick={handleSend} style={{border:"none",background:"transparent",outline:"none",fontSize:"1.7rem"}}>
                                  <IoMdSend />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="chat-container">
                        <div id="chatbox" style={{ padding: "10px" }}>
                          <p id="botStarterMessage" className="botText">
                            <center>
                              <div className="d-flex justify-content-center align-items-center">
                                <div>
                                  <img
                                    src={logo}
                                    alt="logo"
                                    width={"80%"}
                                    style={{ padding: "20px" }}
                                  />
                                </div>
                              </div>
                            </center>
                            <p
                              style={{
                                fontSize: "15px",
                                background: "#d9dffd",
                                borderRadius: "10px",
                                padding: "10px",
                                marginRight: "40px",
                              }}
                            >
                              Welcome! We are excited to offer you messaging,
                              allowing you to respond to us in your own time.
                              Click here to get started.
                            </p>
                            <main>
                              <button
                                type="submit"
                                style={{
                                  borderRadius: "20px",
                                  padding: "10px",
                                }}
                                onClick={chatactive}
                              >
                                Let's Go!
                              </button>
                            </main>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatUI;
