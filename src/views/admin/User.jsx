import UserTable from "../../components/admin/Cards/UserTable";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Test",
    selector: (row) => row.test,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    test: "test",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    test: "test",
  },
];

export default function User() {
  document.title = "JO'E Cape | User";
  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full mb-12 px-4">
          {/* <UserTable /> */}
          <DataTable title="User List" columns={columns} data={data} pagination />
        </div>
      </div>
    </>
  );
}
