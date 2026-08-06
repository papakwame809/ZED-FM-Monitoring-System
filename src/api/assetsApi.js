const API_URL = "http://127.0.0.1:8000/api/assets";



async function handleResponse(response){


    const data = await response.json();



    if(!response.ok){


        console.error(
            "API Error:",
            data
        );


        throw new Error(
            data.message || "Request failed"
        );


    }



    return data;


}







function normalizeAsset(asset){


    return {


        id: asset.id,


        name: asset.name,


        type: asset.type,


        location: asset.location,


        status: asset.status,


        serialNumber:
            asset.serial_number ?? "",


        purchaseDate:
            asset.purchase_date ?? "",


        lastService:
            asset.last_service ?? "",


        warranty:
            asset.warranty ?? "",


    };


}








function formatPayload(asset){


    return {


        name: asset.name,


        type: asset.type,


        location: asset.location,


        status: asset.status,


        serial_number:
            asset.serialNumber
            ??
            asset.serial_number,



        purchase_date:
            asset.purchaseDate
            ??
            asset.purchase_date
            ??
            null,



        last_service:
            asset.lastService
            ??
            asset.last_service
            ??
            null,



        warranty:
            asset.warranty
            ??
            null,


    };


}









// GET ALL ASSETS

export async function getAssets(){


    const response = await fetch(

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



    return data.map(normalizeAsset);


}










// CREATE ASSET

export async function createAsset(asset){


    const response = await fetch(

        API_URL,

        {

            method:"POST",


            headers:{


                "Content-Type":
                "application/json",


                Accept:
                "application/json",

            },


            body:

            JSON.stringify(
                formatPayload(asset)
            )


        }

    );



    const data =
        await handleResponse(response);



    return normalizeAsset(data);


}









// UPDATE ASSET

export async function updateAsset(
    id,
    asset
){

    const response = await fetch(
        `${API_URL}/${id}`,

        {


            method:"PUT",

            headers:{

                "Content-Type":
                "application/json",


                Accept:
                "application/json",

            },


            body:

            JSON.stringify(
                formatPayload(asset)
            )


        }

    );



    const data =
        await handleResponse(response);



    return normalizeAsset(data);


}









// DELETE ASSET

export async function deleteAsset(id){


    const response = await fetch(

        `${API_URL}/${id}`,

        {


            method:"DELETE",


            headers:{


                Accept:
                "application/json"


            }


        }

    );



    return handleResponse(response);


}

export async function getMaintenanceRecords(assetId){

    const response = await fetch(

        `http://127.0.0.1:8000/api/maintenance-records?asset_id=${assetId}`,

        {

            headers:{
                Accept:"application/json"
            }

        }

    );


    return handleResponse(response);

}

export async function getAsset(id){

    const response = await fetch(

        `${API_URL}/${id}`,

        {

            headers:{
                Accept:"application/json"
            }

        }

    );


    const data = await handleResponse(response);


    return normalizeAsset(data);

}