import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { DropDownComponent } from "./DropDownComponent";

console.log(process.env.REACT_APP_API_KEY)


function TableComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("sr:season:77453");
  const API_KEY = process.env.REACT_APP_API_KEY;


  const columns = [
    {
      name: "Home Team",
      selector: (row) => row.sport_event.competitors[0].name,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.sport_event_status.winner_id ===
            row.sport_event.competitors[0].id,
          style: {
            backgroundColor: "rgba(63, 195, 128, 0.9)",
            color: "white",
          },
        },
        {
          when: (row) =>
            row.sport_event_status.winner_id !==
            row.sport_event.competitors[0].id,
          style: {
            backgroundColor: "rgba(255, 99, 132, 0.9)",
            color: "white",
          },
        },
        {
          when: (row) => row.sport_event_status.match_tie === true,
          style: {
            backgroundColor: "rgba(255, 206, 86, 0.9)",
            color: "white",
          },
        },
      ],
    },
    {
      name: "Away Team",
      selector: (row) => row.sport_event.competitors[1].name,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.sport_event_status.winner_id ===
            row.sport_event.competitors[1].id,
          style: {
            backgroundColor: "rgba(63, 195, 128, 0.9)",
            color: "white",
          },
        },
        {
          when: (row) =>
            row.sport_event_status.winner_id !==
            row.sport_event.competitors[1].id,
          style: {
            backgroundColor: "rgba(255, 99, 132, 0.9)",
            color: "white",
          },
        },
        {
          when: (row) => row.sport_event_status.match_tie === true,
          style: {
            backgroundColor: "rgba(255, 206, 86, 0.9)",
            color: "white",
          },
        },
      ],
    },
    {
      name: "Score",
      selector: (row) =>
        row.sport_event_status.home_score +
        " : " +
        row.sport_event_status.away_score,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.sport_event.start_time,
      sortable: true,
    },
    {
      name: "Half time score",
      selector: (row) =>
        row.sport_event.period_scores
          ? row.sport_event_status.period_scores[0].home_score +
            " : " +
            row.sport_event_status.period_scores[0].away_score
          : "No data",
      sortable: true,
    },
    {
      name: "Stadium name",
      selector: (row) => row.sport_event.venue.name,
      sortable: true,
    },
  ];

  async function getSeasons() {
    setLoading(true);
    const URL =
      `https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=${API_KEY}`;
    const response = await fetch(URL);
    const seasons = await response.json();
    console.log(seasons);
    console.log("console log SEZONY", seasons);
    setSeasons(seasons.seasons);
    setLoading(false);
  }
  // useEffect(() => {
  //   fetchResponse();
  // }, []);

  async function getMatches() {
    setLoading(true);
    const URL =
      `https://api.sportradar.us/soccer/trial/v4/en/seasons/${selectedSeason}/schedules.json?api_key=${API_KEY}`;
    const response = await fetch(URL);
    const teams = await response.json();
    console.log(teams);
    console.log(teams.schedules);
    setData(teams.schedules);
    setLoading(false);
  }

  useEffect(() => {
    getSeasons();
  }, []);

  useEffect(() => {
    getMatches();
  }, [selectedSeason]);


  if (loading) {
    return <div>Loading...</div>;
  }


  console.log(selectedSeason);


  return (
    <div>
      <DropDownComponent seasons={seasons} setSelectedSeason = {setSelectedSeason} selectedSeason = {selectedSeason} />
      {data && data.length > 0 ?  
      <DataTable
        title="Soccer matches"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
      /> : null}
    </div>
  );
}

export default TableComponent;
