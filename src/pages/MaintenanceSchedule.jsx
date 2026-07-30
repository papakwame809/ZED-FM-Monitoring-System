function MaintenanceSchedule() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Maintenance Schedule
        </h1>

        <p className="text-gray-600">
          Plan, track and manage technical maintenance activities.
        </p>
      </div>


      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-gray-500">
          No maintenance schedules available.
        </p>
      </div>

    </div>
  );
}

export default MaintenanceSchedule;