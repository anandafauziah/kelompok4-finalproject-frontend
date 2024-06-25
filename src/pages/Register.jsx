import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../components/input/InputComponent";
import RegisterImg from "../img/RegisterImg.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { getProvinces, getCities, getPostalCode } from "../api";

function Register() {
  useEffect(() => {
    document.title = "JO'E Cape | Register";
  }, []);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const navigate = useNavigate();
  // Form Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Validation
  const [validation, setValidation] = useState([]);

  // Loading
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Raja Ongkir API
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isPostalCodeLoading, setIsPostalCodeLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch Provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setIsProvincesLoading(true);
        const data = await getProvinces();
        setProvinces(data);
        setIsProvincesLoading(false);
      } catch (error) {
        return;
      }
    };
    fetchProvinces();
  }, []);

  // Fetch Cities
  const fetchCities = async (provinceId) => {
    try {
      setIsCitiesLoading(true);
      const data = await getCities(provinceId);
      setCities(data);
      setIsCitiesLoading(false);
    } catch (error) {
      return;
    }
  };

  // Fetch Postal Code
  const fetchPostalCode = async (cityId) => {
    try {
      setIsPostalCodeLoading(true);
      const data = await getPostalCode(cityId);
      setPostalCode(data);
      setIsPostalCodeLoading(false);
    } catch (error) {
      return;
    }
  };

  const setProvinceName = (id) => {
    const province = provinces.find((province) => province.province_id === id);
    setProvince(province.province);
  };

  const setCityName = (id) => {
    const city = cities.find((cities) => cities.city_id == id);
    setCity(city.type + " " + city.city_name);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("phone", phone);
    formData.append("province", province);
    formData.append("city", city);
    formData.append("postal_code", postalCode);

    setIsRegisterLoading(true);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    await axios
      .post(`${backendURL}/auth/register`, formData)
      .then(() => {
        setIsRegisterLoading(false);
        alert("Successfully registered!");
        navigate("/login");
      })
      .catch((err) => {
        setValidation(err.response.data);
        setIsRegisterLoading(false);
      });
  };

  return (
    <>
      {/* {isRegisterLoading && (
        <div className="absolute top-1/3 left-1/2 text-lg">
          <span className="loading loading-spinner loading-lg text-second"></span>
        </div>
      )} */}
      <div className="flex justify-center w-full bg-first md:py-12 md:px-20 px-5 py-10 min-h-screen font-rubik">
        <div className="md:w-2/3 bg-second md:block hidden">
          <div className="bg-beige-500 flex items-center p-10 h-full">
            <img src={RegisterImg} alt="Fashion Image" />
          </div>
        </div>
        <div className="bg-white md:w-3/4 p-8">
          <img className="md:hidden mx-auto mb-4" src={RegisterImg} alt="Fashion Image" width={150} />
          <a href="/">
            <h2 className="text-3xl font-bold text-[#AF8260] text-center border-b-2 border-[#A0A0A0] mb-3">JO'E CAPE</h2>
          </a>
          <form onSubmit={handleRegister} className="space-y-2">
            <InputComponent id={"name"} label={"Name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
            <p className="my-2 text-red-500 text-xs">{validation.name && validation.name}</p>
            <InputComponent id={"username"} label={"Username"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
            <p className="my-2 text-red-500 text-xs">{validation.username && validation.username}</p>
            <InputComponent id={"email"} label={"Email"} type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="my-2 text-red-500 text-xs">{validation.email && validation.email}</p>
            <div className="flex flex-wrap items-center gap-5 w-full">
              <div className="flex w-auto flex-col gap-y-1">
                <label htmlFor="province">Province</label>
                <select
                  className="border rounded p-2 text-sm"
                  id="province"
                  onChange={(e) => {
                    fetchCities(e.target.value);
                    setProvinceName(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Choose Province
                  </option>
                  {isProvincesLoading ? (
                    <option>Loading...</option>
                  ) : (
                    provinces?.map((province) => {
                      return (
                        <option key={province.province_id} className="text-sm" value={province.province_id}>
                          {province.province}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
              <div className="flex w-auto flex-col gap-y-1">
                <label htmlFor="city">City</label>
                <select
                  className="text-sm border rounded p-2"
                  id="city"
                  onChange={(e) => {
                    fetchPostalCode(e.target.value);
                    setCityName(e.target.value);
                  }}
                >
                  <option selected disabled>
                    Choose City
                  </option>
                  {isCitiesLoading ? (
                    <option>Loading...</option>
                  ) : (
                    cities?.map((city) => {
                      return (
                        <option key={city.city_id} value={city.city_id}>
                          {city.type} {city.city_name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
              <div className="flex w-auto flex-col gap-y-1">
                <label htmlFor="postalCode">Postal Code</label>
                <select className="text-sm border rounded p-2" id="postalCode">
                  {isPostalCodeLoading ? <option>Loading...</option> : <option value={postalCode}>{postalCode}</option>}
                </select>
              </div>
            </div>
            <InputComponent id={"phoneNumber"} label={"Phone Number"} type={"number"} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <p className="my-2 text-red-500 text-xs">{validation.phone && validation.phone}</p>
            <InputComponent id={"password"} label={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="my-2 text-red-500 text-xs">{validation.password && validation.password}</p>
            <InputComponent id={"passwordConfirmation"} label={"Repeat password"} type={"password"} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            <div>
              <button className="w-full bg-first text-white p-2 rounded-md hover:bg-second focus:outline-none focus:bg-second mt-8">{isRegisterLoading ? "Signing up..." : "Sign up"}</button>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Already have an account?
                <Link to="/login" className="text-[#E4C59E] hover:text-orange-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
