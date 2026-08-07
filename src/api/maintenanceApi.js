const API_URL =
    "http://127.0.0.1:8000/api/maintenance-records";



async function handleResponse(response){

    const text =
        await response.text();


    const data =
        text
        ?
        JSON.parse(text)
        :
        {};


    if(!response.ok){

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




function normalizeMaintenance(record){

    return {

        id:
            record.id,


        assetId:
            record.asset_id,


        asset:
            record.asset
            ??
            null,


        task:
            record.task,


        technician:
            record.technician,


        maintenanceDate:
            record.maintenance_date
            ?
            record.maintenance_date.split("T")[0]
            :
            "",


        status:
            record.status,


        notes:
            record.notes ?? "",


        createdAt:
            record.created_at,


        updatedAt:
            record.updated_at

    };

}




// GET ALL MAINTENANCE RECORDS

export async function getMaintenanceRecords(){

    const response =
        await fetch(

            API_URL,

            {

                headers:{

                    Accept:
                    "application/json"

                }

            }

        );


    const data =
        await handleResponse(response);



    console.log(
        "Maintenance records:",
        data
    );



    return data.map(
        normalizeMaintenance
    );

}