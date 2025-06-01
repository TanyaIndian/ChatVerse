import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setUserData } from "../redux/userSlice";

const getOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  console.log(userData)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
};

export default getOtherUsers;
