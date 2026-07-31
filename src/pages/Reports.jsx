function Reports() {

  return (
    <div className="space-y-10">


      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-600">
          Analyze technical performance and operational trends.
        </p>
      </div>




      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">


        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Total Faults
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            42
          </h2>
        </div>



        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Downtime
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            6.5 hrs
          </h2>
        </div>



        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Resolved
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            38
          </h2>
        </div>



        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            4
          </h2>
        </div>



        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Maintenance Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            24
          </h2>
        </div>


      </div>





      {/* Severity Breakdown */}

      <div className="rounded-xl bg-white p-6 shadow w-fit">

        <h2 className="mb-6 text-2xl font-bold">
          Fault Severity
        </h2>


        <div className="space-y-5">


          <div className="flex items-center justify-between gap-20 text-xl font-bold">
            <span>
              🔴 Critical
            </span>

            <span>
              8
            </span>
          </div>



          <div className="flex items-center justify-between gap-20 text-xl font-bold">
            <span>
              🟡 Medium
            </span>

            <span>
              15
            </span>
          </div>



          <div className="flex items-center justify-between gap-20 text-xl font-bold">
            <span>
              🟢 Low
            </span>

            <span>
              19
            </span>
          </div>


        </div>


      </div>





      {/* Export Section */}

      <div className="rounded-xl bg-white p-8 shadow w-fit">


        <h2 className="mb-6 text-2xl font-bold">
          Export Reports
        </h2>


        <div className="flex gap-6">


          <button
            className="
              rounded-xl
              bg-black
              px-6
              py-3
              font-bold
              text-white
              transition
              hover:bg-violet-700
            "
          >
            Export PDF
          </button>



          <button
            className="
              rounded-xl
              bg-black
              px-6
              py-3
              font-bold
              text-white
              transition
              hover:bg-violet-700
            "
          >
            Export Excel
          </button>


        </div>


      </div>


    </div>
  );
}


export default Reports;