function IncidentForm() {
  return (
    <div className="rounded-xl border border-gray-300 bg-white p-8">

      {/* Form title */}
      <h2 className="mb-8 text-xl font-semibold">
        Report Incident
      </h2>


      <form className="flex flex-col gap-5">


        {/* Incident Title */}
        <div className="flex flex-col gap-2">

          <label className="text-base font-bold">
            Incident Title
          </label>

          <input
            type="text"
            placeholder="Enter incident title..."
            className="h-10 rounded-xl border border-gray-400 px-4 text-sm outline-none"
          />

        </div>



        {/* Category */}
        <div className="flex flex-col gap-2">

          <label className="text-base font-bold">
            Category
          </label>

          <select
            className="h-10 rounded-xl border border-gray-400 px-4 text-sm outline-none"
          >
            <option>
              Power
            </option>

            <option>
              Audio
            </option>

            <option>
              Visual
            </option>

            <option>
              Software
            </option>

          </select>

        </div>



        {/* Severity */}
        <div className="flex flex-col gap-2">

          <label className="text-base font-bold">
            Severity
          </label>

          <select
            className="h-10 rounded-xl border border-gray-400 px-4 text-sm outline-none"
          >

            <option>
              Critical
            </option>

            <option>
              High
            </option>

            <option>
              Medium
            </option>

            <option>
              Low
            </option>

          </select>

        </div>



        {/* Technician */}
        <div className="flex flex-col gap-2">

          <label className="text-base font-bold">
            Select Technician
          </label>

          <select
            className="h-10 rounded-xl border border-gray-400 px-4 text-sm outline-none"
          >

            <option>
              Ama
            </option>

            <option>
              Kwame
            </option>

            <option>
              Sara
            </option>

          </select>

        </div>



        {/* Description */}
        <div className="flex flex-col gap-2">

          <label className="text-base font-bold">
            Description
          </label>


          <textarea
            rows="4"
            placeholder="Describe the incident, what happened, and my observations..."
            className="rounded-xl border border-gray-400 p-4 text-sm outline-none"
          />

        </div>



        {/* Attachment */}
        <div className="flex flex-col gap-3">

          <label className="text-base font-bold">
            Attachment
          </label>


          <button
            type="button"
            className="w-fit rounded-xl bg-black px-5 py-2 text-sm font-bold text-white"
          >
            Upload File 📎
          </button>

        </div>



        {/* Buttons */}
        <div className="mt-4 flex gap-24">

          <button
            type="button"
            className="rounded-xl bg-black px-8 py-2 text-base font-bold text-white"
          >
            Cancel
          </button>


          <button
            type="submit"
            className="rounded-xl bg-black px-8 py-2 text-base font-bold text-white"
          >
            Submit Incident
          </button>

        </div>


      </form>

    </div>
  );
}


export default IncidentForm;