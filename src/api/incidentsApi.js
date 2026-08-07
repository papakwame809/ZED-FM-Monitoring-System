const API_URL = "http://127.0.0.1:8000/api/incidents";



async function handleResponse(response) {

    const text = await response.text();


    const data = text
        ? JSON.parse(text)
        : {};



    if (!response.ok) {

        console.error(
            "API Error:",
            data
        );


        throw new Error(
            data.message ||
            "Request failed"
        );

    }



    return data;

}


function normalizeIncident(incident){

return {

    id:
        incident.id,

    assetId:
        incident.asset_id,

    asset:
        incident.asset ?? null,

    title:
        incident.title,

    description:
        incident.description ?? "",


    severity:
        incident.severity ?? "",


    technician:
        incident.technician ?? "",


    status:
        incident.status,


    incidentDate:
        incident.incident_date
        ? incident.incident_date.split("T")[0]
        : "",


    createdAt:
        incident.created_at ?? ""

};

}



function formatPayload(incident) {

    const payload = {

        asset_id: Number(
            incident.assetId
            ?? 
            incident.asset_id
        ),


        title:
            incident.title,


        description:
            incident.description
            ||
            null,


        severity:
            incident.severity,


        status:
            incident.status
            ||
            "Open",


        incident_date:
            incident.incidentDate
            ??
            null

    };


    console.log(
        "FINAL PAYLOAD:",
        payload
    );


    return payload;

}







// GET ALL INCIDENTS

export async function getIncidents() {


    const response =
        await fetch(

            API_URL,

            {

                headers: {

                    Accept:
                    "application/json"

                }

            }

        );



    const data =
        await handleResponse(response);



    return data.map(
        normalizeIncident
    );

}








// GET SINGLE INCIDENT

export async function getIncident(id) {


    const response =
        await fetch(

            `${API_URL}/${id}`,

            {

                headers: {

                    Accept:
                    "application/json"

                }

            }

        );



    const data =
        await handleResponse(response);



    return normalizeIncident(data);

}








// GET INCIDENTS BY ASSET

export async function getIncidentsByAsset(assetId) {


    const response =
        await fetch(

            `${API_URL}?asset_id=${assetId}`,

            {

                headers: {

                    Accept:
                    "application/json"

                }

            }

        );



    const data =
        await handleResponse(response);



    return data.map(
        normalizeIncident
    );

}








// CREATE INCIDENT

export async function createIncident(incident) {


    const payload =
        formatPayload(incident);



    console.log(
        "Sending incident:",
        payload
    );



    const response =
        await fetch(

            API_URL,

            {


                method:
                "POST",



                headers: {


                    "Content-Type":
                    "application/json",


                    Accept:
                    "application/json"


                },



                body:

                    JSON.stringify(
                        payload
                    )

            }

        );



    const data =
        await handleResponse(response);



    return normalizeIncident(data);

}








// UPDATE INCIDENT

export async function updateIncident(
    id,
    incident
) {


    const payload =
        formatPayload(incident);



    console.log(
        "Updating incident:",
        payload
    );



    const response =
        await fetch(

            `${API_URL}/${id}`,

            {


                method:
                "PUT",



                headers: {


                    "Content-Type":
                    "application/json",


                    Accept:
                    "application/json"


                },



                body:

                    JSON.stringify(
                        payload
                    )


            }

        );



    const data =
        await handleResponse(response);



    return normalizeIncident(data.incident ?? data);

}








// DELETE INCIDENT

export async function deleteIncident(id) {


    const response =
        await fetch(

            `${API_URL}/${id}`,

            {


                method:
                "DELETE",



                headers: {


                    Accept:
                    "application/json"


                }


            }

        );



    return handleResponse(response);

}