import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    console.log("Fetching user profile...");
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("User profile fetched successfully:", response.data);
      dispatch(addUser(response.data));
    } catch (err) {
      console.log("Error fetching user:", err.response?.status, err.response?.data);
      if (err.response?.status === 401 || err.response?.status === 400) {
        console.log("Redirecting to login due to auth error");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // Only fetch user if we're not on public pages (landing, login) and no user is logged in
    const publicPages = ["/", "/login"];
    if (!user && !publicPages.includes(location.pathname)) {
      fetchUser();
    }
  }, [user, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Body;
