function SummaryCard({ title, value, status }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">

      <h3 className="text-sm font-medium text-gray-700">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      {status && (
        <p className="mt-2 text-sm font-bold text-red-500">
          {status}
        </p>
      )}

    </div>
  );
}

export default SummaryCard;