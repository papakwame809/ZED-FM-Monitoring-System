import { Link, useParams } from "react-router-dom";
import assets from "../data/assets";
import { ArrowLeft } from "lucide-react";

function AssetDetails() {
  const { id } = useParams();

  const asset = assets.find((item) => item.id === id);

  if (!asset) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Asset not found
        </h1>

        <Link
          to="/assets"
          className="text-violet-600 hover:underline"
        >
          Back to Asset Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Back Button */}

      <Link
        to="/assets"
        className="inline-flex items-center gap-2 text-violet-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Assets
      </Link>

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Asset Details
        </h1>

        <p className="text-gray-600">
          View asset information, maintenance history and related incidents.
        </p>

      </div>

      {/* Asset Information */}

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Asset Information
        </h2>

        <div className="grid grid-cols-2 gap-y-6">

          <Info label="Asset Name" value={asset.name} />

          <Info label="Asset Type" value={asset.type} />

          <Info label="Serial Number" value={asset.serialNumber} />

          <Info label="Location" value={asset.location} />

          <Info label="Status" value={asset.status} />

          <Info label="Purchase Date" value={asset.purchaseDate} />

          <Info label="Warranty Expiry" value={asset.warranty} />

        </div>

      </div>

      {/* Maintenance */}

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Maintenance History
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Date
              </th>

              <th className="py-3 text-left">
                Maintenance
              </th>

              <th className="py-3 text-left">
                Technician
              </th>

              <th className="py-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {asset.maintenance.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500"
                >
                  No maintenance history.
                </td>

              </tr>

            ) : (

              asset.maintenance.map((job, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {job.date}
                  </td>

                  <td className="py-4">
                    {job.task}
                  </td>

                  <td className="py-4">
                    {job.technician}
                  </td>

                  <td className="py-4">
                    {job.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Incidents */}

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Related Incidents
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Incident ID
              </th>

              <th className="py-3 text-left">
                Title
              </th>

              <th className="py-3 text-left">
                Severity
              </th>

              <th className="py-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {asset.incidents.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500"
                >
                  No related incidents.
                </td>

              </tr>

            ) : (

              asset.incidents.map((incident) => (

                <tr
                  key={incident.id}
                  className="border-b"
                >

                  <td className="py-4">
                    {incident.id}
                  </td>

                  <td className="py-4">
                    {incident.title}
                  </td>

                  <td className="py-4">
                    {incident.severity}
                  </td>

                  <td className="py-4">
                    {incident.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Buttons */}

      <div className="flex gap-6">

        <button className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-violet-700">
          Edit Asset
        </button>

        <button className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-violet-700">
          Schedule Maintenance
        </button>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-medium">
        {value}
      </p>

    </div>
  );
}

export default AssetDetails;