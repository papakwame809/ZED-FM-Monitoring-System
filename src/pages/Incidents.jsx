import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import IncidentTable from "../cards/IncidentTable";

import {
    getIncidents,
    deleteIncident
} from "../api/incidentsApi";

import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";



function Incidents(){


    const navigate = useNavigate();


    const { user } = useAuth();


    const isAdmin = hasRole(
        user,
        ROLES.ADMIN
    );


    const isTechnician = hasRole(
        user,
        ROLES.TECHNICIAN
    );


    const canManageIncidents =
        isAdmin || isTechnician;





    const [incidents,setIncidents] = useState([]);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState("");



    const [searchTerm,setSearchTerm] = useState("");

    const [filterStatus,setFilterStatus] = useState("All");







    useEffect(()=>{


        async function loadIncidents(){


            try{


                const data = await getIncidents();


                setIncidents(data);


            }


            catch(err){


                console.error(err);


                setError(
                    "Failed to load incidents"
                );


            }


            finally{


                setLoading(false);


            }


        }



        loadIncidents();



    },[]);









    async function handleDeleteIncident(id){


        const confirmed =
            window.confirm(
                "Delete this incident?"
            );


        if(!confirmed)
        return;



        try{


            await deleteIncident(id);



            setIncidents(prev =>

                prev.filter(
                    incident =>
                    incident.id !== id
                )

            );


        }


        catch(err){


            console.error(err);


        }


    }








    function handleEditIncident(incident){


        navigate(
            `/report-incident/${incident.id}`
        );


    }







    function handleViewIncident(incident){


        navigate(
            `/incidents/${incident.id}`
        );


    }








    const filteredIncidents = useMemo(()=>{


        return incidents.filter(incident=>{


            const searchMatch =

                incident.title
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

                ||

                incident.asset?.name
                ?.toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );





            const statusMatch =

                filterStatus === "All"

                ||

                incident.status === filterStatus;



            return (
                searchMatch &&
                statusMatch
            );


        });


    },[
        incidents,
        searchTerm,
        filterStatus
    ]);








    if(loading)
    return <p>Loading incidents...</p>;





    if(error)
    return <p>{error}</p>;








    return (

        <div className="space-y-10">


            <div>


                <h1 className="text-3xl font-bold">

                    Incident Management

                </h1>



                <p className="text-gray-600">

                    Track, assign and resolve technical issues.

                </p>


            </div>









            <div className="flex flex-wrap gap-6">


                {
                    canManageIncidents && (

                        <button

                            onClick={() =>
                                navigate("/report-incident")
                            }

                            className="
                            rounded-xl
                            bg-black
                            px-6
                            py-3
                            text-white
                            hover:bg-violet-600
                            "

                        >

                            + Report Incident

                        </button>

                    )
                }





                <input

                    value={searchTerm}

                    onChange={
                        e =>
                        setSearchTerm(
                            e.target.value
                        )
                    }

                    placeholder="Search incidents..."

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
                        e =>
                        setFilterStatus(
                            e.target.value
                        )
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








            <IncidentTable

                incidents={filteredIncidents}

                isAdmin={canManageIncidents}

                onDelete={handleDeleteIncident}

                onEdit={handleEditIncident}

                onView={handleViewIncident}

            />


        </div>

    );

}



export default Incidents;