import PaymentTable from "../../components/admin/Cards/PaymentTable";

export default function Payment() {
  document.title = "JO'E Cape | Payment";
  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          <PaymentTable />
        </div>
      </div>
    </>
  );
}
