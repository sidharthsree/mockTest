import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchCovidData } from "./store/covidSlice";
import StateSelector from "./components/StateSelector";
import StatisticsCards from "./components/StatisticsCard";
import CovidMap from "./components/CovidMap";
import { PieChart, LineChart } from "./components/Charts";
import { ActivitySquare } from "lucide-react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state?.covid);

  useEffect(() => {
    dispatch(fetchCovidData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <ActivitySquare className="loading-icon" />
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <ActivitySquare className="header-icon" />
          <h1 className="header-title">India COVID-19 Dashboard</h1>
        </div>
        <StateSelector />
      </header>

      <main className="main-content">
        <StatisticsCards />

        <section className="chart-section">
          <h2 className="section-title">Cases Distribution</h2>
          <PieChart />
        </section>

        <section className="map-section">
          <h2 className="section-title">Cases Map View</h2>
          <CovidMap />
        </section>

        <section className="chart-section">
          <h2 className="section-title">Timeline Analysis</h2>
          <LineChart />
        </section>
      </main>
    </div>
  );
}

export default App;
