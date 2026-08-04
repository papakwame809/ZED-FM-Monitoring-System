import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import incidentsData from "../data/incidents";


function IncidentDetails() {

  const { id } = useParams();

  const incidents =

    JSON.parse(
      localStorage.getItem("incidents")
    )
    ||
    incidentsData;

  const incident = incidents.find(

    (item) =>

      String(item.id) === String(id)

  );

  if (!incident) {

    return (

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Incident not found
        </h1>

        <Link

          to="/incidents"

          className="text-violet-600"

        >
          ← Back to incidents
        </Link>
      </div>

    );
  }

  return (

    <div className="space-y-10">

      <Link

        to="/incidents"

        className="
        flex
        items-center
        gap-2
        text-violet-600
        "

      >
        <ArrowLeft size={18}/>

        Back to incidents

      </Link>

      <div>

        <h1 className="text-3xl font-bold">
          {incident.title}
        </h1>


        <p className="text-gray-600">
          Incident details
        </p>

      </div>

      <div className="rounded-xl bg-white p-8 shadow">

        <div className="grid grid-cols-2 gap-6">

          <Info
            label="ID"
            value={incident.id}
          />

          <Info
            label="Asset"
            value={incident.asset}
          />

          <Info
            label="Severity"
            value={incident.severity}
          />

          <Info
            label="Technician"
            value={incident.technician}
          />

          <Info
            label="Status"
            value={incident.status}
          />

          <Info
            label="Date"
            value={incident.date}
          />

        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            Description
          </p>

          <p className="mt-2 text-lg">
            {incident.description}
          </p>


        </div>

      </div>

    </div>

  );

}
function Info({label,value}){
  return (

    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>

    </div>
  );
}

export default IncidentDetails;