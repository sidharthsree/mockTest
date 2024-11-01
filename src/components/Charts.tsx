import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Plot from "react-plotly.js";

export const PieChart: React.FC = () => {
  const { countryData, data, selectedState } = useSelector(
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

  return (
    <div className="chart-container pie-chart-container">
      <Plot
        data={[
          {
            values: [
              stats?.activeCases ?? 0,
              stats?.recovered ?? 0,
              stats?.deaths ?? 0,
            ],
            labels: ["Active Cases", "Recovered", "Deaths"],
            type: "pie",
            marker: {
              colors: ["#EAB308", "#22C55E", "#EF4444"],
            },
          },
        ]}
        layout={{
          height: 400,
          margin: { t: 0, b: 0, l: 0, r: 0 },
          showlegend: true,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export const LineChart: React.FC = () => {
  const { countryData, data, selectedState } = useSelector(
    (state: RootState) => state?.covid
  );
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const selectedData = (selectedState === "All States"
    ? countryData
    : data?.find((state) => state?.state === selectedState)) || {
    totalCases: 0,
    activeCases: 0,
    recovered: 0,
    deaths: 0,
  };

  const generateTimelineData = (baseValue: number) => {
    return dates?.map(() => baseValue * (0.9 + Math.random() * 0.2));
  };

  return (
    <div className="chart-container line-chart-container">
      <Plot
        data={[
          {
            x: dates,
            y: generateTimelineData(selectedData?.totalCases),
            type: "scatter",
            mode: "lines+markers",
            name: "Total Cases",
            line: { color: "#3B82F6" },
          },
          {
            x: dates,
            y: generateTimelineData(selectedData?.activeCases),
            type: "scatter",
            mode: "lines+markers",
            name: "Active Cases",
            line: { color: "#EAB308" },
          },
          {
            x: dates,
            y: generateTimelineData(selectedData?.recovered),
            type: "scatter",
            mode: "lines+markers",
            name: "Recovered",
            line: { color: "#22C55E" },
          },
          {
            x: dates,
            y: generateTimelineData(selectedData?.deaths),
            type: "scatter",
            mode: "lines+markers",
            name: "Deaths",
            line: { color: "#EF4444" },
          },
        ]}
        layout={{
          height: 400,
          margin: { t: 20, b: 40, l: 60, r: 20 },
          showlegend: true,
          xaxis: { title: "Date" },
          yaxis: { title: "Cases" },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};
