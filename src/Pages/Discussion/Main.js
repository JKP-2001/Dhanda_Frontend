import React, { useState } from "react";
import DiscussPost from "../../Components/DiscussPost/DiscussPost";
import SearchInput from "../../Components/SearchInput/SearchInput";
import AddIcon from "@mui/icons-material/Add";
import { DrawerWithForm } from "../../Components/DiscussPost/DrawerWithForm";

function Main() {
  const [open, setOpen] = useState(false);
  const cat = ["Newest to Oldest", "Most Votes"];
  const [selectedCat, setSelectedCat] = useState(0);
  const handleCat = (index) => {
    setSelectedCat(index);
  };
  return (
    <div className="container w-full mt-4  border-[1px] border-gray-400 rounded-md p bg-white shadow-sm">
      <div className="upper-window flex flex-row items-center font-thin  justify-between p-3 border-b-[1px] bg-[#e4e9eb94] border-b-blue-gray-200">
        <div className="flex flex-row gap-8">
          {cat.map((category, idx) => {
            return (
              <span
                key={idx}
                onClick={() => {
                  handleCat(idx);
                }}
                className={`${"cursor-pointer"} ${
                  selectedCat === idx ? "font-roboto" : "font-thin"
                }`}
              >
                {category}
              </span>
            );
          })}
        </div>
        <div className="flex gap-2">
          <SearchInput />
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
          >
            New <AddIcon />
          </button>
        </div>
      </div>
      <div className="all-discussion">
        <div className="">
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
          <DiscussPost title="Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )" />
          <DiscussPost
            title={
              "Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate ) Neelesh_Aggarwal's avatar Difference in Final year( Collage ) and 1st year( Coorporate )"
            }
          />
        </div>
      </div>
      <DrawerWithForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default Main;
