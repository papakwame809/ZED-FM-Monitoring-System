import { Link } from "react-router-dom";


function statusColor(status) {

  switch (status) {

    case "Operational":
      return "text-green-600";


    case "Maintenance Due":
      return "text-yellow-600";


    case "Faulty":
      return "text-red-600";


    default:
      return "text-gray-600";

  }

}





function AssetTable({

  assets = [],
  onDelete,
  onEdit,
  isAdmin

}) {



  function formatDate(date){

    if(!date) return "N/A";


    return new Date(date)
      .toLocaleDateString();

  }





  return (

    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">


      <table className="min-w-full">


        <thead className="border-b bg-gray-50">

          <tr>


            <th className="px-6 py-4 text-left">
              Asset
            </th>


            <th className="px-6 py-4 text-left">
              Type
            </th>


            <th className="px-6 py-4 text-left">
              Location
            </th>


            <th className="px-6 py-4 text-left">
              Status
            </th>


            <th className="px-6 py-4 text-left">
              Last Service
            </th>


            <th className="px-6 py-4 text-left">
              Warranty
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
            assets.length === 0 ? (

              <tr>

                <td
                  colSpan={isAdmin ? 7 : 6}
                  className="px-6 py-6 text-center text-gray-500"
                >

                  No assets found

                </td>

              </tr>


            )

            :


            assets.map(asset => (

              <tr

                key={asset.id}

                className="
                border-b
                transition
                hover:bg-gray-50
                "

              >


                <td className="px-6 py-4">


                  <Link

                    to={`/assets/${asset.id}`}

                    className="
                    font-medium
                    text-violet-600
                    hover:underline
                    "

                  >

                    {asset.name ?? "Unnamed Asset"}

                  </Link>


                </td>






                <td className="px-6 py-4">

                  {asset.type ?? "N/A"}

                </td>






                <td className="px-6 py-4">

                  {asset.location ?? "N/A"}

                </td>






                <td

                  className={`
                  px-6 py-4
                  font-medium
                  ${statusColor(asset.status)}
                  `}

                >

                  {asset.status ?? "Unknown"}

                </td>






                <td className="px-6 py-4">

                  {formatDate(asset.last_service)}

                </td>






                <td className="px-6 py-4">

                  {asset.warranty ?? "N/A"}

                </td>








                {
                  isAdmin && (

                    <td className="px-6 py-4">


                      <div className="flex gap-3">


                        <button

                          onClick={() => onEdit(asset)}

                          className="
                          rounded-lg
                          bg-blue-600
                          px-4
                          py-2
                          text-white
                          transition
                          hover:bg-blue-700
                          "

                        >

                          Edit

                        </button>





                        <button

                          onClick={() => onDelete(asset.id)}

                          className="
                          rounded-lg
                          bg-red-600
                          px-4
                          py-2
                          text-white
                          transition
                          hover:bg-red-700
                          "

                        >

                          Delete

                        </button>



                      </div>


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


export default AssetTable;