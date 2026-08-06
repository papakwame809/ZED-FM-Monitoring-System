import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";


import { getAsset } from "../api/assetsApi";
import { getMaintenanceRecords } from "../api/maintenanceApi";
import { getIncidents } from "../api/incidentsApi";




function statusColor(status) {

  switch(status){

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








function AssetDetails(){


  const { id } = useParams();

  const navigate = useNavigate();



  const [asset,setAsset] = useState(null);

  const [maintenance,setMaintenance] = useState([]);

  const [incidents,setIncidents] = useState([]);



  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");








  useEffect(()=>{


    async function loadData(){


      try{


        setLoading(true);



        const [

          assetData,

          maintenanceData,

          incidentData

        ] = await Promise.all([


          getAsset(id),


          getMaintenanceRecords(id),


          getIncidents(id)


        ]);




        setAsset(assetData);


        setMaintenance(
          maintenanceData
        );


        setIncidents(
          incidentData
        );



      }


      catch(err){


        console.error(err);


        setError(
          "Failed to load asset details"
        );


      }


      finally{


        setLoading(false);


      }


    }



    loadData();


  },[id]);









  if(loading){

    return (
      <p>
        Loading asset...
      </p>
    );

  }









  if(error || !asset){

    return (

      <div className="space-y-6">


        <h1 className="text-3xl font-bold">
          Asset not found
        </h1>



        <Link

          to="/assets"

          className="
          text-violet-600
          hover:underline
          "

        >

          ← Back to Asset Registry

        </Link>


      </div>

    );

  }









  return (

    <div className="space-y-10">



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









      <div>

        <h1 className="text-3xl font-bold">

          {asset.name}

        </h1>


        <p className="text-gray-600">

          View asset information, maintenance history and incidents.

        </p>


      </div>









      <Section title="Asset Information">


        <div className="grid grid-cols-2 gap-8">


          <Info label="Asset ID" value={asset.id}/>


          <Info label="Name" value={asset.name}/>


          <Info label="Type" value={asset.type}/>


          <Info label="Location" value={asset.location}/>


          <Info
            label="Serial Number"
            value={asset.serialNumber}
          />


          <Info
            label="Purchase Date"
            value={asset.purchaseDate}
          />


          <Info
            label="Last Service"
            value={asset.lastService}
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
              font-medium
              ${statusColor(asset.status)}
              `}
            >

              {asset.status}

            </p>


          </div>



        </div>


      </Section>









      <Section title="Maintenance History">


        {
          maintenance.length ? (


            maintenance.map(record=>(


              <div

                key={record.id}

                className="
                border-b
                py-4
                "

              >

                <p className="font-medium">

                  {record.task}

                </p>


                <p className="text-sm text-gray-500">

                  Technician: {record.technician}

                </p>



                <p className="text-sm text-gray-500">

                  Date: {record.maintenance_date}

                </p>



                <p className="text-sm">

                  Status: {record.status}

                </p>




                {
                  record.notes && (

                    <p className="mt-2 text-sm text-gray-500">

                      {record.notes}

                    </p>

                  )
                }


              </div>


            ))


          )

          :

          (

            <p className="text-gray-500">

              No maintenance history.

            </p>

          )

        }


      </Section>









      <Section title="Related Incidents">


        {
          incidents.length ? (

            incidents.map(incident=>(


              <div

                key={incident.id}

                className="
                border-b
                py-4
                "

              >

                <p className="font-medium">

                  {incident.title}

                </p>


                <p className="text-sm text-gray-500">

                  {incident.description}

                </p>


                <p className="text-sm">

                  Status: {incident.status}

                </p>


                <p className="text-sm text-gray-500">

                  Date: {incident.incident_date}

                </p>


              </div>


            ))


          )

          :

          (

            <p className="text-gray-500">

              No related incidents.

            </p>

          )

        }


      </Section>









      <div className="flex gap-6">


        <button

          onClick={() =>
            navigate(`/assets/${asset.id}/edit`)
          }

          className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          hover:bg-violet-700
          "

        >

          Edit Asset

        </button>





        <button

          onClick={() =>
            navigate("/maintenance")
          }

          className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          hover:bg-violet-700
          "

        >

          Schedule Maintenance

        </button>


      </div>



    </div>

  );

}








function Section({title,children}){

  return (

    <div className="
      rounded-xl
      bg-white
      p-8
      shadow
    ">


      <h2 className="mb-6 text-2xl font-bold">

        {title}

      </h2>


      {children}


    </div>

  );

}








function Info({label,value}){


  return (

    <div>

      <p className="text-sm text-gray-500">

        {label}

      </p>


      <p className="mt-1 text-lg font-medium">

        {value || "-"}

      </p>


    </div>

  );

}



export default AssetDetails;