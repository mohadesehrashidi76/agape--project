import React, { useState } from "react";

type DropdownProps = {
  options: { label: string; onClick: () => void }[];
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      <div className="flex items-center ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white py-2 flex items-center focus:outline-none"
        >
          <svg
            className={"w-5 h-5 mt-1"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4h12M4 8h8m-8 4h8m-8 4h6"
            ></path>
          </svg>
          <p className="text-sm mr-2">مرتب سازی بر اساس</p>
        </button>
      </div>
      {isOpen && (
        <ul className="absolute bg-teal-900 bg-opacity-75 shadow-lg rounded-sm py-1  w-full">
          {options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-white  w-full text-right"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
