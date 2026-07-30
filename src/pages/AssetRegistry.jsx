import AssetTable from "../cards/AssetTable";
import { useNavigate } from "react-router-dom";

function AssetRegistry() {

  const navigate = useNavigate();

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

        <button
          onClick={() => navigate("/maintenance")}
          className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-violet-700"
        >
          + Schedule Maintenance
        </button>

        <input
          type="text"
          placeholder="Search assets..."
          className="rounded-xl bg-black px-6 py-3 text-white placeholder:text-gray-300"
        />

        <button
          className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-violet-700"
        >
          Filter ▼
        </button>

      </div>

      {/* Asset Table */}

      <AssetTable />

      {/* Quick Stats */}

      <div className="grid grid-cols-4 gap-6">

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