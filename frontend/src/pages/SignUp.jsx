import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [flyPlane, setFlyPlane] = useState(true);
  const planeRef = useRef();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/profile");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFlyPlane(false);
      setTimeout(() => setFlyPlane(true), 200); // Reset trigger delay
    }, 6000); // Repeat every 6 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-100 to-rose-100">
      {/* 3D Plane Background */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Scene planeRef={planeRef} flyPlane={flyPlane} />
        </Canvas>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-3xl shadow-2xl p-5 flex flex-col gap-8 animate-fade-in z-10">
        {/* Header */}
        <div className="w-full h-[200px] bg-gradient-to-tr from-rose-400 to-orange-300 rounded-b-[30%] shadow-md flex items-center justify-center animate-slide-down">
          <h1 className="text-white font-extrabold text-3xl tracking-wide drop-shadow-lg">
            Welcome to{" "}
            <span className="inline-block animate-text-glow-pop font-extrabold">
              ChatVerse
            </span>
          </h1>
        </div>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-6 items-center animate-fade-up"
          onSubmit={handleSignUp}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-[90%] h-[50px] border border-rose-400 px-5 py-2 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 text-lg transition duration-200"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-[90%] h-[50px] border border-rose-400 px-5 py-2 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-400 text-gray-800 text-lg transition duration-200"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="w-[90%] h-[50px] border border-rose-400 rounded-xl shadow-inner relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full px-5 py-2 rounded-xl text-gray-800 text-lg focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="absolute top-2 right-5 text-rose-500 font-medium cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-red-500 font-medium">{"*" + err}</p>}

          <button
            className="px-6 py-3 bg-rose-400 text-white rounded-full shadow-md hover:bg-rose-500 transition duration-300 w-[200px] mt-4 font-semibold disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p
            className="cursor-pointer text-gray-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-rose-500 font-semibold">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
