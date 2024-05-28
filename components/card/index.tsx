import { ICardPattern } from "@/types/project";
import React from "react";

const CardPattern: React.FC<ICardPattern> = ({
  title,
  img,
  subtitle,
  status,
  organizationname,
  logo,
}) => {
  return (
    <div>
      <div className="w-[350px] h-[390px] flex flex-col p-4 border border-gray-300  rounded-lg ml-2 mb-2 justify-center">
        <div className="flex justify-between">
          <div className="flex items-center w-[90%] mt-4">
            <img src={img} alt={title} className="w-24 h-24 object-cover " />
            <p className="text-md font-semibold mt-2 mr-2">{title}</p>
          </div>
          <p className="text-sm text-white rounded-lg h-7 w-20 bg-temcolor text-center">
            {status}
          </p>
        </div>
        <div className="text-sm text-gray-600 h-[100px] flex flex-col mt-4 p-2 border border-gray-300 rounded-lg mr-2">
          {subtitle}
        </div>
        <div>
          <div className="flex justify-between my-2">
            <p className="text-sm text-temcolor">200,000 تومان</p>

            <div>
              <p className="text-sm text-temcolor">200,000 تومان </p>
            </div>
          </div>
          <div className="flex w-full mt-1">
            <div className="w-1/2 h-1 bg-temcolor"></div>
            <div className="w-1/2 h-1 bg-temcolor"></div>

            <div className="w-1/2 h-2 bg-white"></div>
          </div>
          <p className="mb-1 text-sm">12 نفر تا امروز کمک کرده اند</p>
        </div>
        <p className="text-center mt-4">
          <button className=" bottom-4 right-4 text-temcolor rounded-full w-36 h-10 border border-temcolor">
            <span>حمایت</span>
            {">"}
          </button>
        </p>
      </div>
      <div className="bg-white border border-gray-300 p-5 rounded-lg w-80  mx-auto my-2  flex items-center justify-center">
        <img
          src={logo}
          alt={organizationname}
          className="w-10 h-10 object-cover "
        />
        <p className=" text-sm ">{organizationname}</p>
      </div>
    </div>
  );
};

export default CardPattern;
