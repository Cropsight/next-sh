import { useState, useEffect } from "react";

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

const useFilters = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("all");
  const [ics, setIcs] = useState("all");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [icsList, setIcsList] = useState<ICS[]>([]);
  const [icsCount, setIcsCount] = useState(0);

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

  // Fetch all ICS on first load
  useEffect(() => {
    const fetchAllICS = async () => {
      try {
        const res = await fetch("/api/ics");
        if (!res.ok) throw new Error("Failed to fetch ICS");
        const data: ICS[] = await res.json();
        setIcsList(data);
        setIcsCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllICS();
  }, []);

  // Fetch Districts when Province changes
  useEffect(() => {
    if (!province) {
      setDistrict("all");
      setDistricts([]);
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

  // Fetch ICS when Province or District changes
  useEffect(() => {
    if (!province) return; // Tidak fetch kalau belum pilih province

    const fetchFilteredICS = async () => {
      try {
        let url = `/api/ics?provinceId=${province}`;
        if (district !== "all") url += `&districtId=${district}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch ICS");
        
        const data: ICS[] = await res.json();
        setIcsList(data);
        setIcsCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredICS();
  }, [province, district]);

  return {
    province, setProvince,
    district, setDistrict,
    ics, setIcs,
    provinces, districts, icsList,
    icsCount
  };
};

export default useFilters;