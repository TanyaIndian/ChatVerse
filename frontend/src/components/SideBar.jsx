import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.webp";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from "../main";
import axios from "axios";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handlesearch();
    }
  }, [input]);
  return (
    <div
      className={`lg:w-[30%] w-full h-full overflow-hidden lg:block relative ${
        !selectedUser ? "block" : "hidden"
      } bg-gradient-to-b from-rose-100 via-rose-200 to-orange-100`}
    >
      <div
        className="w-[60px] h-[60px] mt-2.5 rounded-full flex justify-center items-center bg-gradient-to-tr from-rose-400 to-orange-400 shadow-lg text-white cursor-pointer fixed bottom-5 left-2.5 z-[200]"
        onClick={handleLogOut}
      >
        <BiLogOutCircle className="w-[25px] h-[25px]" />
      </div>

      {input.length > 0 && (
        <div className="flex absolute top-[250px] bg-white w-full h-[500px] overflow-y-auto flex-col gap-2.5 pt-5 z-[150] shadow-lg">
          {searchData?.map((user) => (
            <div
              key={user._id}
              className="w-[95%] h-[70px] flex items-center gap-5 px-2.5 hover:bg-rose-300 border-b-2 border-rose-400 cursor-pointer"
              onClick={() => {
                dispatch(setSelectedUser(user));
                setInput("");
                setSearch(false);
              }}
            >
              <div className="relative rounded-full bg-white flex justify-center items-center">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                  <img
                    src={user.image || dp}
                    alt=""
                    className="h-full object-cover"
                  />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-3 h-3 rounded-full absolute bottom-1.5 right-[-2px] bg-green-500 shadow-md shadow-green-400"></span>
                )}
              </div>
              <h1 className="text-rose-900 font-semibold text-lg">
                {user.name || user.userName}
              </h1>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-[300px] bg-gradient-to-b from-rose-400 via-orange-400 to-orange-300 rounded-b-[30%] shadow-lg flex flex-col justify-center px-5">
        <h1 className="text-white font-bold text-2xl">chatverse</h1>
        <div className="w-full flex justify-between items-center mt-2.5">
          <h1 className="text-rose-900 font-bold text-2xl">
            Hii, {userData.name || "user"}
          </h1>
          <div
            className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-lg shadow-rose-400"
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData.image || dp}
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-5 overflow-y-auto py-4">
          {!search && (
            <div
              className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-white shadow-lg shadow-rose-400 cursor-pointer animate-pulse"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className="w-6 h-6 text-rose-600" />
            </div>
          )}

          {search && (
            <form className="w-full h-[60px] bg-white shadow-lg shadow-rose-400 flex items-center gap-2.5 mt-2.5 rounded-full overflow-hidden px-5 relative">
              <IoIosSearch className="w-6 h-6 text-rose-600" />
              <input
                type="text"
                placeholder="search users..."
                className="w-full h-full p-2.5 text-lg outline-none border-0"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-6 h-6 text-rose-600 cursor-pointer"
                onClick={() => setSearch(false)}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    key={user._id}
                    className="relative rounded-full shadow-lg shadow-rose-400 bg-white flex justify-center items-center mt-2.5 cursor-pointer"
                    onClick={() => dispatch(setSelectedUser(user))}
                  >
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                      <img
                        src={user.image || dp}
                        alt=""
                        className="h-full object-cover"
                      />
                    </div>
                    <span className="w-3 h-3 rounded-full absolute bottom-1.5 right-[-2px] bg-green-500 shadow-md shadow-green-400"></span>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="w-full h-[50%] overflow-auto flex flex-col gap-5 items-center mt-5">
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            className="w-[95%] h-[60px] flex items-center gap-5 shadow-lg shadow-rose-400 bg-white rounded-full hover:bg-rose-300 cursor-pointer"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative rounded-full shadow-lg shadow-rose-400 bg-white flex justify-center items-center mt-2.5">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center">
                <img
                  src={user.image || dp}
                  alt=""
                  className="h-full object-cover"
                />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="w-3 h-3 rounded-full absolute bottom-1.5 right-[-2px] bg-green-500 shadow-md shadow-green-400"></span>
              )}
            </div>
            <h1 className="text-rose-900 font-semibold text-lg">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
