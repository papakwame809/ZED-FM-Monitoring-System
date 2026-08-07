const API_URL =
"http://127.0.0.1:8000/api/notifications";



async function handleResponse(response){

const data =
await response.json();



if(!response.ok){

throw new Error(
data.message || "Request failed"
);

}


return data;

}





export async function getNotifications(){

const response =
await fetch(

API_URL,

{

headers:{
Accept:"application/json"
}

}

);


return handleResponse(response);

}







export async function markNotificationRead(id){

const response =
await fetch(

`${API_URL}/${id}/read`,

{

method:"PUT",

headers:{
Accept:"application/json"
}

}

);


return handleResponse(response);

}