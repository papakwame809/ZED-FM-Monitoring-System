import SummaryCard from "./SummaryCard";
import summaryData from "../data/summary";


function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4">

      {summaryData.map((card) => (
        <SummaryCard
          key={card.id}
          title={card.title}
          value={card.value}
          status={card.status}
        />
      ))}

    </div>
  );
}

export default SummaryCards;