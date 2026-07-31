import AssetTable from "../cards/AssetTable";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";


function AssetRegistry() {

  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);


  const isAdmin = user?.role?.toLowerCase() === "admin";


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



      {/* Actions */}

      <div className="flex items-center gap-8">


        {
          isAdmin && (

            <button
              onClick={() => setShowForm(!showForm)}
              className="
                rounded-xl
                bg-black
                px-6
                py-3
                text-white
                transition
                hover:bg-violet-700
              "
            >
              + Add Asset
            </button>

          )
        }


        <input
          type="text"
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


        <button
          className="
            rounded-xl
            bg-black
            px-6
            py-3
            text-white
            transition
            hover:bg-violet-700
          "
        >
          Filter ▼
        </button>


      </div>



      {/* Add Asset Form */}

      {
        showForm && isAdmin && (

          <div className="rounded-xl bg-white p-6 shadow">


            <h2 className="mb-6 text-xl font-bold">
              Add New Asset
            </h2>



            <div className="grid grid-cols-2 gap-5">


              <input
                type="text"
                placeholder="Asset Name"
                className="rounded-lg border p-3"
              />


              <input
                type="text"
                placeholder="Asset Type"
                className="rounded-lg border p-3"
              />


              <input
                type="text"
                placeholder="Location"
                className="rounded-lg border p-3"
              />


              <input
                type="text"
                placeholder="Serial Number"
                className="rounded-lg border p-3"
              />


              <input
                type="text"
                placeholder="Status"
                className="rounded-lg border p-3"
              />


              <input
                type="text"
                placeholder="Assigned Technician"
                className="rounded-lg border p-3"
              />


            </div>



            <button
              className="
                mt-6
                rounded-xl
                bg-violet-600
                px-6
                py-3
                text-white
                hover:bg-violet-700
              "
            >
              Save Asset
            </button>


          </div>

        )
      }




      {/* Asset Table */}

      <AssetTable />




      {/* Quick Stats */}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">


        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Active Incidents
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            8
          </h2>

          <p className="text-red-500">
            3 Critical Faults
          </p>

        </div>



        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Total Assets
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            56
          </h2>

        </div>




        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Maintenance Due
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            5
          </h2>

        </div>




        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            System Status
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            Operational
          </h2>

        </div>


      </div>


    </div>
  );
}


export default AssetRegistry;