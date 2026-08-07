const API_URL =
    "http://127.0.0.1:8000/api/assets";



async function handleResponse(response){

    const text =
        await response.text();

    const data =
        text
            ? JSON.parse(text)
            : {};

    if(!response.ok){

        console.error("API Error:", data);

        throw new Error(
            data.message ||
            "Request failed"
        );

    }

    return data;

}



// Convert React -> Laravel

function formatPayload(asset){

    return{

        name:
            asset.name,

        type:
            asset.type,

        location:
            asset.location,

        status:
            asset.status,

        serial_number:
            asset.serialNumber ??
            asset.serial_number,

        purchase_date:
            asset.purchaseDate ??
            asset.purchase_date,

        last_service:
            asset.lastService ??
            asset.last_service,

        warranty:
            asset.warranty

    };

}



// Convert Laravel -> React

function normalizeAsset(asset){

    return{

        id:
            asset.id,

        name:
            asset.name,

        type:
            asset.type,

        location:
            asset.location,

        status:
            asset.status,

        serialNumber:
            asset.serial_number,

        purchaseDate:
            asset.purchase_date,

        lastService:
            asset.last_service,

        warranty:
            asset.warranty,

        createdAt:
            asset.created_at,

        updatedAt:
            asset.updated_at

    };

}



// GET ALL

export async function getAssets(){

    const response =
        await fetch(API_URL,{

            headers:{
                Accept:"application/json"
            }

        });

    const data =
        await handleResponse(response);

    return data.map(normalizeAsset);

}



// GET ONE

export async function getAsset(id){

    const response =
        await fetch(`${API_URL}/${id}`,{

            headers:{
                Accept:"application/json"
            }

        });

    const data =
        await handleResponse(response);

    return normalizeAsset(data);

}



// CREATE

export async function createAsset(asset){

    const payload =
        formatPayload(asset);

    console.log("FINAL PAYLOAD:", payload);

    const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },

            body:
                JSON.stringify(payload)

        });

    const data =
        await handleResponse(response);

    return normalizeAsset(data);

}



// UPDATE

export async function updateAsset(id,asset){

    const payload =
        formatPayload(asset);

    console.log("FINAL PAYLOAD:", payload);

    const response =
        await fetch(`${API_URL}/${id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },

            body:
                JSON.stringify(payload)

        });

    const data =
        await handleResponse(response);

    return normalizeAsset(data);

}



// DELETE

export async function deleteAsset(id){

    const response =
        await fetch(`${API_URL}/${id}`,{

            method:"DELETE",

            headers:{
                Accept:"application/json"
            }

        });

    return handleResponse(response);

}