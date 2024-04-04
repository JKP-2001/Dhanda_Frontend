import React from "react";

// create three cards for step to book interview

const StepToBook = () => {
  return (
    <div className="w-[100%] mt-28">
      <div className="w-[96%] md:w-[80%] grid grid-cols-1 mx-auto sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="md:w-full relative md:h-32 p-6  flex items-center justify-center  text-center rounded-lg overflow-hidden shadow-lg group bg-gradient-to-r from-brand via-primary to-brand  text-white font-bold text-base md:text-lg">
          <div className="bg-gradient-to-t from-black/30 via-gray-800 to-black/30 top-0 left-0 absolute opacity-100 w-full h-full z-20"></div>
          <img
            src={`https://source.unsplash.com/random/?interview`}
            fill
            style={{ objectFit: "cover" }}
            className="absolute  group-hover:scale-105 transition-all ease-in-out duration-500 z-10 w-full h-full top-0 left-0"
          />
          <div className="flex flex-col z-40">
            <div className="text-2xl font-custom font-semibold ">Step 01</div>
            <h4 className=" text-xl  font-handwritten2 mt-2 font-semibold">
              Choose your mentor according to your need
            </h4>
          </div>
        </div>
        <div className="md:w-full relative md:h-32 p-6  flex items-center justify-center  text-center rounded-lg overflow-hidden shadow-lg group bg-gradient-to-r from-brand via-primary to-brand  text-white font-bold text-base md:text-lg">
          <div className="bg-gradient-to-t from-black/40 via-gray-800 to-black/40 top-0 left-0 absolute opacity-100 w-full h-full z-20"></div>
          <img
            src={`https://source.unsplash.com/random/?time`}
            fill
            style={{ objectFit: "cover" }}
            className="absolute  group-hover:scale-105 transition-all ease-in-out duration-500 z-10 w-full h-full top-0 left-0"
          />
          <div className="flex flex-col z-40">
            <div className="text-2xl font-custom font-semibold ">Step 02</div>
            <h4 className=" text-xl  font-handwritten2 mt-2 font-semibold">
              Choose your time slot. Book your mock-interview
            </h4>
          </div>
        </div>
        <div className="md:w-full relative md:h-32 p-6  flex items-center justify-center  text-center rounded-lg overflow-hidden shadow-lg group bg-gradient-to-r from-brand via-primary to-brand  text-white font-bold text-base md:text-lg">
          <div className="bg-gradient-to-t from-black/40 via-gray-800 to-black/40 top-0 left-0 absolute opacity-100 w-full h-full z-20"></div>
          <img
            src={`https://source.unsplash.com/random/?meeting`}
            fill
            style={{ objectFit: "cover" }}
            className="absolute  group-hover:scale-105 transition-all ease-in-out duration-500 z-10 w-full h-full top-0 left-0"
          />
          <div className="flex flex-col z-40">
            <div className="text-2xl font-custom font-semibold ">Step 03</div>
            <h4 className=" text-xl  font-handwritten2 mt-2 font-semibold">
              Meet with your interviewer virtually
            </h4>
          </div>
        </div>
        <div className="md:w-full relative md:h-32 p-6  flex items-center justify-center  text-center rounded-lg overflow-hidden shadow-lg group bg-gradient-to-r from-brand via-primary to-brand  text-white font-bold text-base md:text-lg">
          <div className="bg-gradient-to-t from-black/40 via-gray-800 to-black/40 top-0 left-0 absolute opacity-100 w-full h-full z-20"></div>
          <img
            src={`https://source.unsplash.com/random/?feedback`}
            fill
            style={{ objectFit: "cover" }}
            className="absolute  group-hover:scale-105 transition-all ease-in-out duration-500 z-10 w-full h-full top-0 left-0"
          />
          <div className="flex flex-col z-40">
            <div className="text-2xl font-custom font-semibold ">Step 04</div>
            <h4 className=" text-xl  font-handwritten2 mt-2 font-semibold">
              Get detailed feedback and crack the interview
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepToBook;
