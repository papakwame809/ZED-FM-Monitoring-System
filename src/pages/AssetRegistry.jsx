import AssetTable from "../cards/AssetTable";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";


const initialAssets = [

  {
    id: 1,
    name: "Broadcast Console",
    type: "Audio Equipment",
    location: "Studio A",
    serialNumber: "BC-001",
    status: "Operational",
    technician: "Kwame",
    lastService: "January 2026",
    warranty: "2028",
  },


  {
    id: 2,
    name: "Main Transmitter",
    type: "Transmission",
    location: "Roof Tower",
    serialNumber: "TX-002",
    status: "Maintenance Due",
    technician: "Ama",
    lastService: "March 2026",
    warranty: "2027",
  },

];




const emptyForm = {

  name:"",
  type:"",
  location:"",
  serialNumber:"",
  status:"",
  technician:"",
  lastService:"",
  warranty:"",

};





function AssetRegistry(){

  const { user } = useAuth();

  const isAdmin = hasRole(user, ROLES.ADMIN);



  const [assets,setAssets] = useState(initialAssets);

  const [showForm,setShowForm] = useState(false);

  const [editingAsset,setEditingAsset] = useState(null);


  const [formData,setFormData] = useState(emptyForm);


  const [searchTerm,setSearchTerm] = useState("");

  const [filterStatus,setFilterStatus] = useState("All");







  const filteredAssets = assets.filter(asset=>{


    const searchMatch =
      asset.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );


    const filterMatch =
      filterStatus === "All" ||
      asset.status === filterStatus;



    return searchMatch && filterMatch;


  });








  function handleChange(e){

    const {name,value}=e.target;


    setFormData(prev=>({

      ...prev,

      [name]:value,

    }));

  }









  function resetForm(){

    setFormData(emptyForm);

    setEditingAsset(null);

    setShowForm(false);

  }









  function handleSaveAsset(){


    if(editingAsset){


      setAssets(prev=>

        prev.map(asset=>

          asset.id === editingAsset.id

          ?

          {
            ...asset,
            ...formData
          }

          :

          asset

        )

      );


    }


    else{


      setAssets(prev=>[

        ...prev,

        {
          id:Date.now(),
          ...formData
        }

      ]);

    }



    resetForm();


  }










  function handleEditAsset(asset){


    setEditingAsset(asset);


    setFormData({

      name:asset.name,
      type:asset.type,
      location:asset.location,
      serialNumber:asset.serialNumber,
      status:asset.status,
      technician:asset.technician,
      lastService:asset.lastService,
      warranty:asset.warranty,

    });


    setShowForm(true);


  }










  function handleDeleteAsset(id){


    if(
      window.confirm(
        "Are you sure you want to delete this asset?"
      )
    ){

      setAssets(prev=>

        prev.filter(
          asset=>asset.id !== id
        )

      );

    }

  }










  return (

    <div className="space-y-10">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Asset Registry
        </h1>


        <p className="text-gray-600">
          Manage and monitor all technical equipment.
        </p>

      </div>








      {/* Controls */}

      <div className="flex items-center gap-8">


        {
          isAdmin && (

            <button

              onClick={()=>{

                resetForm();

                setShowForm(true);

              }}

              className="
              rounded-xl
              bg-black
              px-6
              py-3
              text-white
              hover:bg-violet-700
              "

            >

              + Add Asset

            </button>

          )

        }






        <input

          value={searchTerm}

          onChange={
            e=>setSearchTerm(e.target.value)
          }

          placeholder="Search assets..."

          className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          placeholder:text-gray-300
          "

        />







        <select

          value={filterStatus}

          onChange={
            e=>setFilterStatus(e.target.value)
          }

          className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
          "

        >

          <option>
            All
          </option>

          <option>
            Operational
          </option>

          <option>
            Maintenance Due
          </option>

          <option>
            Faulty
          </option>


        </select>


      </div>









      {/* Form */}

      {
        showForm && isAdmin && (

          <div className="rounded-xl bg-white p-6 shadow">


            <h2 className="mb-6 text-xl font-bold">

              {
                editingAsset
                ?
                "Edit Asset"
                :
                "Add New Asset"
              }

            </h2>




            <div className="grid grid-cols-2 gap-5">


              {
                Object.keys(formData).map(field=>(

                  <input

                    key={field}

                    name={field}

                    value={formData[field]}

                    onChange={handleChange}

                    placeholder={field}

                    className="
                    rounded-lg
                    border
                    p-3
                    "

                  />

                ))

              }


            </div>




            <button

              onClick={handleSaveAsset}

              className="
              mt-6
              rounded-xl
              bg-violet-600
              px-6
              py-3
              text-white
              "

            >

              {
                editingAsset
                ?
                "Update Asset"
                :
                "Save Asset"
              }

            </button>


          </div>

        )

      }









      <AssetTable

        assets={filteredAssets}

        onDelete={handleDeleteAsset}

        onEdit={handleEditAsset}

        isAdmin={isAdmin}

      />









      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">


        <StatCard
          title="Active Incidents"
          value="8"
          subtitle="3 Critical Faults"
        />


        <StatCard
          title="Total Assets"
          value={assets.length}
        />


        <StatCard

          title="Maintenance Due"

          value={
            assets.filter(
              a=>a.status==="Maintenance Due"
            ).length
          }

        />


        <StatCard

          title="System Status"

          value="Operational"

        />


      </div>


    </div>

  );

}








function StatCard({title,value,subtitle}){

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-sm text-gray-500">
        {title}
      </p>


      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>


      {
        subtitle &&
        <p className="text-red-500">
          {subtitle}
        </p>
      }


    </div>

  );

}





export default AssetRegistry;