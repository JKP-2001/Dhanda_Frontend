import React from "react";
import Nav from "../../Components/Nav";
import CatButton from "./CatButton";
import Main from "./Main";

const categories = [
  "General Discussion",
  "Interview Experience",
  "Career",
  "Interview Question",
  "Compensation",
  "Study Guide",
];

function Discussion() {
  return (
    <div className="w-full pb-10">
      <Nav />
      <div className="w-[80%] mx-auto mt-4">
        <div>
          <div className="flex flex-wrap  gap-4">
            {categories.map((cat, idx) => {
              return (
                <CatButton key={idx} type={cat} active={false} num={idx} />
              );
            })}
          </div>
        </div>
        <Main />
      </div>
    </div>
  );
}

export default Discussion;
