import { Pencil, Trash2 } from "lucide-react";


function severityColor(severity) {
  switch (severity) {
    case "Critical":
      return "text-red-600";

    case "High":
      return "text-orange-600";

    case "Medium":
      return "text-yellow-600";

    case "Low":
      return "text-green-600";

    default:
      return "text-gray-600";
  }
}



function statusColor(status) {
  switch (status) {
    case "Open":
      return "text-red-600";

    case "In Progress":
      return "text-yellow-600";

    case "Resolved":
      return "text-green-600";

    default:
      return "text-gray-600";
  }
}




function IncidentTable({
  incidents = [],
  onDelete,
  onEdit,
  isAdmin = false,
}) {


  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">


      <h2 className="mb-6 text-2xl font-bold">
        Recent Incidents
      </h2>




      <div className="overflow-x-auto">


        <table className="min-w-full">


          <thead className="border-b bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Asset
              </th>

              <th className="px-6 py-4 text-left">
                Severity
              </th>

              <th className="px-6 py-4 text-left">
                Technician
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Date
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
              incidents.length === 0 ? (

                <tr>

                  <td
                    colSpan={isAdmin ? 7 : 6}
                    className="py-8 text-center text-gray-500"
                  >

                    No incidents recorded.

                  </td>


                </tr>


              ) : (


                incidents.map((incident)=>(


                  <tr
                    key={incident.id}
                    className="border-b transition hover:bg-gray-50"
                  >


                    <td className="px-6 py-4 font-medium">

                      {incident.title}

                    </td>




                    <td className="px-6 py-4">

                      {incident.asset}

                    </td>




                    <td
                      className={`px-6 py-4 font-medium ${severityColor(
                        incident.severity
                      )}`}
                    >

                      {incident.severity}

                    </td>




                    <td className="px-6 py-4">

                      {incident.technician}

                    </td>




                    <td
                      className={`px-6 py-4 font-medium ${statusColor(
                        incident.status
                      )}`}
                    >

                      {incident.status}

                    </td>




                    <td className="px-6 py-4">

                      {incident.date}

                    </td>





                    {
                      isAdmin && (

                        <td className="px-6 py-4">


                          <div className="flex gap-2">


                            <button
                              onClick={() => onEdit(incident)}
                              className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                            >

                              <Pencil size={16}/>

                            </button>





                            <button
                              onClick={() => onDelete(incident.id)}
                              className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                            >

                              <Trash2 size={16}/>

                            </button>



                          </div>


                        </td>


                      )
                    }



                  </tr>


                ))


              )
            }



          </tbody>



        </table>


      </div>



    </div>


  );

}


export default IncidentTable;