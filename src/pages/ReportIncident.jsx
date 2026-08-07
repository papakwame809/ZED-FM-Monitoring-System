import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IncidentForm from "../components/forms/IncidentForm";

import {
    createIncident,
    updateIncident,
    getIncident
} from "../api/incidentsApi";

import {
    getAssets
} from "../api/assetsApi";


function ReportIncident(){

    const navigate = useNavigate();

    const { id } = useParams();


    const emptyIncident = {

        assetId: "",
        title: "",
        description: "",
        status: "Open",
        severity: "",
        technician: "",
        incidentDate: ""

    };


    const [incident, setIncident] =
        useState(emptyIncident);


    const [assets, setAssets] =
        useState([]);


    const [loading, setLoading] =
        useState(false);


    const isEditing =
        Boolean(id);





    useEffect(() => {

        async function loadPageData(){

            try{

                const assetsData =
                    await getAssets();


                setAssets(
                    assetsData
                );


                console.log(
                    "Assets loaded:",
                    assetsData
                );



                if(isEditing){

                    const incidentData =
                        await getIncident(id);


                    setIncident(
                        incidentData
                    );

                }

            }

            catch(err){

                console.error(
                    "Failed loading page:",
                    err
                );

            }

        }


        loadPageData();


    }, [id, isEditing]);









    async function handleSubmit(e){

        e.preventDefault();


        try{

            setLoading(true);



            if(isEditing){

                await updateIncident(
                    id,
                    incident
                );

            }

            else{

                await createIncident(
                    incident
                );

            }


            navigate("/incidents");


        }

        catch(err){

            console.error(err);


            alert(
                err.message
            );

        }

        finally{

            setLoading(false);

        }

    }









    return (

        <div className="space-y-10">


            <button

                onClick={() =>
                    navigate("/incidents")
                }

                className="
                rounded-xl
                bg-black
                px-5
                py-2
                text-white
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
                        "Update incident details."
                        :
                        "Create a new technical issue report."
                    }

                </p>


            </div>









            <IncidentForm

                incident={incident}

                setIncident={setIncident}

                onSubmit={handleSubmit}

                loading={loading}

                assets={assets}

                isEditing={isEditing}

            />



        </div>

    );

}


export default ReportIncident;