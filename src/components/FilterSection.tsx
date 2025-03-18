const FilterSection = ({
  province, setProvince,
  district, setDistrict,
  ics, setIcs,
  provinces, districts, icsList
}: FilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
      {/* Province Dropdown */}
      <select
        className="p-2 border rounded-md text-sm w-full sm:w-auto"
        value={province}
        onChange={(e) => {
          setProvince(e.target.value);
          setDistrict("all");
          setIcs("all");
        }}
      >
        <option value="">Select Province</option>
        {provinces.map((prov) => (
          <option key={prov.id} value={prov.id}>
            {prov.name}
          </option>
        ))}
      </select>

      {/* District Dropdown */}
      <select
        className="p-2 border rounded-md text-sm w-full sm:w-auto"
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
          setIcs("all");
        }}
        disabled={!province}
      >
        <option value="all">All Districts</option>
        {districts.map((dist) => (
          <option key={dist.id} value={dist.id}>
            {dist.name}
          </option>
        ))}
      </select>

      {/* ICS Dropdown */}
      <select
        className="p-2 border rounded-md text-sm w-full sm:w-[400px]"
        value={ics}
        onChange={(e) => setIcs(e.target.value)}
        disabled={!district || district === "all"}
      >
        <option value="all">All ICS</option>
        {icsList.map((ics) => (
          <option key={ics.id} value={ics.id}>
            {ics.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;