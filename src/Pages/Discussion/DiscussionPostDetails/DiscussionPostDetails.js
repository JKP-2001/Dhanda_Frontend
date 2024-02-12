import React from "react";
import Nav from "../../../Components/Nav";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import avatar from "../../../Utils/Images/avatar.png";
import CommentIcon from "@mui/icons-material/Comment";

function DiscussionPostDetails() {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div>
      <Nav />
      <div className="main-container mt-4 w-[80%] mx-auto bg-white border-[1px] border-gray-300 rounded-md">
        <div className="p-2 flex border-b-[1px] border-b-gray-200">
          <div
            onClick={() => {
              backHandler();
            }}
            className="border-r-[1px] border-r-gray-300 w-20 pr-2  text-center cursor-pointer text-gray-400"
          >
            {" "}
            <ArrowBackIosNewIcon fontSize="small" /> <span>Back</span>{" "}
          </div>
          <div className="px-4">Title</div>
        </div>
        <div
          className="border-b-[1px] border-gray-300 p-3"
          style={{ display: "grid", gridTemplateColumns: "80px 1fr" }}
        >
          <div className="flex  w-20 flex-col items-center justify-start   text-gray-400">
            <span className="bg-gray-100 rounded-sm my-2 px-2 cursor-pointer">
              <ArrowDropUpIcon />
            </span>
            <span>1</span>
            <span className="bg-gray-100 rounded-sm my-2 px-2 cursor-pointer">
              <ArrowDropDownIcon />
            </span>
          </div>
          <div className="p-3 flex flex-col grid-flow-row">
            <div className="flex gap-3 items-center ">
              <img
                className="w-14 h-14 rounded-full"
                src={avatar}
                alt="avatar"
              ></img>
              <div>Anonymous User</div>
            </div>
            <div>
              To operate a on-call, at any given day, a min of 3 Java developer,
              2 python developer and 1 go developer needed at any given day, a
              min of 3 Java developer, 2 python developer and 1 go developer
              needed
            </div>
          </div>
        </div>
        <div className="bg-gray-200 border-b-[1px] border-gray-300 p-3">
          <div>
            <CommentIcon /> <span>Comments:14</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPostDetails;
