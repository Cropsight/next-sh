"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UserData {
  fullname: string;
  role: string;
}

const Navbar = () => {
  const { user, isLoaded } = useUser(); 
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user?.id) return; 

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user?uid=${user.id}`);
        if (!res.ok) throw new Error("User data not found");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user?.id]);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex flex-col">
          {loading ? (
            <span className="text-xs leading-3 font-medium">Loading...</span>
          ) : (
            <>
              <span className="text-xs leading-3 font-medium">
                {userData?.fullname || "Unknown"}
              </span>
              <span className="text-[10px] text-gray-500 text-right">
                {userData?.role || "No Role"}
              </span>
            </>
          )}
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;