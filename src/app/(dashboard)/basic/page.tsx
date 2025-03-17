"use client";

import { useState } from "react";
import CountCard from "@/components/CountCard";

const DashboardBasicPage = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ics, setIcs] = useState("");

  return (
    <div className="w-full p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap justify-end gap-4 mb-4">
        <select
          className="p-2 border rounded-md text-sm"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option value="">Select Province</option>
          <option value="province1">Province 1</option>
          <option value="province2">Province 2</option>
        </select>

        <select
          className="p-2 border rounded-md text-sm"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          <option value="district1">District 1</option>
          <option value="district2">District 2</option>
        </select>

        <select
          className="p-2 border rounded-md text-sm"
          value={ics}
          onChange={(e) => setIcs(e.target.value)}
        >
          <option value="">Select ICS</option>
          <option value="ics1">ICS 1</option>
          <option value="ics2">ICS 2</option>
        </select>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <CountCard caption="Farmers" count={10} iconSrc="/master-farmer.png" />
        <CountCard caption="Plots" count={10} iconSrc="/master-plot.png" />
        <CountCard caption="Trained Farmers" count={10} iconSrc="/trained-farmer.png" />
        <CountCard caption="ICS" count={10} iconSrc="/master-ics.png" />
      </div>
    </div>
  );
};

export default DashboardBasicPage;