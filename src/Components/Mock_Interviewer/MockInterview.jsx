import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import EducationCard from "./Education/EducationCard";
import ExperienceCard from "./Experience/ExperienceCard";
import FeedbackCard from "./FeedBacks/FeedbackCard";

import { useNavigate, useParams } from "react-router-dom";

import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PostCard from "../New_Feeds/PostCard";
import UserList_Modal from "../../Utils/UserList_Modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostOfUser } from "../../APIs/Post_API";
import { setUserPosts } from "../../Redux/user/userSlice";
import NothingFoundCard from "../../Utils/NothingFoundCard";
import showToast from "../../Utils/showToast";
import { getUserDataById } from "../../APIs/User_API";
import {
  getSearchUserStart,
  getSearchUserSuccess,
} from "../../Redux/searchUser/searchUser";

import userimg from "../../Utils/Images/user2.jpg";
import RenderRazorpayDM from "./RenderRazorPayDM";
import axios from "axios";
import { EncryptRequestData } from "../../Utils/Encryption/EncryptRequestData";
import { DecryptResponseData } from "../../Utils/Encryption/DecryptResponseData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Message_Modal = (props) => {
  const { text, setText, handleCreateOrder, sendLoading } = props;

  const { setOpenMessageModal } = props;

  const searchUserRedux = useSelector((state) => state.searchUser);

  const handleClose = () => {
    setOpenMessageModal(false);
    setText("");
    document.body.style.overflow = "auto";
  };

  const handleSend = () => {
    handleCreateOrder(1000, "INR");
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center mt-8 md:mt-0 md:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 mx-2 sm:mx-0   sm:text-left">
                <div
                  className="text-lg font-semibold text-gray-900 font-inter"
                  id="modal-headline"
                >
                  {`Send Priority DM To ${
                    searchUserRedux.data.firstName +
                    " (" +
                    searchUserRedux.data.email +
                    ")"
                  }`}
                </div>
                <div className=" space-x-2 mt-3">
                  <div className="your-question w-full">
                    <textarea
                      type="text"
                      id="text"
                      rows={10}
                      className="font-inter w-full px-3 placeholder-gray-900 border rounded-lg text-sm focus:shadow-outline"
                      placeholder="Type your question here"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    {/* tag to show word overlimit */}
                    {text.length > 1000 ? (
                      <div className="text-xs text-red-600 font-inter font-bold">
                        Characters limit reached.
                      </div>
                    ) : (
                      <div className="text-xs text-green-600 font-inter font-bold">
                        {1000 - text.length} characters left
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleClose}
              >
                Close
              </button>

              <button
                type="button"
                className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm mt-2 md:mt-0"
                onClick={handleSend}
              >
                {sendLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Account = (props) => {
  const handleClick = props.handleClick;

  const searchUserRedux = useSelector((state) => state.searchUser);

  const userRedux = useSelector((state) => state.user);

  return (
    searchUserRedux.data && (
      <>
        <div className="ml-3 lg:ml-7 mt-5">
          <ExperienceCard exp={searchUserRedux} />
        </div>

        <div className="ml-3 lg:ml-7 mt-5">
          <EducationCard edu={searchUserRedux} />
        </div>

        {userRedux.data && userRedux.data.role === "student" ? (
          <div className="">
            <div className="mx-3 sm:ml-3 lg:ml-7 mt-10 ">
              <Button
                color="black"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                className="w-full sm:w-40 h-10 font-inter font-semibold text-xs"
                onClick={handleClick} 
              >
                Book a Session
              </Button>
            </div>
          </div>
        ) : null}

        {/* <div
                className='ml-3 lg:ml-7 mt-10'>
                <FeedbackCard />
            </div> */}
      </>
    )
  );
};

const Slider = () => {
  return (
    <div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-2 text-center"
    >
      {/* Your actual slider component */}
      <div className="h-1 bg-blue-500 mx-auto"></div>
    </div>
  );
};

const Posts = () => {
  const [items, setItems] = useState([]);

  const params = useParams();

  const userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getItemsOfUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast({
        msg: "Login Required",
        type: "error",
        duration: 3000,
      });
      return;
    }

    const id = params.user_id;
    const role = params.role;

    setLoading(true);

    const response = await getAllPostOfUser(1, 10, token, id, role);

    setLoading(false);

    if (response.success) {
      dispatch(setUserPosts(response.data.result));
      setItems(response.data.result);
    } else {
      showToast({
        msg: "Something went wrong",
        type: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getItemsOfUser();
    setItems(userRedux.posts ? userRedux.posts : []);
  }, [userRedux.data]);

  return loading ? (
    <div className="flex justify-center items-center mt-20 p-4 bg-white rounded-full">
      <Spinner color="blue" size="large" />
      <div className="font-handwritten2 text-base md:text-xl ml-2 mt-[1px] md:-mt-1">
        Loading Posts.....
      </div>
    </div>
  ) : userRedux.posts && userRedux.posts.length > 0 ? (
    <div>
      {items.map((item, index) => (
        <PostCard
          isUpdated={item.isUpdated}
          type="feed"
          key={item.updatedAt ? item.updatedAt : item.createdAt}
          postId={item._id}
          index={index}
          name={item.author.firstName + " " + item.author.lastName}
          bio={item.author.bio}
          text={item.content ? item.content : null}
          images={item.images}
          likes={item.likes}
          comments={item.comments}
          reposts={item.reposts}
          bookMarks={item.bookmarks}
          follow={true}
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
        />
      ))}
      {/* <PostCard type="feed" follow={true} /> */}
    </div>
  ) : (
    <NothingFoundCard
      heading={"No Posts Found"}
      description={"Some new posts will be added and that will appear here 😁"}
    />
  );
};

const MockInterview = () => {
  const variants = {
    hidden: { x: -100 },
    visible: { x: 0 },
  };

  const [openMessageModal, setOpenMessageModal] = useState(false);

  const handleOpenMessageModal = () => {
    setOpenMessageModal(true);
    document.body.style.overflow = "hidden";
  };

  const [icon, setIcon] = useState("account");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mock-interview/schedule/${params.user_id}`);
  };

  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);

  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [text, setText] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [sendingDM, setSendingDM] = useState(false);

  const clickFollowers = () => {
    setFollowers(true);
    document.body.style.overflow = "hidden";
  };

  const clickFollowing = () => {
    setFollowing(true);
    document.body.style.overflow = "hidden";
  };

  const closeFollowers = () => {
    setFollowers(false);
    document.body.style.overflow = "auto";
  };

  const closeFollowing = () => {
    setFollowing(false);
    document.body.style.overflow = "auto";
  };

  const params = useParams();
  const dispatch = useDispatch();

  const searchUserRedux = useSelector((state) => state.searchUser);

  const getTheUserData = async () => {
    const token = localStorage.getItem("token");

    const role = params.role;
    const id = params.user_id;

    dispatch(getSearchUserStart());

    const userData = await getUserDataById(role, id);

    if (userData.success === false) {
      showToast({
        msg: userData.msg,
        type: "error",
        duration: 3000,
      });
    } else {
      dispatch(getSearchUserSuccess(userData.data));
    }
  };

  const userRedux = useSelector((state) => state.user);

  const handleCreateOrder = async (amount, currency) => {
    if (text.length === 0) {
      showToast({
        type: "error",
        msg: "Please enter your question",
        duration: 4000,
      });
      return;
    } else if (text.length > 1000) {
      showToast({
        type: "error",
        msg: "Question should be less than 500 characters",
        duration: 4000,
      });
      return;
    }

    setSendLoading(true);

    const DATA = EncryptRequestData({
      amount: amount * 100,
      currency: currency,
      instructorId: searchUserRedux.data._id,
      studentId: userRedux.data._id,
      service: "DM",
    });

    let response = await axios.post(
      BASE_URL + "/transactions/generate-order-id",
      DATA,
      {
        headers: {
          "Content-Type": "application/json",
          "security-key": process.env.REACT_APP_SECURITY_KEY,
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    response = response.data;

    response = DecryptResponseData(response);

    if (response.success && response.data.id) {
      setOrderDetails(response.data);
      setDisplayRazorpay(true);
      setSendLoading(false);
      console.log({ displayRazorpay });
    } else {
      setSendLoading(false);
    }
  };

  const [profileImg, setProfileImg] = useState(searchUserRedux.data ? searchUserRedux.data.profilePic : userimg)

  // fetch user data on loading page

  useEffect(() => {
    getTheUserData();
  }, []);

  useEffect(() => {
    if(searchUserRedux.data){
      setProfileImg(searchUserRedux.data.profilePic?searchUserRedux.data.profilePic : userimg)
    }
  },[searchUserRedux.data])

  return searchUserRedux.loading ? (
    <div className="flex justify-center pt-10 font-inter text-base md:text-xl">
      <Spinner color="blue" size="large" />
      <div className="font-handwritten2 text-base md:text-xl ml-2 mt-[1px] md:-mt-1">
        {"   Loading Profile....."}
      </div>
    </div>
  ) : (
    searchUserRedux.data && (
      <>
        <div className="select-none">
          <div className="select-none mt-3 ml-0 lg:mt-20 lg:ml-48 mb-10">
            <div className="mx-3 sm:ml-4 flex">
              <img
                className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] rounded-full border-2 border-gray-500 object-cover object-center mt-3"
                src={profileImg}
                alt={userimg}
              />

              <div className="mt-8 md:mt-12 ">
                {/* <div className="flex space-x-4 sm:space-x-16">
                  <div
                    className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600"
                    onClick={() => {
                      setIcon("grid");
                      window.scrollTo({ top: 600, behavior: "smooth" });
                    }}
                  >
                    <div className="number text-center">100</div>
                    <div>Posts</div>
                  </div>
                  <div
                    className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600"
                    onClick={clickFollowers}
                  >
                    <div className="number text-center">1.5M</div>
                    <div>Followers</div>
                  </div>
                  <div
                    className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600"
                    onClick={clickFollowing}
                  >
                    <div className="number text-center">200</div>
                    <div>Following</div>
                  </div>
                </div> */}
                <div className="ml-3">
                <h1 className="font-inter font-semibold md:text-xl">
                  {searchUserRedux.data.firstName + " " + searchUserRedux.data.lastName}
                </h1>
                <h1 className="font-inter text-xs md:text-sm  text-gray-500">
                  {searchUserRedux.data.bio}
                </h1>
              </div>
              </div>
            </div>

            <div className="ml-5 lg:ml-7 description font-inter w-11/12 lg:w-7/12 xl:w-10/12  mt-10 text-xs sm:text-sm">
              {searchUserRedux.data.description}
            </div>

            {userRedux.data && userRedux.data.role === "student" ? (
              <div className="sm:flex ">
                <div className="mx-3 sm:ml-3 lg:ml-7 mt-10">
                  <Button
                    color="black"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="w-full sm:w-40 h-10 font-inter"
                    onClick={handleClick}
                  >
                    Book a Session
                  </Button>
                </div>

                <div className="mx-3 sm:ml-3 lg:ml-7 mt-4 sm:mt-10">
                  <Button
                    color="black"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="w-full sm:w-40 h-10 font-inter"
                    onClick={handleOpenMessageModal}
                  >
                    Direct Message
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="flex space-x-14 md:space-x-20 ml-2 lg:ml-7 description font-inter w-11/12 lg:w-8/12 mt-10 text-sm justify-center">
              <div
                onClick={() => setIcon("account")}
                className={`cursor-pointer ${
                  icon === "account" ? "text-blue-500 underline" : ""
                }`}
              >
                <AccountBoxOutlinedIcon />
                {/* Slider */}
                {icon === "account" && <Slider />}
              </div>
            </div>

            {sendingDM ? (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
                <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
                  <div className="flex justify-center  font-inter text-base md:text-2xl space-x-3">
                    <Spinner color="blue" size="large" className="" />
                    <div>
                      <div className="font-handwritten2 text-base  ml-2">
                        Sending Message....
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : displayRazorpay ? (
              <RenderRazorpayDM
                order={orderDetails}
                keyId={process.env.REACT_APP_RAZORPAY_KEY_ID}
                setDisplayRazorpay={setDisplayRazorpay}
                instructorId={searchUserRedux.data._id}
                studentId={userRedux.data._id}
                sendingDM={setSendingDM}
                text={text}
                setOpenMessageModal={setOpenMessageModal}
              />
            ) : icon === "account" ? (
              <Account handleClick={handleClick} />
            ) : icon === "grid" ? (
              <div className="flex justify-center w-[100%] lg:w-8/12">
                <Posts />
              </div>
            ) : null}

            {followers ? (
              <UserList_Modal
                handleClose={closeFollowers}
                heading={"Followers"}
              />
            ) : following ? (
              <UserList_Modal
                handleClose={closeFollowing}
                heading={"Following"}
              />
            ) : null}
          </div>
        </div>

        {openMessageModal ? (
          <Message_Modal
            setOpenMessageModal={setOpenMessageModal}
            text={text}
            setText={setText}
            handleCreateOrder={handleCreateOrder}
            sendLoading={sendLoading}
            setSendLoading={setSendLoading}
          />
        ) : null}
      </>
    )
  );
};

export default MockInterview;

// {/* <div
//   onClick={() => setIcon("grid")}
//   className={`cursor-pointer ${
//     icon === "grid" ? "text-blue-500 underline" : ""
//   }`}
// >
//   <GridOnOutlinedIcon />
//   {/* Slider */}
//   {icon === "grid" && <Slider />}
// </div>; */}
