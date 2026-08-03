import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import assets from "../data/assets";


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



function AssetDetails() {

  const { id } = useParams();


  const asset = assets.find(
    (item) => item.id === id
  );



  if (!asset) {

    return (

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Asset not found
        </h1>


        <Link

          to={`/assets/${asset.id}`}

          className="text-violet-600 hover:underline"

        >

          Back to Asset Registry

        </Link>


      </div>

    );

  }





  return (

    <div className="space-y-10">



      {/* Back */}

      <Link

        to="/assets"

        className="
        inline-flex
        items-center
        gap-2
        text-violet-600
        hover:underline
        "

      >

        <ArrowLeft size={18}/>

        Back to Assets

      </Link>






      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">

          {asset.name}

        </h1>


        <p className="text-gray-600">

          View asset information, maintenance history and incidents.

        </p>


      </div>






      {/* Asset Information */}

      <div className="rounded-xl bg-white p-8 shadow">


        <h2 className="mb-6 text-2xl font-bold">

          Asset Information

        </h2>




        <div className="grid grid-cols-2 gap-8">


          <Info
            label="Asset ID"
            value={asset.id}
          />


          <Info
            label="Asset Name"
            value={asset.name}
          />


          <Info
            label="Type"
            value={asset.type}
          />


          <Info
            label="Location"
            value={asset.location}
          />


          <Info
            label="Serial Number"
            value={asset.serialNumber}
          />


          <Info
            label="Purchase Date"
            value={asset.purchaseDate}
          />


          <Info
            label="Warranty"
            value={asset.warranty}
          />



          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>


            <p
              className={`
              mt-1
              text-lg
              font-medium
              ${statusColor(asset.status)}
              `}
            >

              {asset.status}

            </p>


          </div>


        </div>


      </div>







      {/* Maintenance History */}

      <Section title="Maintenance History">


        <table className="w-full">


          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Date
              </th>

              <th className="py-3 text-left">
                Task
              </th>

              <th className="py-3 text-left">
                Technician
              </th>

              <th className="py-3 text-left">
                Status
              </th>


            </tr>


          </thead>




          <tbody>


          {
            asset.maintenance?.length ? (

              asset.maintenance.map((job,index)=>(


                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {job.date}
                  </td>


                  <td className="py-4">
                    {job.task}
                  </td>


                  <td className="py-4">
                    {job.technician}
                  </td>


                  <td className="py-4">
                    {job.status}
                  </td>


                </tr>


              ))


            ) : (

              <EmptyRow text="No maintenance history." />

            )


          }


          </tbody>


        </table>


      </Section>







      {/* Related Incidents */}

      <Section title="Related Incidents">


        <table className="w-full">


          <thead>

            <tr className="border-b">


              <th className="py-3 text-left">
                ID
              </th>


              <th className="py-3 text-left">
                Title
              </th>


              <th className="py-3 text-left">
                Severity
              </th>


              <th className="py-3 text-left">
                Status
              </th>


            </tr>


          </thead>




          <tbody>


          {
            asset.incidents?.length ? (


              asset.incidents.map((incident)=>(

                <tr
                  key={incident.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {incident.id}
                  </td>


                  <td className="py-4">
                    {incident.title}
                  </td>


                  <td className="py-4">
                    {incident.severity}
                  </td>


                  <td className="py-4">
                    {incident.status}
                  </td>


                </tr>


              ))


            ) : (

              <EmptyRow text="No related incidents." />

            )


          }


          </tbody>


        </table>


      </Section>






      {/* Actions */}

      <div className="flex gap-6">


        <button className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          hover:bg-violet-700
        ">

          Edit Asset

        </button>



        <button className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          hover:bg-violet-700
        ">

          Schedule Maintenance

        </button>


      </div>




    </div>

  );

}





function Section({title, children}) {

  return (

    <div className="rounded-xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      {children}

    </div>

  );

}





function Info({label,value}) {

  return (

    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>


      <p className="mt-1 text-lg font-medium">
        {value}
      </p>


    </div>

  );

}





function EmptyRow({text}) {

  return (

    <tr>

      <td
        colSpan="4"
        className="
        py-6
        text-center
        text-gray-500
        "
      >

        {text}

      </td>

    </tr>

  );

}



export default AssetDetails;