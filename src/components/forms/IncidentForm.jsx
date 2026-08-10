function IncidentForm({
  incident = {},
  setIncident,
  onSubmit,
  loading = false,
  assets = [],
  isEditing = false,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setIncident((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      {/* Asset Selection Dropdown */}
      <div className="flex flex-col gap-2">
        <label htmlFor="assetId" className="text-sm font-bold text-gray-800">
          Select Asset <span className="text-red-500">*</span>
        </label>

        <select
          id="assetId"
          name="assetId"
          value={incident.assetId || ""}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
        >
          <option value="">-- Select Asset --</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} {asset.location ? `(${asset.location})` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Incident Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-bold text-gray-800">
          Incident Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={incident.title || ""}
          onChange={handleChange}
          placeholder="e.g. Transmitter Power Loss"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
        />
      </div>

      {/* Severity & Status Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="severity" className="text-sm font-bold text-gray-800">
            Severity <span className="text-red-500">*</span>
          </label>
          <select
            id="severity"
            name="severity"
            value={incident.severity || ""}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-bold text-gray-800">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={incident.status || "Open"}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Technician & Incident Date Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="technician" className="text-sm font-bold text-gray-800">
            Assigned Technician
          </label>
          <input
            type="text"
            id="technician"
            name="technician"
            value={incident.technician || ""}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="incidentDate" className="text-sm font-bold text-gray-800">
            Incident Date
          </label>
          <input
            type="date"
            id="incidentDate"
            name="incidentDate"
            value={incident.incidentDate || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-bold text-gray-800">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={incident.description || ""}
          onChange={handleChange}
          placeholder="Detailed explanation of the technical issue..."
          className="w-full rounded-xl border border-gray-300 p-4 text-sm outline-none transition focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditing
          ? "Update Incident Report"
          : "Submit Incident Report"}
      </button>
    </form>
  );
}

export default IncidentForm;