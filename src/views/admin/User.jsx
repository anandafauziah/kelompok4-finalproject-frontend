import { useEffect } from "react";
import UserTable from "../../components/admin/Cards/UserTable";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../slices/userSlice";

export default function User() {
  useEffect(() => {
    document.title = "JO'E Cape | User";
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <UserTable />
        </div>
      </div>
    </>
  );
}
