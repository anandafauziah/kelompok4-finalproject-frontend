import Header from "../components/Header";
import CardSettings from "../components/CardSettings";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";
import { getUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvince } from "../slices/provinceSlice";

const UserProfile = () => {
  useEffect(() => {
    document.title = "JO'E Cape | Profile";
  }, []);

  useLogin();

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"Profile"} />
      <div className="flex justify-center flex-wrap mt-10 grow">
        <div className="w-full px-4">
          <CardSettings />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UserProfile;
