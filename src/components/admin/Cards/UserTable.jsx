import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function UserTable() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Get Users State
  const { users, loading } = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const customers = users.filter((item) => !item.data.is_admin);
    setCustomers(customers);
  }, [users]);

  // Search User
  const [searchKey, setSearchKey] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    if (searchKey && customers) {
      const items = customers.filter((item) => item.data.name.toLowerCase().includes(searchKey.toLowerCase()) || item.data.username.toLowerCase().includes(searchKey.toLowerCase()));
      setSearchUsers(items);
    }
  }, [customers, searchKey]);

  return (
    <>
      {loading && (
        <div className="fixed top-1/3 left-1/2 z-[9999]">
          <span className="loading loading-spinner loading-lg text-first"></span>
        </div>
      )}
      <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap gap-5 items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg"}>Users</h3>
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-sm input-bordered w-full md:w-auto"
                onChange={(e) => {
                  e.preventDefault();
                  setSearchKey(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>User</th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>Username</th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>Phone</th>
                <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>Address</th>
              </tr>
            </thead>
            <tbody>
              {searchUsers && searchKey ? (
                searchUsers.map((item) => {
                  return (
                    <tr key={item.data.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={`${(!loading && item.data.avatar) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} alt={item.data.name} />
                            </div>
                          </div>
                          <div>
                            {item.data.name}
                            <div className="text-xs">
                              <span className="opacity-75">{item.data.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.data.username}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.data.phone}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.address ? <span>{(item.address.city, item.address.province, item.address.postal_code)}</span> : ""}</td>
                      </td>
                    </tr>
                  );
                })
              ) : customers ? (
                customers.map((item) => {
                  return (
                    <tr key={item.data.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={`${(!loading && item.data.avatar) || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} alt={item.data.name} />
                            </div>
                          </div>
                          <div>
                            {item.data.name}
                            <div className="text-xs">
                              <span className="opacity-75">{item.data.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.data.username}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.data.phone}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.address && `${item.address.city}, ${item.address.province}, ${item.address.postal_code}`}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10">
                    Empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
