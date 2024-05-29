import React from "react";

// components

import CardSettings from "../../components/admin/Cards/CardSettings";

export default function Profile() {
  document.title = "JO'E Cape | Admin Profile";
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
