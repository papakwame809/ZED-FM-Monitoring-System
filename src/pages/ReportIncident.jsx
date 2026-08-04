import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IncidentForm from "../components/forms/IncidentForm";

import incidentsData from "../data/incidents";


function ReportIncident() {


  const navigate = useNavigate();

  const { id } = useParams();



  const emptyIncident = {

    title: "",
    asset: "",
    severity: "",
    technician: "",
    status: "Open",
    description: "",
    date: "",

  };



  const [incident, setIncident] = useState(emptyIncident);





  const isEditing = Boolean(id);







  useEffect(() => {


    if (!isEditing) return;



    const storedIncidents =

      JSON.parse(
        localStorage.getItem("incidents")
      )
      ||
      incidentsData;





    const selectedIncident =

      storedIncidents.find(
        (item) =>
          item.id === id
      );





    if(selectedIncident){

      setIncident(selectedIncident);

    }



  }, [id, isEditing]);









  function handleSubmit(e){


    e.preventDefault();



    const storedIncidents =

      JSON.parse(
        localStorage.getItem("incidents")
      )
      ||
      incidentsData;





    let updatedIncidents;





    if(isEditing){


      updatedIncidents =

        storedIncidents.map(
          (item)=>

            item.id === id

            ?

            {
              ...item,
              ...incident,
            }

            :

            item

        );


    }

    else{


      const newIncident = {


        id:
          `INC-${Date.now()}`,

        ...incident,


        date:

          incident.date ||

          new Date()
          .toLocaleDateString(),

      };




      updatedIncidents = [

        newIncident,

        ...storedIncidents,

      ];


    }







    localStorage.setItem(

      "incidents",

      JSON.stringify(updatedIncidents)

    );




    navigate("/incidents");


  }









  return (

    <div className="space-y-10">


      <button

        onClick={() => navigate("/incidents")}

        className="
        rounded-xl
        bg-black
        px-5
        py-2
        text-white
        transition
        hover:bg-violet-600
        "

      >

        ← Back to Incidents

      </button>







      <div>


        <h1 className="text-3xl font-bold">

          {
            isEditing
            ?
            "Edit Incident"
            :
            "Report Incident"
          }

        </h1>




        <p className="text-gray-600">

          {
            isEditing
            ?
            "Update existing incident details."
            :
            "Create a new technical issue report."
          }

        </p>


      </div>







      <IncidentForm

        incident={incident}

        setIncident={setIncident}

        onSubmit={handleSubmit}

        isEditing={isEditing}

      />



    </div>

  );

}


export default ReportIncident;