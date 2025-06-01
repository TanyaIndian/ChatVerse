import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(userData.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const image = useRef();
  const [saving, setSaving] = useState(false);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center relative">
      {/* Back Button */}
      <div
        className="absolute top-5 left-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="w-[40px] h-[40px] text-rose-400 hover:text-rose-500 transition duration-200" />
      </div>

      {/* Container */}
      <div className="w-full max-w-[500px] h-[680px] bg-white rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in">
        {/* Header */}
        <div className="w-full h-[180px] bg-gradient-to-tr from-rose-400 to-orange-300 rounded-b-[30%] shadow-md flex items-center justify-center animate-slide-down">
          <h1 className="text-white font-extrabold text-2xl tracking-wide drop-shadow">
            Setup your <span className="animate-text-glow-pop">Profile</span>
          </h1>
        </div>

        {/* Profile Image Picker */}
        <div
          className="mt-[-70px] bg-white rounded-full border-4 border-rose-300 shadow-lg relative cursor-pointer"
          onClick={() => image.current.click()}
        >
          <div className="w-[140px] h-[140px] rounded-full overflow-hidden flex justify-center items-center">
            <img
              src={frontendImage}
              alt="profile"
              className="h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-[35px] h-[35px] rounded-full bg-rose-300 flex justify-center items-center shadow-md">
            <IoCameraOutline className="text-white w-[20px] h-[20px]" />
          </div>
        </div>

        {/* Form */}
        <form
          className="w-full px-6 mt-8 flex flex-col gap-6 items-center animate-fade-up"
          onSubmit={handleProfile}
        >
          <input
            type="file"
            accept="image/*"
            ref={image}
            hidden
            onChange={handleImage}
          />

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-[50px] border border-rose-300 px-5 py-2 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-800 text-lg transition duration-200"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <input
            type="text"
            readOnly
            className="w-full h-[50px] border border-gray-300 px-5 py-2 rounded-xl shadow-inner text-gray-400 text-lg bg-gray-50"
            value={userData?.userName}
          />

          <input
            type="email"
            readOnly
            className="w-full h-[50px] border border-gray-300 px-5 py-2 rounded-xl shadow-inner text-gray-400 text-lg bg-gray-50"
            value={userData?.email}
          />

          <button
            className="px-6 py-3 bg-rose-400 text-white rounded-full shadow-md hover:bg-rose-500 transition duration-300 w-[200px] mt-2 font-semibold disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
