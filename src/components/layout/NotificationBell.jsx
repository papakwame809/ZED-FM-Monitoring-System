import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

import {
    getNotifications,
    markNotificationRead
} from "../../api/notificationsApi";



function NotificationBell() {


const [open,setOpen] = useState(false);


const [notifications,setNotifications] =
    useState([]);



useEffect(()=>{


async function loadNotifications(){

    try{

        const data =
            await getNotifications();


        setNotifications(data);


    }

    catch(err){

        console.error(
            "Failed loading notifications:",
            err
        );

    }


}


loadNotifications();


},[]);






const unreadCount =

notifications.filter(

(notification)=>

!notification.read

).length;







async function handleMarkRead(id){


try{


await markNotificationRead(id);



setNotifications(prev=>

prev.map(notification=>

notification.id === id

?

{
    ...notification,
    read:true
}

:

notification

)

);



}

catch(err){

console.error(
"Failed marking notification read:",
err
);

}


}








return (

<div className="relative">


<button

onClick={()=>setOpen(!open)}

className="
relative
flex
h-10
w-10
items-center
justify-center
rounded-full
transition
hover:bg-gray-100
"

>

<Bell size={22}/>



{
unreadCount > 0 && (

<span

className="
absolute
right-1
top-1
flex
h-4
w-4
items-center
justify-center
rounded-full
bg-red-500
text-[10px]
text-white
"

>

{unreadCount}

</span>

)

}



</button>









{
open && (

<div

className="
absolute
right-0
z-50
mt-3
w-80
rounded-xl
border
bg-white
p-4
shadow-lg
"

>


<h3 className="mb-4 font-bold">

Notifications

</h3>





{
notifications.length === 0

?

<p className="text-sm text-gray-500">

No notifications.

</p>



:


notifications.map(notification=>(


<div

key={notification.id}

className="
border-b
py-3
"

>


<p className="font-medium">

{notification.title}

</p>



<p className="text-sm text-gray-500">

{notification.message}

</p>





{
!notification.read && (

<button

onClick={()=>handleMarkRead(notification.id)}

className="
mt-2
rounded-lg
bg-violet-600
px-3
py-1
text-xs
text-white
hover:bg-violet-700
"

>

Mark as Read

</button>

)

}




</div>


))


}



</div>

)

}



</div>

);

}


export default NotificationBell;