import ProductTable from "../../components/admin/Cards/ProductTable";

export default function Product() {
  document.title = "JO'E Cape | Product";
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
