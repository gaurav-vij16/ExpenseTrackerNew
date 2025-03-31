import React, { useState } from "react";

const ToggleButtons = () => {
  const [active, setActive] = useState("Today");

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-gray-200 p-1 rounded-full flex flex-wrap justify-center w-full max-w-xs">
        {["Today", "Weekly", "Monthly"].map((item) => (
          <button
            key={item}
            className={`px-4 py-2 w-1/3 sm:w-auto rounded-full transition-all text-sm font-medium ${
              active === item
                ? "bg-purple-300 text-black"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButtons;
