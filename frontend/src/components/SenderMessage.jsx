import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.webp";
import { useSelector } from "react-redux";

const SenderMessage = ({ image, message }) => {
  let scroll = useRef();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);
  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex items-start gap-2.5">
      <div
        ref={scroll}
        className="w-fit max-w-[500px] px-5 py-2.5 bg-gradient-to-tr from-rose-400 to-orange-300 text-white text-lg rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-rose-300 shadow-lg gap-2 flex flex-col"
      >
        {image && (
          <img
            src={image}
            alt=""
            className="w-[150px] rounded-lg"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-rose-400 shadow-lg">
        <img
          src={userData.image || dp}
          alt=""
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SenderMessage;
