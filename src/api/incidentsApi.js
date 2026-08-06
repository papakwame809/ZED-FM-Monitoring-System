const API_URL =
"http://127.0.0.1:8000/api/incidents";




async function handleResponse(response){

    const data =
        await response.json();


    if(!response.ok){

        console.error(
            data
        );

        throw new Error(
            data.message || "Request failed"
        );

    }


    return data;

}






export async function getIncidents(assetId){

    const response = await fetch(

        `${API_URL}?asset_id=${assetId}`,

        {
            headers:{
                Accept:"application/json"
            }
        }

    );


    const data =
        await handleResponse(response);



    return data.filter(

        incident =>
        String(incident.asset_id)
        ===
        String(assetId)

    );

}