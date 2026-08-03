import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IncidentTable from "../cards/IncidentTable";

import incidentsData from "../data/incidents";

import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";


function Incidents() {


  const navigate = useNavigate();


  const { user } = useAuth();


  const isAdmin = hasRole(user, ROLES.ADMIN);

  const isTechnician = hasRole(user, ROLES.TECHNICIAN);


  const canManageIncidents = isAdmin || isTechnician;





  const [incidents, setIncidents] = useState(

    JSON.parse(
      localStorage.getItem("incidents")
    )
    ||
    incidentsData

  );





  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");









  function handleDeleteIncident(id) {


    const confirmed = window.confirm(
      "Are you sure you want to delete this incident?"
    );


    if (!confirmed) return;



    const updatedIncidents = incidents.filter(

      incident => incident.id !== id

    );



    setIncidents(updatedIncidents);



    localStorage.setItem(

      "incidents",

      JSON.stringify(updatedIncidents)

    );


  }










  function handleEditIncident(incident) {


    console.log(
      "Editing incident:",
      incident
    );


  }









  const filteredIncidents = incidents.filter((incident)=>{


    const searchMatch =

      incident.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

      ||

      incident.asset
      .toLowerCase()
      .includes(searchTerm.toLowerCase());





    const statusMatch =

      filterStatus === "All"

      ||

      incident.status === filterStatus;




    return searchMatch && statusMatch;


  });









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

      <div className="flex flex-wrap items-center gap-6">





        {
          canManageIncidents && (

            <button

              onClick={() => navigate("/report-incident")}

              className="
              rounded-xl
              bg-black
              px-6
              py-3
              text-white
              transition
              hover:bg-violet-600
              "

            >

              + Report Incident

            </button>

          )

        }







        <input

          type="text"

          placeholder="Search incidents..."

          value={searchTerm}

          onChange={
            (e)=>setSearchTerm(e.target.value)
          }

          className="
          rounded-xl
          border
          px-6
          py-3
          "

        />









        <select

          value={filterStatus}

          onChange={
            (e)=>setFilterStatus(e.target.value)
          }

          className="
          rounded-xl
          border
          px-6
          py-3
          "

        >

          <option value="All">
            All Status
          </option>


          <option value="Open">
            Open
          </option>


          <option value="In Progress">
            In Progress
          </option>


          <option value="Resolved">
            Resolved
          </option>


        </select>



      </div>









      {/* Incident Table */}


      <IncidentTable

        incidents={filteredIncidents}

        isAdmin={canManageIncidents}

        onDelete={handleDeleteIncident}

        onEdit={handleEditIncident}

      />




    </div>

  );

}


export default Incidents;