import React from "react";
import avatar from "../../Utils/Images/avatar.png";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

function DiscussPost({ title }) {
  if (title.length > 100) {
    title = title.substring(0, 100);
    title += "...";
  }

  return (
    <div className="w-full flex border-b-[1px] border-b-gray-300 p-3 ">
      <div className="w-[80%] flex ">
        <div className="w-16">
          <img
            className="w-14 h-14 rounded-full cursor-pointer"
            src={avatar}
            alt="avatar"
          ></img>
        </div>
        <div className="mx-5 flex flex-col">
          <div className="font-Button cursor-pointer">{title}</div>
          <div className="flex text-gray-400 text-sm gap-3">
                <div>Anonymous User</div>
                <div>Created at</div>
                <div>No reply yet</div>
          </div>
        </div>
      </div>
      <div className="w-[20%]  grid grid-cols-2">
        <div className="flex items-center gap-2"><ArrowDropUpIcon/> <span>69</span></div>
        <div className="flex items-center gap-2"><VisibilityIcon/> <span>169</span></div>
      </div>
    </div>
  );
}

export default DiscussPost;
