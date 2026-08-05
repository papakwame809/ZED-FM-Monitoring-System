import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AssetTable from "../cards/AssetTable";
import assetsData from "../data/assets";

import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";


const emptyForm = {
  name: "",
  type: "",
  location: "",
  serialNumber: "",
  status: "",
  technician: "",
  lastService: "",
  warranty: "",
};




function AssetRegistry() {


  const navigate = useNavigate();

  const { id } = useParams();


  const { user } = useAuth();


  const isAdmin = hasRole(
    user,
    ROLES.ADMIN
  );




  const [assets, setAssets] = useState(() => {

    const stored =
      localStorage.getItem("assets");


    if(stored){

      return JSON.parse(stored);

    }


    localStorage.setItem(
      "assets",
      JSON.stringify(assetsData)
    );


    return assetsData;

  });





  const [formData,setFormData] = useState(emptyForm);

  const [editingAsset,setEditingAsset] = useState(null);

  const [showForm,setShowForm] = useState(false);


  const [searchTerm,setSearchTerm] = useState("");

  const [filterStatus,setFilterStatus] = useState("All");









  /*
    Load asset when URL has id

    /assets/:id/edit
  */

  useEffect(()=>{


    if(!id) return;



    const asset = assets.find(

      item =>
      String(item.id) === String(id)

    );



    if(!asset){

      navigate("/assets");

      return;

    }





    setEditingAsset(asset);


    setFormData({

      name: asset.name ?? "",
      type: asset.type ?? "",
      location: asset.location ?? "",
      serialNumber: asset.serialNumber ?? "",
      status: asset.status ?? "",
      technician: asset.technician ?? "",
      lastService: asset.lastService ?? "",
      warranty: asset.warranty ?? "",

    });



    setShowForm(true);



  },[
    id,
    assets,
    navigate
  ]);









  function saveAssets(updated){


    setAssets(updated);


    localStorage.setItem(
      "assets",
      JSON.stringify(updated)
    );


  }









  function handleChange(e){


    const {
      name,
      value
    } = e.target;



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


    let updatedAssets;




    if(editingAsset){


      updatedAssets = assets.map(asset=>

        asset.id === editingAsset.id

        ?

        {
          ...asset,
          ...formData,
        }

        :

        asset

      );


    }

    else{


      const newAsset = {

        id:`AST-${Date.now()}`,

        ...formData,

      };



      updatedAssets = [

        ...assets,

        newAsset,

      ];


    }






    saveAssets(updatedAssets);


    resetForm();


    navigate("/assets");


  }









  function handleEditAsset(asset){


    navigate(
      `/assets/${asset.id}/edit`
    );


  }









  function handleDeleteAsset(id){


    const confirmed = window.confirm(
      "Delete this asset?"
    );


    if(!confirmed) return;



    const updatedAssets = assets.filter(

      asset =>
      asset.id !== id

    );



    saveAssets(updatedAssets);


  }









  const filteredAssets = useMemo(()=>{


    return assets.filter(asset=>{


      const searchMatch =

        asset.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );



      const statusMatch =

        filterStatus === "All"

        ||

        asset.status === filterStatus;



      return (
        searchMatch &&
        statusMatch
      );


    });


  },[
    assets,
    searchTerm,
    filterStatus
  ]);









  return (

    <div className="space-y-10">


      <div>


        <h1 className="text-3xl font-bold">

          {
            id
            ?
            "Edit Asset"
            :
            "Asset Registry"
          }

        </h1>


        <p className="text-gray-600">

          Manage and monitor all technical equipment.

        </p>


      </div>








      {
        isAdmin && !id && (

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
            "

          >

            + Add Asset

          </button>

        )

      }









      <div className="flex gap-6">


        <input

          value={searchTerm}

          onChange={
            e=>setSearchTerm(e.target.value)
          }

          placeholder="Search assets..."

          className="
          rounded-xl
          border
          px-5
          py-3
          "

        />





        <select

          value={filterStatus}

          onChange={
            e=>setFilterStatus(e.target.value)
          }

          className="
          rounded-xl
          border
          px-5
          py-3
          "

        >

          <option value="All">
            All
          </option>

          <option value="Operational">
            Operational
          </option>

          <option value="Maintenance Due">
            Maintenance Due
          </option>

          <option value="Faulty">
            Faulty
          </option>

        </select>


      </div>









      {
        showForm && isAdmin && (

          <div className="
          rounded-xl
          bg-white
          p-6
          shadow
          ">


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

        onEdit={handleEditAsset}

        onDelete={handleDeleteAsset}

        isAdmin={isAdmin}

      />



    </div>

  );

}



export default AssetRegistry;