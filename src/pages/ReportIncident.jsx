import { useNavigate } from "react-router-dom";

import IncidentForm from "../components/forms/IncidentForm";


function ReportIncident() {

  const navigate = useNavigate();


  return (
    <div className="space-y-10">


      {/* Back Button */}
      <button
        onClick={() => navigate("/incidents")}
        className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
      >
        ← Back to Incidents
      </button>


      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Report Incident
        </h1>

        <p className="text-gray-600">
          Create a new technical issue report
        </p>
      </div>


      {/* Form */}
      <IncidentForm />


    </div>
  );
}


export default ReportIncident;