import React, { useEffect } from "react";

import CardSettings from "../../components/admin/Cards/CardSettings";
import { fetchProvince } from "../../slices/provinceSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  useEffect(() => {
    document.title = "JO'E Cape | Product";
  }, []);

  // Fetch Provinces if empty
  const dispatch = useDispatch();

  const { provinces } = useSelector((state) => state.province);

  useEffect(() => {
    if (!provinces) {
      dispatch(fetchProvince());
    }
  }, []);

  return (
    <>
      <div className="flex justify-center flex-wrap mt-10">
        <div className="w-full px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}
