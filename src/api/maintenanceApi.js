const API_URL = "http://127.0.0.1:8000/api/maintenance-records";



async function handleResponse(response){

    const data = await response.json();


    if(!response.ok){

        console.error("API Error:", data);

        throw new Error(
            data.message || "Request failed"
        );

    }


    return data;

}




export async function getMaintenanceRecords(assetId){

    const response = await fetch(
        API_URL
    );


    const data = await handleResponse(response);


    return data.filter(
        record =>
        record.asset_id === Number(assetId)
    );

}