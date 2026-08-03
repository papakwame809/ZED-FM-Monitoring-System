import { useNavigate } from "react-router-dom";
import IncidentForm from "../components/forms/IncidentForm";
import { useState } from "react";
import incidentsData from "../data/incidents";


function ReportIncident() {


  const navigate = useNavigate();


  const [incident, setIncident] = useState({

    title: "",
    asset: "",
    severity: "",
    technician: "",
    status: "Open",
    description: "",
    date: "",

  });





  function handleSubmit(e){

    e.preventDefault();



    const existingIncidents =
      JSON.parse(
        localStorage.getItem("incidents")
      )
      ||
      incidentsData;




    const newIncident = {

      id: `INC-${Date.now()}`,

      ...incident,

      date:
        incident.date ||
        new Date().toLocaleDateString(),

    };





    const updatedIncidents = [

      newIncident,

      ...existingIncidents,

    ];





    localStorage.setItem(

      "incidents",

      JSON.stringify(updatedIncidents)

    );





    navigate("/incidents");


  }






  return (

    <div className="space-y-10">


      <button

        onClick={()=>navigate("/incidents")}

        className="rounded-xl bg-black px-5 py-2 text-white"

      >

        ← Back to Incidents

      </button>





      <div>

        <h1 className="text-3xl font-bold">
          Report Incident
        </h1>


        <p className="text-gray-600">
          Create a new technical issue report
        </p>


      </div>





      <IncidentForm

        incident={incident}

        setIncident={setIncident}

        onSubmit={handleSubmit}

      />



    </div>

  );

}


export default ReportIncident;