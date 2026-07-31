import MaintenanceTable from "../cards/MaintenanceTable";

function MaintenanceSchedule() {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Maintenance Schedule
        </h1>

        <p className="text-gray-600">
          Track scheduled maintenance across all technical assets.
        </p>

      </div>

      {/* Actions */}

      <div className="flex flex-wrap items-center gap-6">

        <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700">

          + Schedule Maintenance

        </button>

        <input
          type="text"
          placeholder="Search maintenance..."
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm focus:border-violet-500 focus:outline-none"
        />

        <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700">

          Status ▼

        </button>

        <button className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700">

          Technician ▼

        </button>

      </div>

      {/* Table */}

      <MaintenanceTable />

    </div>
  );
}

export default MaintenanceSchedule;