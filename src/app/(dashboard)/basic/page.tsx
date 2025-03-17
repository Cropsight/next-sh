"use client";

import CountCard from "@/components/CountCard";

const DashboardBasicPage = () => {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <CountCard type="farmer" caption="Farmers" count={10} iconSrc="/master-farmer.png" />
        <CountCard type="plot" caption="Plots" count={10} iconSrc="/master-plot.png"/>
        <CountCard type="trained" caption="Trained Farmers" count={10} iconSrc="/trained-farmer.png"/>
        <CountCard type="ics" caption="ICS" count={10} iconSrc="/master-ics.png"/>
      </div>
    </div>
  );
};

export default DashboardBasicPage;
