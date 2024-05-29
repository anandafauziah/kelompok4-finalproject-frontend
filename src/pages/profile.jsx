import Header from "../components/Header";
import CardSettings from "../components/CardSettings";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice";
import { getUser } from "../api";

const UserProfile = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Profile";
  }, []);

  // Fetch User Data
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(token);
        dispatch(setUser(data));
      } catch (error) {
        return;
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className="flex flex-col">
      <Header title={"Profile"} />
      <div className="flex justify-center flex-wrap mt-10">
        <div className="w-full px-4">
          <CardSettings />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UserProfile;
