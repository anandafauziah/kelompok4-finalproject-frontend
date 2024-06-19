import React, { useState, useEffect } from "react";
import icon from "../img/icon.png";
import dollarIcon from "../img/dollarIcon.png";
import userIcon from "../img/userIcon.png";
import cvvIcon from "../img/cvvIcon.png";
import dateIcon from "../img/dateIcon.png";
import useLogin from "../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getPostalCode } from "../api";
import { getAdmin, getUser } from "../slices/userSlice";
import axios from "axios";
import { fetchProvince } from "../slices/provinceSlice";
import { createOrder } from "../slices/orderSlice";

function UserPayment() {
  useEffect(() => {
    document.title = "JO'E Cape | Payment";
  }, []);

  useLogin();

  const { token } = useSelector((state) => state.auth);
  const { carts, totalPrice } = useSelector((state) => state.cart);
  const { user, admin } = useSelector((state) => state.user);
  const { provinces, loading } = useSelector((state) => state.province);

  const dispatch = useDispatch();

  // Fetch Admin Data
  useEffect(() => {
    dispatch(getAdmin(token));
  }, [token]);

  // Admin States
  const [adminProvince, setAdminProvince] = useState(admin?.address && admin?.address.province);
  const [adminCity, setAdminCity] = useState(admin?.address && admin?.address.city);

  // Fetch Provinces
  useEffect(() => {
    if (!provinces) {
      dispatch(fetchProvince());
    }
  }, []);

  // Update Address
  const [isLoading, setIsLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isPostalCodeLoading, setIsPostalCodeLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState(user?.address && user?.address.province);
  const [city, setCity] = useState(user?.address && user?.address.city);
  const [postalCode, setPostalCode] = useState(user?.address && user?.address.postal_code);

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
    const city = cities.find((cities) => cities.city_id === id);
    setCity(city.type + " " + city.city_name);
  };

  const handleUpdateAddress = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const formData = new FormData();

    formData.append("province", province);
    formData.append("city", city);
    formData.append("postal_code", postalCode);

    setIsLoading(true);

    axios
      .post(`${backendURL}/user/updateAddress/${user?.data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(getUser(token));
        alert(response.data.message);
        document.getElementById("addressModal").close();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // Order States
  const [orderItems, setOrderItems] = useState([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [couriers] = useState([
    {
      name: "JNE",
      value: "jne",
    },
    {
      name: "POS Indonesia",
      value: "pos",
    },
    {
      name: "TIKI",
      value: "tiki",
    },
  ]);
  const [total, setTotal] = useState(totalPrice);
  const [shippingFee, setShippingFee] = useState(0);
  const [weight, setWeight] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [regionIdLoading, setIsRegionLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [isServiceLoading, setIsServiceLoading] = useState(false);

  // Set Order Items
  useEffect(() => {
    if (carts?.length > 0) {
      const items = carts.map((item) => ({
        productId: item.cart_items[0].product.id,
        quantity: item.cart_items[0].quantity,
      }));
      setOrderItems(items);
    }
  }, [carts]);

  // Set Weight
  useEffect(() => {
    if (carts?.length > 0) {
      const weight = carts.map((item) => item.cart_items[0].product.weight * item.cart_items[0].quantity).reduce((acc, item) => acc + item);
      setWeight(weight);
    }
  }, [carts]);

  // Find City ID
  useEffect(() => {
    setIsServiceLoading(true);
    setIsRegionLoading(true);
    if (provinces?.length > 0) {
      // Origin ID
      const prov = provinces?.find((item) => item.province === adminProvince);
      getCities(prov?.province_id).then((result) => {
        const cit = result.find((item) => item.type === adminCity.split(" ")[0] && item.city_name === adminCity.split(" ").slice(1).join(" "));
        setOrigin(cit.city_id);
      });

      // Destination ID
      const userProvince = provinces?.find((item) => item.province === province);
      getCities(userProvince?.province_id).then((result) => {
        const userCity = result.find((item) => item.type === city.split(" ")[0] && item.city_name === city.split(" ").slice(1).join(" "));
        setDestination(userCity.city_id);
        setIsRegionLoading(false);
        setIsLoading(false);
      });
    }
  }, [provinces]);

  const handleGetServices = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("courier", e.target.value);
    formData.append("weight", weight);
    formData.append("destination", destination);
    formData.append("origin", origin);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    setIsServiceLoading(true);

    axios
      .post(`${backendURL}/getServices`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data[0].costs;
        setServices(data);
        setIsServiceLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setIsPaymentLoading(true);
    await dispatch(createOrder({ items: orderItems, user, amount: total }, token))
      .then((res) => {
        setIsPaymentLoading(false);
        window.location.href = res.payload.snapUrl;
      })
      .catch((err) => {
        console.log(err);
        setIsPaymentLoading(false);
      });
  };

  const indoCurrency = (price) => {
    return price?.toLocaleString("id-ID", { styles: "currency", currency: "IDR" });
  };

  return (
    <>
      <div className="min-h-screen bg-second flex items-center p-5">
        {isLoading && (
          <div className="fixed top-24 left-1/2 z-[99999]">
            <span className="loading loading-spinner loading-lg text-first"></span>
          </div>
        )}
        {isPaymentLoading && (
          <div className="fixed top-24 left-1/2 z-[99999]">
            <span className="loading loading-spinner loading-lg text-first"></span>
          </div>
        )}
        <div className="md:p-10 mx-auto bg-white shadow-md rounded-md p-4">
          <h1 className="text-4xl font-bold text-[#322C2B] mb-3 md:mb-0">Checkout</h1>
          <div className="flex-col md:flex-row items-center gap-3 flex md:space-x-8">
            {/* Bagian Kiri: Checkout Form */}
            <div className="md:flex-1 mt-0 md:space-y-8">
              <div className="p-2 block border-2 border-[#AF8260] rounded">
                <div className="flex p-2 gap-x-3 tracking-tight">
                  <span className="font-semibold text-gray-400 text-md">Contact</span>
                  <span className="font-medium text-md mx-auto">{user?.data.name}</span>
                </div>
                <div className="flex border-b border-[#AF8260]"></div>
                <div className="flex justify-between p-2 gap-x-3 tracking-tight">
                  <span className="font-semibold text-gray-400 text-md">Ship to</span>
                  <span className="font-medium text-md text-[#322C2B]">
                    {province || ""}, {city || ""}, {postalCode || ""}
                  </span>
                  <button className="font-semibold text-[#AF8260] hover:text-[#322C2B]" onClick={() => document.getElementById("addressModal").showModal()}>
                    Edit
                  </button>
                </div>
              </div>

              {/* Update Address Modal */}
              <dialog id="addressModal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Change Address</h3>
                  {isLoading && (
                    <div className="mx-auto text-center mt-2">
                      <span className="loading loading-spinner loading-lg text-second"></span>
                    </div>
                  )}
                  <div className="modal-action flex flex-col gap-y-4">
                    <div className="mb-2">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Province</label>
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
                        {loading ? (
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
                    <div className="mb-2">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Province</label>
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
                    <div className="mb-2">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Province</label>
                      <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        {isPostalCodeLoading ? <option>Loading...</option> : <option value={postalCode}>{postalCode}</option>}
                      </select>
                    </div>
                    <div className="flex items-center gap-x-3 mt-3">
                      <button
                        className="btn btn-success text-white w-1/2"
                        type="button"
                        disabled={isPostalCodeLoading || loading || isCityLoading ? true : false}
                        onClick={(e) => {
                          e.preventDefault();
                          if (confirm("Save address?")) {
                            handleUpdateAddress();
                          }
                        }}
                      >
                        Save
                      </button>
                      <button type="button" className="btn bg-slate-300 w-1/2" onClick={() => document.getElementById("addressModal").close()}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>

              <div className="py-2 flex gap-2">
                <select
                  className="select bg-[#AF8260] w-full py-2 rounded-md text-white font-medium max-w-xs text-base focus:outline-none"
                  disabled={regionIdLoading ? true : false || isLoading ? true : false}
                  onChange={handleGetServices}
                  required
                >
                  <option disabled selected>
                    Choose Your Shipping
                  </option>
                  {couriers.map((item, i) => {
                    return (
                      <option key={i} value={item.value}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="select bg-[#AF8260] w-full py-2 rounded-md text-white font-medium max-w-xs text-base focus:outline-none"
                  onChange={(e) => {
                    setShippingFee(e.target.value);
                    setTotal(parseFloat(e.target.value) + totalPrice);
                  }}
                  disabled={isServiceLoading ? true : false}
                  required
                >
                  <option disabled selected>
                    Choose Your Services
                  </option>
                  {services?.map((item, i) => {
                    return (
                      <option key={i} value={item.cost[0].value}>
                        {item.service} ({item.description}) - Rp{indoCurrency(item.cost[0].value)},00 - {item.cost[0].etd} hari
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <div className="mb-2 space-y-4">
            <h2 className="text-xl font-bold mb-0 text-[#322C2B]">Payment Methods</h2>
            <div className="flex gap-8 mb-4">
              <div>
                <button className="w-full outline outline-2 px-4 py-2 h-14 rounded text-center outline-[#AF8260] hover:bg-[#322C2B] hover:text-white hover:outline-none focus:outline-none focus:bg-[#322C2B] focus:text-white flex items-center justify-center text-sm font-semibold">
                  <img src={icon} alt="MasterCard" className="h-[20px] me-2" />
                  <span className="tracking-tight">CREDIT CARD</span>
                </button>
              </div>
              <div>
                <button className="w-full outline outline-2 px-4 py-2 h-14 rounded text-center outline-[#AF8260] hover:bg-[#322C2B] hover:text-white hover:outline-none focus:outline-none focus:bg-[#322C2B] focus:text-white flex items-center justify-center text-sm font-semibold">
                  <img src={dollarIcon} alt="MasterCard" className="h-[20px] me-2" />
                  <span className="tracking-tight">OTHER PAYMENT</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input type="text" placeholder="Card Number" className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                <div className="absolute top-2 right-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="h-6" />
                </div>
              </div>
              <div className="relative">
                <input type="text" placeholder="Holder Name" className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                <div className="absolute top-2 right-3">
                  <img src={userIcon} alt="User Icon" className="h-6" />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="relative w-1/2">
                  <input type="date" placeholder="Expiration (MM/YY)" className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={dateIcon} alt="Date Icon" className="h-6" />
                  </div>
                </div>

                <div className="relative w-1/2">
                  <input type="text" placeholder="CVV" className="input w-full h-10 rounded-none border border-[#BBB9B8] py-2 px-3 focus:outline-none focus:ring-1 focus:ring-slate-400" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img src={cvvIcon} alt="CVV Icon" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            </div>

            {/* Bagian Kanan: Order Details */}
            <div className="sm:max-w-xs w-full sm:pt-16">
              <div className="bg-[#AF8260] shadow-md rounded-md p-4 sm:space-y-6 ">
                <h2 className="text-xl font-bold text-white mb-2">Order Details</h2>

                {carts.length > 0 &&
                  carts.map((item, idx) => {
                    return (
                      <div className="flex items-center justify-between" key={idx}>
                        <div className="flex items-center">
                          <img src={item.cart_items[0].product.image} alt={item.cart_items[0].product.title} className="w-16 h-16 mr-4" />
                          <div>
                            <p className="font-medium text-[#322C2B] text-sm md:text-md">{item.cart_items[0].product.title}</p>
                            <p className="text-xs md:text-sm text-white">Size {item.cart_items[0].product.size}</p>
                          </div>
                        </div>
                        <p className="font-medium text-white text-xs w-1/3">
                          {item.cart_items[0].quantity}x Rp{indoCurrency(item.cart_items[0].product.price)}
                        </p>
                      </div>
                    );
                  })}
                <div className="border-t py-4 mt-2">
                  {/* <div className="flex">
                <input type="text" placeholder="Coupon Code" className="input h-8 text-sm focus:ring-2 focus:ring-[#322C2B] focus:outline-none focus:border-none rounded-none w-full py-1 px-3 mb-4 " />
                <button className="min-w-20 ms-2 h-8 bg-[#322C2B] rounded focus:bg-[#322C2B] hover:bg-[#4d4746] focus:text-white">
                  <span className="text-white p-1 text-sm">Add code</span>
                </button>
              </div> */}
                  <div className="flex justify-between mb-2 text-slate-200">
                    <p className="font-semibold">Subtotal</p>
                    <p className="text-md font-semibold">Rp{indoCurrency(totalPrice)}</p>
                  </div>
                  <div className="flex justify-between mb-2 text-slate-200">
                    <p className="font-semibold">Shipping</p>
                    <p className="text-md font-semibold">Rp{indoCurrency(parseFloat(shippingFee))}</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p className="text-[#322C2B] font-bold">Total</p>
                    <p className="text-md font-bold text-[#322C2B]">Rp{indoCurrency(total)},00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 mt-5 md:mt-0 items-center">
            <a href="/cart" className="text-[#AF8260] hover:text-[#322C2B] hover:underline focus:underline focus:text-[#322C2B]">
              <span className="text-lg font-normal">Back to Cart</span>
            </a>
            <button className="bg-[#322C2B] text-white py-2 px-6 rounded focus:bg-[#322C2B] hover:bg-[#4d4746] focus:text-white" disabled={regionIdLoading && isServiceLoading ? true : false} onClick={handleCreateOrder}>
              <span className="text-lg font-semibold">Pay Now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPayment;
