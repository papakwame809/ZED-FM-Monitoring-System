import { Link } from "react-router-dom";
import assets from "../data/assets";

function statusColor(status) {
  switch (status) {
    case "Operational":
      return "text-green-600";

    case "Maintenance Due":
      return "text-yellow-600";

    case "Faulty":
      return "text-red-600";

    default:
      return "text-gray-600";
  }
}

function AssetTable() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="border-b bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">Asset</th>

            <th className="px-6 py-4 text-left">Type</th>

            <th className="px-6 py-4 text-left">Location</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Last Service</th>

            <th className="px-6 py-4 text-left">Warranty</th>

          </tr>

        </thead>

        <tbody>

          {assets.map((asset) => (

            <tr
              key={asset.id}
              className="border-b transition hover:bg-gray-50"
            >

              <td className="px-6 py-4">

                <Link
                  to={`/assets/${asset.id}`}
                  className="font-medium text-violet-600 hover:underline"
                >
                  {asset.name}
                </Link>

              </td>

              <td className="px-6 py-4">
                {asset.type}
              </td>

              <td className="px-6 py-4">
                {asset.location}
              </td>

              <td
                className={`px-6 py-4 font-medium ${statusColor(
                  asset.status
                )}`}
              >
                {asset.status}
              </td>

              <td className="px-6 py-4">
                {asset.lastService}
              </td>

              <td className="px-6 py-4">
                {asset.warranty}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AssetTable;