import React from "react";

const Dashboard = () => {
  return (
    <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Different Color Boxes */}
      <div className="bg-red-500 p-6 rounded-lg text-white text-center shadow-md">
        Red Box
      </div>
      <div className="bg-green-500 p-6 rounded-lg text-white text-center shadow-md">
        Green Box
      </div>
      <div className="bg-blue-500 p-6 rounded-lg text-white text-center shadow-md">
        Blue Box
      </div>
      <div className="bg-yellow-500 p-6 rounded-lg text-white text-center shadow-md">
        Yellow Box
      </div>
      <div className="bg-purple-500 p-6 rounded-lg text-white text-center shadow-md">
        Purple Box
      </div>
      <div className="bg-teal-500 p-6 rounded-lg text-white text-center shadow-md">
        Teal Box
      </div>
    </div>
  );
};

export default Dashboard;
