import maintenance from "../data/maintenance";


function MaintenanceTable() {
  return (
    <section className="mt-8">

      <h2 className="mb-4 text-2xl font-bold">
        Upcoming Maintenance
      </h2>


      <div className="overflow-hidden rounded-lg border bg-white">

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="p-4 text-left">
                Asset
              </th>

              <th className="p-4 text-left">
                Due Date
              </th>

              <th className="p-4 text-left">
                Assigned
              </th>

            </tr>
          </thead>


          <tbody>

            {maintenance.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-none"
              >

                <td className="p-4">
                  {item.asset}
                </td>

                <td className="p-4">
                  {item.dueDate}
                </td>

                <td className="p-4">
                  {item.assignedTo}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default MaintenanceTable;