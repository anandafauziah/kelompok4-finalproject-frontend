import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CategoryTable from "../../components/admin/Cards/CategoryTable";

export default function Category() {
  useEffect(() => {
    document.title = "JO'E Cape | Category";
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <CategoryTable />
        </div>
      </div>
    </>
  );
}
