// src/components/SummaryCards.jsx
export default function SummaryCards() {
    const cards = [
      { title: "Total Companies", value: "45", color: "bg-blue-500" },
      { title: "Market Cap", value: "2.3 Trillion USD", color: "bg-green-500" },
      { title: "Tasks Completed", value: "145", color: "bg-orange-500" },
      { title: "Downloads", value: "12,450", color: "bg-purple-500" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md text-white ${card.color}`}
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    );
  }
  