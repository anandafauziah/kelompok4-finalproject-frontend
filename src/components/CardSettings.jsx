import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../slices/userSlice";
import { getCities, getPostalCode, getProvinces } from "../api";

function CardSettings() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch Regions
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isPostalCodeLoading, setIsPostalCodeLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalCode, setPostalCode] = useState(user?.address && user?.address.postal_code);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setIsProvinceLoading(true);
        const data = await getProvinces();
        setProvinces(data);
        setIsProvinceLoading(false);
      } catch (error) {
        return error;
      }
    };
    fetchProvinces();
  }, []);

  // Fetch Cities
  const fetchCities = async (provinceId) => {
    try {
      setIsCityLoading(true);
      const data = await getCities(provinceId);
      setCities(data);
      setIsCityLoading(false);
    } catch (error) {
      return error;
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
      return error;
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

  // User Data States
  const [name, setName] = useState(user?.data.name);
  const [username, setUsername] = useState(user?.data.username);
  const [email, setEmail] = useState(user?.data.email);
  const [phone, setPhone] = useState(user?.data.phone);
  const [province, setProvince] = useState(user?.address && user?.address.province);
  const [city, setCity] = useState(user?.address && user?.address.city);
  const [addressLine, setAddressLine] = useState(user?.address && user?.address.address_line);
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateValidation, setUpdateValidation] = useState([]);

  const handleUpdateUser = async () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const data = {
      username: username,
      name: name,
      email: email,
      phone: phone,
      province: province,
      city: city,
      postal_code: postalCode,
      address_line: addressLine,
    };

    setIsLoading(true);

    await axios
      .put(`${backendURL}/user/${user?.data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        dispatch(getUser(token));
        setUpdateSuccess(response.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        setUpdateValidation(err.response.data);
        setIsLoading(false);
      });
  };

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordValidation, setPasswordValidation] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async () => {
    const formData = new FormData();

    formData.append("old_password", oldPassword);
    formData.append("password", newPassword);
    formData.append("password_confirmation", passwordConfirmation);

    setIsLoading(true);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    await axios
      .post(`${backendURL}/user/updatePassword/${user?.data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setPasswordSuccess(response.data.message);
        setIsLoading(false);
        document.getElementById("passwordModal").close();
      })
      .catch((err) => {
        setPasswordValidation(err.response.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      {passwordSuccess && (
        <div role="alert" className="absolute right-12 md:left-12 top-24 md:top-32 md:w-1/2 w-3/4 alert alert-success text-white font-semibold text-xs md:text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{passwordSuccess}</span>
        </div>
      )}

      {updateSuccess && (
        <div role="alert" className="absolute right-12 md:left-12 top-24 md:top-32 md:w-1/2 w-3/4 alert alert-success text-white font-semibold text-xs md:text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{updateSuccess}</span>
        </div>
      )}

      {isLoading && (
        <div className="absolute top-32 left-1/2">
          <span className="loading loading-spinner loading-lg text-first"></span>
        </div>
      )}

      <div className="relative flex flex-col min-w-0 break-words container mx-auto mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-first mb-0 px-6 py-6">
          <h6 className="text-third text-xl font-bold">Account Settings</h6>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-third">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Personal Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3 text-center">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="profile-image">
                    Profile Image
                  </label>
                  <input type="file" accept="image/*" className="hidden" id="profile-image" onChange={handleImageChange} />
                  <div className="flex justify-center mt-2">
                    <label htmlFor="profile-image" className="cursor-pointer">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
                      ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-200 text-blueGray-300">Upload Image</div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user?.data.username || username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p className="my-2 text-red-700 text-xs font-semibold">{updateValidation.username}</p>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user?.data.name || name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user?.data.email || email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="my-2 text-red-700 text-xs font-semibold">{updateValidation.email}</p>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user?.data.phone || phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="my-2 text-red-700 text-xs font-semibold">{updateValidation.phone}</p>
                </div>
              </div>

              <div className="lg:w-1/2 px-4 flex flex-col md:flex-row items-center gap-x-3">
                <div className="mt-3 w-1/2">
                  <button type="button" className="btn btn-primary" onClick={() => document.getElementById("passwordModal").showModal()}>
                    Change Password
                  </button>
                  <dialog id="passwordModal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Change Password</h3>
                      {isLoading && (
                        <div className="mx-auto text-center mt-2">
                          <span className="loading loading-spinner loading-lg text-second"></span>
                        </div>
                      )}
                      <div className="modal-action flex flex-col gap-y-4">
                        <div className="mb-2">
                          <div className="label">
                            <span className="label-text">Old Password</span>
                          </div>
                          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="********" className="input input-bordered w-full max-w-xs" />
                          <p className="my-2 text-red-500 text-xs">{passwordValidation.old_password || passwordValidation.old_password_wrong}</p>
                        </div>
                        <div className="mb-2">
                          <div className="label">
                            <span className="label-text">New Password</span>
                          </div>
                          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="********" className="input input-bordered w-full max-w-xs" />
                          <p className="my-2 text-red-500 text-xs">{passwordValidation.password}</p>
                        </div>
                        <div className="mb-2">
                          <div className="label">
                            <span className="label-text">Password Confirmation</span>
                          </div>
                          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="********" className="input input-bordered w-full max-w-xs" />
                          <p className="my-2 text-red-500 text-xs">{passwordValidation.password_confirmation}</p>
                        </div>
                        <div className="flex items-center gap-x-3 mt-3">
                          <button
                            className="btn btn-success text-white w-1/2"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (confirm("Change password?")) {
                                handleUpdatePassword();
                              }
                            }}
                          >
                            Save
                          </button>
                          <button type="button" className="btn bg-slate-300 w-1/2" onClick={() => document.getElementById("passwordModal").close()}>
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-second" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Address Information</h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Province
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={(user?.address && user?.address.province) || province}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    City
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={(user?.address && user?.address.city) || city}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Postal Code
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={(user?.address && user?.address.postal_code) || postalCode}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Address Detail (RT / RW)
                  </label>
                  <textarea
                    defaultValue={(user?.address && user?.address.address_line) || addressLine}
                    readOnly
                    disabled
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></textarea>
                </div>
              </div>
            </div>

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Edit Address Information</h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Province
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => {
                      fetchCities(e.target.value);
                      setProvinceName(e.target.value);
                    }}
                  >
                    <option selected disabled>
                      Choose Province
                    </option>
                    {isProvinceLoading ? (
                      <option>Loading...</option>
                    ) : (
                      provinces?.map((province, idx) => {
                        return (
                          <option key={idx} className="text-sm" value={province.province_id}>
                            {province.province}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    City
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => {
                      fetchPostalCode(e.target.value);
                      setCityName(e.target.value);
                    }}
                  >
                    <option selected disabled>
                      Choose City
                    </option>
                    {isCityLoading ? (
                      <option>Loading...</option>
                    ) : (
                      cities?.map((city, idx) => {
                        return (
                          <option key={idx} value={city.city_id}>
                            {city.type} {city.city_name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Postal Code
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => {
                      fetchPostalCode(e.target.value);
                      setCityName(e.target.value);
                    }}
                  >
                    {isPostalCodeLoading ? <option>Loading...</option> : <option value={postalCode}>{postalCode}</option>}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Address Detail (RT / RW)
                  </label>
                  <textarea
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="btn btn-success text-white w-1/3"
                onClick={(e) => {
                  e.preventDefault();
                  if (confirm("Update data?")) {
                    handleUpdateUser();
                  }
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CardSettings;
