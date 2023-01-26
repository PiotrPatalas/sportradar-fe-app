export const DropDownComponent = ({ seasons, setSelectedSeason, selectedSeason }) => {
  console.log("SEZONY", seasons);
    return (
    <div className="select-season">
      <select value={selectedSeason} onChange = {(event) => setSelectedSeason(event.target.value)}>
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.name}
          </option>
        ))}
      </select>
    </div>
  );
};


