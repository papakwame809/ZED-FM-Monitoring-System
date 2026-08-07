function statusColor(status) {

    switch(status){

        case "Completed":
            return "text-green-600";


        case "Scheduled":
            return "text-blue-600";


        case "Pending":
            return "text-yellow-600";


        case "Overdue":
            return "text-red-600";


        default:
            return "text-gray-600";

    }

}




function MaintenanceTable({

    maintenance = [],

    onEdit,

    onDelete,

    isAdmin

}) {


return (

<div className="
overflow-x-auto
rounded-xl
bg-white
shadow
">


<table className="min-w-full">


<thead className="border-b bg-gray-50">


<tr>


<th className="px-6 py-4 text-left">
Asset
</th>


<th className="px-6 py-4 text-left">
Maintenance Type
</th>


<th className="px-6 py-4 text-left">
Technician
</th>


<th className="px-6 py-4 text-left">
Due Date
</th>


<th className="px-6 py-4 text-left">
Priority
</th>


<th className="px-6 py-4 text-left">
Status
</th>



{
isAdmin && (

<th className="px-6 py-4 text-left">
Actions
</th>

)
}



</tr>


</thead>





<tbody>


{
maintenance.map((item)=>(


<tr

key={item.id}

className="
border-b
hover:bg-gray-50
"

>


<td className="px-6 py-4">


{

typeof item.asset === "object"

?

item.asset?.name

:

item.asset

}


</td>





<td className="px-6 py-4">


{
item.type 
||
item.task
}


</td>





<td className="px-6 py-4">

{item.technician}

</td>





<td className="px-6 py-4">
    {
        item.maintenance_date
        ? item.maintenance_date.split("T")[0]
        : "-"
    }
</td>




<td className="px-6 py-4">


{
item.priority
||
"Normal"
}


</td>





<td

className={`
px-6 py-4
font-medium
${statusColor(item.status)}
`}

>

{item.status}

</td>







{

isAdmin && (

<td className="
px-6
py-4
flex
gap-3
">


<button

onClick={()=>onEdit(item)}

className="
rounded-lg
bg-blue-600
px-4
py-2
text-white
hover:bg-blue-700
"

>

Edit

</button>





<button

onClick={()=>onDelete(item.id)}

className="
rounded-lg
bg-red-600
px-4
py-2
text-white
hover:bg-red-700
"

>

Delete

</button>



</td>

)

}



</tr>


))

}



</tbody>


</table>


</div>


);

}


export default MaintenanceTable;