import React from "react";

function InfoCard({ title, value, children: urlImg }) {
  return (
    <div>
      <div className="flex items-center px-3 py-5 bg-white rounded-lg shadow-lg w-60">
        <div className="flex items-center gap-14">
          <div className="ml-4">
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {value}
            </p>
          </div>
          {urlImg}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
