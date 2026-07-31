import maintenance from "../data/maintenance";

function MaintenanceTable() {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="border-b bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">Asset</th>
            <th className="px-6 py-4 text-left">Maintenance Type</th>
            <th className="px-6 py-4 text-left">Technician</th>
            <th className="px-6 py-4 text-left">Due Date</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {maintenance.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="px-6 py-4">{item.asset}</td>

              <td className="px-6 py-4">{item.type}</td>

              <td className="px-6 py-4">{item.technician}</td>

              <td className="px-6 py-4">{item.dueDate}</td>

              <td className="px-6 py-4">{item.priority}</td>

              <td className="px-6 py-4">{item.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MaintenanceTable;