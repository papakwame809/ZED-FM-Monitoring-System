import { useNavigate } from "react-router-dom";

import IncidentTable from "../cards/IncidentTable";


function Incidents() {

  const navigate = useNavigate();


  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Incident Management
        </h1>

        <p className="text-gray-600">
          Track, assign and resolve technical issues.
        </p>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-12">


        {/* Report Incident Button */}
        <button
          onClick={() => navigate("/report-incident")}
          className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
        >
          + Report Incident
        </button>


        {/* Search */}
        <input
          type="text"
          placeholder="Search incidents..."
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm outline-none focus:border-violet-600"
        />


        {/* Filter Button */}
        <button
          onClick={() => console.log("filter clicked")}
          className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
        >
          Filter ▼
        </button>


      </div>


      {/* Incident Table */}
      <IncidentTable />

    </div>
  );
}


export default Incidents;