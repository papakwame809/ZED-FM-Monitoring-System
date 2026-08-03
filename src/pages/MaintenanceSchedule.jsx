import MaintenanceTable from "../cards/MaintenanceTable";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { ROLES, hasRole } from "../auth/roles";


function MaintenanceSchedule() {


  const { user } = useAuth();

  const isAdmin = hasRole(user, ROLES.ADMIN);



  const emptyForm = {

    asset: "",
    type: "",
    technician: "",
    date: "",
    status: "",
    notes: "",

  };



  const [maintenance, setMaintenance] = useState([

    {
      id: 1,
      asset: "Main Transmitter",
      type: "Routine Inspection",
      technician: "Ama",
      date: "August 20 2026",
      status: "Scheduled",
      notes: "Routine inspection",
    },


    {
      id: 2,
      asset: "Broadcast Console",
      type: "Firmware Update",
      technician: "Kwame",
      date: "September 5 2026",
      status: "Completed",
      notes: "Firmware update",
    },


  ]);




  const [formData,setFormData] = useState(emptyForm);

  const [showForm,setShowForm] = useState(false);

  const [editingMaintenance,setEditingMaintenance] = useState(null);



  const [searchTerm,setSearchTerm] = useState("");

  const [statusFilter,setStatusFilter] = useState("All");

  const [technicianFilter,setTechnicianFilter] = useState("All");





  function handleChange(e){

    setFormData({

      ...formData,

      [e.target.name]:e.target.value,

    });

  }






  function handleSaveMaintenance(){


    if(editingMaintenance){


      setMaintenance((prev)=>

        prev.map((item)=>

          item.id === editingMaintenance.id

          ?

          {
            ...item,
            ...formData,
          }

          :

          item

        )

      );


    }

    else{


      setMaintenance((prev)=>[

        ...prev,

        {
          id:Date.now(),
          ...formData,
        }

      ]);


    }



    resetForm();

  }







  function handleEditMaintenance(item){


    setEditingMaintenance(item);


    setFormData({

      asset:item.asset,

      type:item.type,

      technician:item.technician,

      date:item.date,

      status:item.status,

      notes:item.notes,

    });


    setShowForm(true);


  }








  function handleDeleteMaintenance(id){


    const confirmed = window.confirm(
      "Delete this maintenance record?"
    );


    if(!confirmed) return;



    setMaintenance((prev)=>

      prev.filter(
        item=>item.id !== id
      )

    );


  }







  function resetForm(){

    setFormData(emptyForm);

    setEditingMaintenance(null);

    setShowForm(false);

  }








  const technicians = [

    "All",

    ...new Set(
      maintenance.map(
        item=>item.technician
      )
    )

  ];







  const filteredMaintenance = maintenance.filter((item)=>{


    const matchesSearch =

      item.asset
      .toLowerCase()
      .includes(searchTerm.toLowerCase());



    const matchesStatus =

      statusFilter === "All" ||

      item.status === statusFilter;



    const matchesTechnician =

      technicianFilter === "All" ||

      item.technician === technicianFilter;



    return (

      matchesSearch &&

      matchesStatus &&

      matchesTechnician

    );


  });







  return (

    <div className="space-y-10">


      <div>

        <h1 className="text-3xl font-bold">
          Maintenance Schedule
        </h1>


        <p className="text-gray-600">
          Track scheduled maintenance across all technical assets.
        </p>


      </div>







      <div className="flex flex-wrap items-center gap-6">


        {
          isAdmin && (

            <button

              onClick={()=>{

                setEditingMaintenance(null);

                setFormData(emptyForm);

                setShowForm(!showForm);

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

              + Schedule Maintenance

            </button>

          )

        }







        <input

          type="text"

          placeholder="Search maintenance..."

          value={searchTerm}

          onChange={(e)=>setSearchTerm(e.target.value)}

          className="
          rounded-xl
          border
          px-6
          py-3
          "

        />







        <select

          value={statusFilter}

          onChange={(e)=>setStatusFilter(e.target.value)}

          className="rounded-xl border px-6 py-3"

        >

          <option>All</option>

          <option>Scheduled</option>

          <option>Completed</option>

          <option>Pending</option>

        </select>







        <select

          value={technicianFilter}

          onChange={(e)=>setTechnicianFilter(e.target.value)}

          className="rounded-xl border px-6 py-3"

        >

          {
            technicians.map((tech)=>(

              <option key={tech}>
                {tech}
              </option>

            ))
          }


        </select>




      </div>









      {
        showForm && isAdmin && (

          <div className="rounded-xl bg-white p-6 shadow">


            <h2 className="mb-6 text-xl font-bold">

              {
                editingMaintenance
                ?
                "Edit Maintenance"
                :
                "Schedule Maintenance"
              }

            </h2>





            <div className="grid grid-cols-2 gap-5">


              {
                Object.keys(formData).map((field)=>(


                  <input

                    key={field}

                    name={field}

                    value={formData[field]}

                    onChange={handleChange}

                    placeholder={field}

                    className="rounded-lg border p-3"

                  />


                ))

              }


            </div>





            <button

              onClick={handleSaveMaintenance}

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
                editingMaintenance
                ?
                "Update Maintenance"
                :
                "Save Maintenance"
              }

            </button>



          </div>

        )

      }







      <MaintenanceTable

        maintenance={filteredMaintenance}

        onEdit={handleEditMaintenance}

        onDelete={handleDeleteMaintenance}

        isAdmin={isAdmin}

      />




    </div>

  );

}


export default MaintenanceSchedule;