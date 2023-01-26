import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function TableComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: 'Home Team',
      selector: row => row.sport_event.competitors[0].name + " - " + row.sport_event.competitors[1].name,
      sortable: true,
    },
    {
      name: 'Away Team',
      selector: row => row.sport_event_status.home_score + " : " + row.sport_event_status.away_score,
      sortable: true,
    },
  ];

  useEffect(() => {
    fetchResponse();
  }, []);

  async function fetchResponse() {
    setLoading(true);
    const URL =
      "https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=6g8xr7frzche3dwvd69a2mef";
    const response = await fetch(URL);
    const teams = await response.json();
    console.log(teams);
    console.log(teams.schedules);
    setData(teams.schedules);
    setLoading(false);
  }

  return (
    <div>
      <DataTable
        title="Soccer matches"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
      />
    </div>
  );
}

export default TableComponent;