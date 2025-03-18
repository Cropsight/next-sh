"use client";

import { useState, useEffect } from "react";
import CountCard from "@/components/CountCard";

interface Province {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface ICS {
  id: string;
  name: string;
}

const DashboardBasicPage = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("all"); // Default: All Districts
  const [ics, setIcs] = useState("all"); // Default: All ICS

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [icsList, setIcsList] = useState<ICS[]>([]);

  // Fetch Provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch("/api/region/province");
        if (!res.ok) throw new Error("Failed to fetch provinces");
        const data: Province[] = await res.json();
        setProvinces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch Districts when Province changes
  useEffect(() => {
    if (!province) {
      setDistricts([]);
      setDistrict("all"); // Reset ke All Districts
      setIcsList([]);
      setIcs("all"); // Reset ke All ICS
      return;
    }

    const fetchDistricts = async () => {
      try {
        const res = await fetch(`/api/region/district?provinceId=${province}`);
        if (!res.ok) throw new Error("Failed to fetch districts");
        const data: District[] = await res.json();
        setDistricts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDistricts();
  }, [province]);

  // Fetch ICS when District changes
  useEffect(() => {
    if (!district || district === "all") {
      setIcsList([]);
      setIcs("all"); // Reset ke All ICS
      return;
    }

    const fetchICS = async () => {
      try {
        const res = await fetch(`/api/ics?districtId=${district}`); // Gunakan API ICS yang diperbarui
        if (!res.ok) throw new Error("Failed to fetch ICS");
        const data: ICS[] = await res.json();
        setIcsList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchICS();
  }, [district]);

  return (
    <div className="w-full p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap justify-end gap-4 mb-4">
        {/* Province Dropdown */}
        <select
          className="p-2 border rounded-md text-sm"
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setDistrict("all"); // Reset ke All Districts
            setIcs("all"); // Reset ke All ICS
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
          className="p-2 border rounded-md text-sm"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setIcs("all"); // Reset ke All ICS
          }}
          disabled={!province} // Disabled jika province belum dipilih
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
          className="p-2 border rounded-md text-sm"
          value={ics}
          onChange={(e) => setIcs(e.target.value)}
          disabled={!district || district === "all"} // Disabled jika district belum dipilih atau "All Districts"
        >
          <option value="all">All ICS</option>
          {icsList.map((ics) => (
            <option key={ics.id} value={ics.id}>
              {ics.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <CountCard caption="Farmers" count={8888} iconSrc="/master-farmer.png" />
        <CountCard caption="Plots" count={10} iconSrc="/master-plot.png" />
        <CountCard caption="Trained Farmers" count={10} iconSrc="/trained-farmer.png" />
        <CountCard caption="ICS" count={10} iconSrc="/master-ics.png" />
      </div>
    </div>
  );
};

export default DashboardBasicPage;