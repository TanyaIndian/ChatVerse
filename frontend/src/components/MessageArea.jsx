import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const MessageArea = () => {
  const { selectedUser, userData, socket } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [flyPlane, setFlyPlane] = useState(false);

  const image = useRef();
  const mainRef = useRef(null);

  const { messages } = useSelector((state) => state.message);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const planeRef = useRef();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage == null) {
      return;
    }

    setFlyPlane(true);
    setTimeout(() => setFlyPlane(false), 2000);

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
    }
  };
  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };
  useEffect(() => {
    socket?.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div
      ref={mainRef}
      className={`lg:w-[70%] relative ${
        selectedUser ? "flex" : "hidden"
      } lg:flex w-full h-full border-l-2 border-rose-300 overflow-hidden`}
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-rose-100 -z-20" />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <Scene planeRef={planeRef} flyPlane={flyPlane} />
        </Canvas>
      </div>

      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col overflow-hidden gap-5 items-center relative z-10">
          <div className="w-full h-[100px] bg-gradient-to-tr from-rose-400 to-orange-300 rounded-b-[30px] shadow-md flex items-center px-5 gap-5">
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white hover:text-rose-200 transition" />
            </div>
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-md shadow-rose-400">
              <img
                src={selectedUser?.image || dp}
                alt=""
                className="h-full object-cover"
              />
            </div>
            <h1 className="text-white font-semibold text-[20px]">
              {selectedUser?.name || "user"}
            </h1>
          </div>

          <div className="w-full h-[70%] flex flex-col py-7 px-5 overflow-auto gap-5 relative z-10">
            {showPicker && (
              <div className="absolute bottom-[120px] left-[20px] z-50">
                <EmojiPicker
                  width={250}
                  height={350}
                  className="shadow-lg rounded-lg"
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            {messages &&
              messages.map((mess) =>
                mess.sender == userData._id ? (
                  <SenderMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                  />
                ) : (
                  <ReceiverMessage
                    key={mess._id}
                    image={mess.image}
                    message={mess.message}
                  />
                )
              )}
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-5 flex items-center justify-center px-5 z-20">
          <img
            src={frontendImage}
            alt=""
            className="w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-md shadow-rose-400"
          />
          <form
            className="z-10 w-[95%] lg:w-[70%] h-[60px] bg-gradient-to-tr from-rose-400 to-orange-300 rounded-full shadow-lg flex items-center gap-5 px-5 relative"
            onSubmit={handleSendMessage}
          >
            <div onClick={() => setShowPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="w-[25px] h-[25px] text-white cursor-pointer" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />
            <input
              type="text"
              className="w-full h-full px-3 outline-none border-0 text-white bg-transparent placeholder-white text-lg"
              placeholder="Type a message to see magic"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div onClick={() => image.current.click()}>
              <FaImages className="w-[25px] h-[25px] cursor-pointer text-white" />
            </div>
            {(input.length > 0 || backendImage != null) && (
              <button type="submit">
                <RiSendPlane2Fill className="w-[25px] h-[25px] cursor-pointer text-white" />
              </button>
            )}
          </form>
        </div>
      )}

      {/* No User Selected */}
      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-rose-100 relative z-10">
          <h1 className="text-rose-500 font-bold text-[50px] animate-text-glow-pop">
            Welcome to ChatVerse
          </h1>
          <span className="text-rose-400 font-semibold text-[30px]">
            Chat Friendly!
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
