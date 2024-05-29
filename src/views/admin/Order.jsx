import OrderTable from "../../components/admin/Cards/OrderTable";

export default function Order() {
  document.title = "JO'E Cape | Order";
  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <OrderTable />
        </div>
      </div>
    </>
  );
}
