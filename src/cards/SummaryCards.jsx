import SummaryCard from "./SummaryCard";


function SummaryCards({
  activeIncidents,
  totalAssets,
  maintenanceDue,
  systemStatus,
}) {


  const summaryData = [

    {
      id: 1,
      title: "Active Incidents",
      value: activeIncidents,
      status: "3 Critical Faults",
    },


    {
      id: 2,
      title: "Total Assets",
      value: totalAssets,
      status: "Registered Equipment",
    },


    {
      id: 3,
      title: "Maintenance Due",
      value: maintenanceDue,
      status: "Requires Attention",
    },


    {
      id: 4,
      title: "System Status",
      value: systemStatus,
      status: systemStatus === "Operational"
        ? "All systems running"
        : "Check equipment",
    },

  ];



  return (

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {
        summaryData.map((card)=>(

          <SummaryCard

            key={card.id}

            title={card.title}

            value={card.value}

            status={card.status}

          />

        ))
      }


    </div>

  );

}


export default SummaryCards;