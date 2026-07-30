import incidents from "../data/incidents";


function IncidentTable() {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Incident Table
      </h2>


      {/* Table Header */}
      <div className="grid grid-cols-[120px_2fr_1fr_1fr_1fr_1fr_120px] gap-4 border-b border-gray-200 pb-4 font-semibold">

        <span>ID</span>
        <span>Incident</span>
        <span>Category</span>
        <span>Severity</span>
        <span>Assigned To</span>
        <span>Status</span>
        <span>Date</span>

      </div>


      {/* Table Rows */}
      <div className="divide-y divide-gray-100">

        {incidents.map((item) => (

          <div
            key={item.id}
            className="grid grid-cols-[120px_2fr_1fr_1fr_1fr_1fr_120px] gap-4 py-4 text-sm"
          >

            <span>{item.id}</span>

            <span className="font-medium">
              {item.incident}
            </span>

            <span>
              {item.category}
            </span>

            <span>
              {item.severity}
            </span>

            <span>
              {item.assignedTo}
            </span>

            <span>
              {item.status}
            </span>

            <span>
              {item.date}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}


export default IncidentTable;