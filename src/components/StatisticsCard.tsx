import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ActivitySquare, Users, Heart, Skull } from "lucide-react";

const StatisticsCards: React.FC = () => {
  const { data, countryData, selectedState } = useSelector(
    (state: RootState) => state?.covid
  );
  const filteredData = data?.filter((state) => state?.state === selectedState);
  const stats =
    selectedState === "All States"
      ? countryData
      : filteredData?.length
      ? filteredData[0]
      : {
          totalCases: 0,
          activeCases: 0,
          recovered: 0,
          deaths: 0,
        };
  const cards = [
    {
      title: "Total Cases",
      value: stats?.totalCases,
      Icon: ActivitySquare,
      color: "#3B82F6",
    },
    {
      title: "Active Cases",
      value: stats?.activeCases,
      Icon: Users,
      color: "#EAB308",
    },
    {
      title: "Recovered",
      value: stats?.recovered,
      Icon: Heart,
      color: "#10B981",
    },
    {
      title: "Deaths",
      value: stats?.deaths,
      Icon: Skull,
      color: "#EF4444",
    },
  ];

  return (
    <div className="statistics-cards">
      {cards.map(({ title, value, Icon, color }) => (
        <div key={title} className="statistics-card" style={{ borderLeftColor: color }}>
          <div className="icon-container" style={{ color }}>
            <Icon className="icon" />
          </div>
          <div className="card-content">
            <p className="card-title">{title}</p>
            <p className="card-value">{value?.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
