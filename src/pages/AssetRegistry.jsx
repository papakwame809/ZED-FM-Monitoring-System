import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AssetTable from "../cards/AssetTable";

import {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../api/assetsApi";

import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";


const emptyForm = {
  name: "",
  type: "",
  location: "",
  serialNumber: "",
  status: "",
  purchaseDate: "",
  lastService: "",
  warranty: "",
};



function AssetRegistry(){

  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useAuth();


  const isAdmin = hasRole(
    user,
    ROLES.ADMIN
  );


  const [assets,setAssets] = useState([]);

  const [loading,setLoading] = useState(true);

  const [saving,setSaving] = useState(false);

  const [error,setError] = useState("");

  const [formData,setFormData] = useState(emptyForm);

  const [editingAsset,setEditingAsset] = useState(null);

  const [showForm,setShowForm] = useState(false);

  const [searchTerm,setSearchTerm] = useState("");

  const [filterStatus,setFilterStatus] = useState("All");





  useEffect(()=>{

    async function load(){

      try{

        const data = await getAssets();

        setAssets(data);

      }

      catch(err){

        console.error(err);

        setError("Failed to load assets");

      }

      finally{

        setLoading(false);

      }

    }


    load();

  },[]);






  useEffect(()=>{

    if(!id) return;


    async function loadSingle(){

      try{

        const asset = await getAsset(id);


        setEditingAsset(asset);


        setFormData({

          name: asset.name ?? "",
          type: asset.type ?? "",
          location: asset.location ?? "",
          serialNumber: asset.serialNumber ?? "",
          status: asset.status ?? "",
          purchaseDate: asset.purchaseDate ?? "",
          lastService: asset.lastService ?? "",
          warranty: asset.warranty ?? "",

        });


        setShowForm(true);


      }

      catch(err){

        console.error(err);

        navigate("/assets");

      }

    }


    loadSingle();


  },[id,navigate]);








  function handleChange(e){

    const {name,value} = e.target;


    setFormData(prev=>({

      ...prev,

      [name]:value

    }));

  }








  function resetForm(){

    setFormData(emptyForm);

    setEditingAsset(null);

    setShowForm(false);

  }









  async function handleSaveAsset(){

    setSaving(true);


    try{


      console.log(
        "FORM DATA:",
        formData
      );



      let result;



      if(editingAsset){


        result = await updateAsset(
          editingAsset.id,
          formData
        );


        setAssets(prev=>

          prev.map(asset=>

            asset.id === result.id
            ?
            result
            :
            asset

          )

        );


      }


      else{


        result = await createAsset(
          formData
        );


        setAssets(prev=>[

          ...prev,

          result

        ]);


      }



      resetForm();


      navigate("/assets");


    }


    catch(err){

      console.error(
        "SAVE ERROR:",
        err
      );

    }


    finally{

      setSaving(false);

    }


  }










  async function handleDeleteAsset(id){


    if(!window.confirm(
      "Delete this asset?"
    ))
    return;



    try{


      await deleteAsset(id);


      setAssets(prev=>

        prev.filter(
          asset=>asset.id !== id
        )

      );


    }

    catch(err){

      console.error(err);

    }

  }








  function handleEditAsset(asset){

    navigate(
      `/assets/${asset.id}/edit`
    );

  }








  const filteredAssets = useMemo(()=>{


    return assets.filter(asset=>{


      const search =

        asset.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );



      const status =

        filterStatus === "All"

        ||

        asset.status === filterStatus;



      return search && status;


    });


  },[
    assets,
    searchTerm,
    filterStatus
  ]);







  if(loading)
    return <p>Loading assets...</p>;


  if(error)
    return <p>{error}</p>;








  return (

    <div className="space-y-10">


      <div>

        <h1 className="text-3xl font-bold">

          {id ? "Edit Asset" : "Asset Registry"}

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






      <div className="flex gap-5">

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

          <option>All</option>

          <option>Operational</option>

          <option>Maintenance Due</option>

          <option>Faulty</option>

        </select>


      </div>






      {
        showForm && (

          <div className="
          rounded-xl
          bg-white
          p-6
          shadow
          ">


          <h2 className="text-xl font-bold mb-5">

            {
              editingAsset
              ?
              "Update Asset"
              :
              "Add Asset"
            }

          </h2>



          <div className="grid grid-cols-2 gap-5">


          {
            Object.keys(emptyForm).map(field=>(

              <input

                key={field}

                name={field}

                value={
                  formData[field] ?? ""
                }

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

            disabled={saving}

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
              saving
              ?
              "Saving..."
              :
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