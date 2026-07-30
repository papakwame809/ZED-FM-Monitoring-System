import equipment from "../data/equipment";


function EquipmentStatus() {
  return (
    <section className="mt-8">

      <h2 className="mb-4 text-2xl font-bold">
        Equipment Status
      </h2>


      <div className="grid grid-cols-4 gap-4">

        {equipment.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border bg-white p-4 text-center"
          >

            <h3 className="font-medium">
              {item.name}
            </h3>

            <p className="mt-2 text-sm">
              {item.indicator} {item.status}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default EquipmentStatus;