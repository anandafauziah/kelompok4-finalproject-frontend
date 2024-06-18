import { useSelector, useDispatch } from "react-redux";
import ProductTable from "../../components/admin/Cards/ProductTable";
import { fetchProduct } from "../../slices/productSlice";
import { useEffect } from "react";

export default function Product() {
  document.title = "JO'E Cape | Product";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <ProductTable />
        </div>
      </div>
    </>
  );
}
