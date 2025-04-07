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
  id: number;
  name: string;
}

const DashboardICS = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("all");
  const [ics, setIcs] = useState("all");

  const [icsList, setIcsList] = useState<ICS[]>([]);
  const [icsCount, setIcsCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredIcs, setFilteredIcs] = useState<ICS[]>([]);

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
      setDistrict("all");
      setFilteredIcs([]);
      setIcs("all");
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

  // Fetch ICS List when District changes
  useEffect(() => {
    if (!district || district === "all") {
      setFilteredIcs([]);
      setIcs("all");
      return;
    }

    const fetchICS = async () => {
      try {
        const res = await fetch(`/api/ics?districtId=${district}`);
        if (!res.ok) throw new Error("Failed to fetch ICS");
        const data: ICS[] = await res.json();
        setFilteredIcs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchICS();
  }, [district]);

  // Fetch ICS Count (Filtered by Province, District, and ICS)
  useEffect(() => {
    const fetchICSCount = async () => {
      try {
        let url_ics = "/api/ics";
        let url_farmer = "/api/farmers";
        let add_url = "";

        if (ics !== "all") {
          add_url += `?id=${ics}`;
        } else if (district !== "all") {
          add_url += `?districtId=${district}`;
        } else if (province) {
          add_url += `?provinceId=${province}`;
        }

        url_ics += add_url;
        url_farmer += add_url;

        const res_ics = await fetch(url_ics);
        const data_ics: ICS[] = await res_ics.json();
        const res_farmer = await fetch(url_farmer);
        const data_farmer = await res_farmer.json();

        setIcsCount(data_ics.length);
        setFarmerCount(data_farmer.count);
      } catch (error) {
        console.error("Failed to fetch ICS count", error);
      }
    };

    fetchICSCount();
  }, [province, district, ics]);

  return (
    <div className="w-full p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap justify-end gap-4 mb-4">
        <select
          className="p-2 border rounded-md text-sm"
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

        <select
          className="p-2 border rounded-md text-sm"
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

        <select
          className="p-2 border rounded-md text-sm"
          value={ics}
          onChange={(e) => setIcs(e.target.value)}
          disabled={!district || district === "all"}
        >
          <option value="all">All ICS</option>
          {filteredIcs.map((ics) => (
            <option key={ics.id} value={ics.id}>
              {ics.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <CountCard caption="ICS" count={icsCount} iconSrc="/master-ics.png" />
        <CountCard
          caption="Total Farmers"
          count={8_056}
          // count={farmerCount}
          iconSrc="/all-farmers.png"
        />
        <CountCard
          caption="Trained Farmers"
          count={7_357}
          // count={farmerCount}
          iconSrc="/trained-farmer.png"
        />
        <CountCard
          caption="Un - Trained Farmers"
          count={699}
          // count={farmerCount}
          iconSrc="/farmer-male.png"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <CountCard
          caption="Total Registered Farmers (RF)"
          count={6_503}
          // count={farmerCount}
          iconSrc="/all-farmers.png"
        />
        <CountCard
          caption="RF - Trained"
          count={5_804}
          // count={farmerCount}
          iconSrc="/trained-farmer.png"
        />
        <CountCard
          caption="RF - Male"
          count={5_183}
          // count={farmerCount}
          iconSrc="/un-trained-farmers.png"
        />
        <CountCard
          caption="RF - Female"
          count={1_320}
          // count={farmerCount}
          iconSrc="/farmer-female.png"
        />
      </div>
    </div>
  );
};

export default DashboardICS;
