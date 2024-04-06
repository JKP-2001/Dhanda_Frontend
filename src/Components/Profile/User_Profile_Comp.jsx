import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";

import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import EducationCard from "../Mock_Interviewer/Education/EducationCard";

import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { scrollToTop } from "../../Utils/functions";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import PostCard from "../New_Feeds/PostCard";
import UserList_Modal from "../../Utils/UserList_Modal";
import { useDispatch, useSelector } from "react-redux";
import ExperienceCard from "../Mock_Interviewer/Experience/ExperienceCard";
import { getAllPostOfUser, getBookmarkedPostUser } from "../../APIs/Post_API";
import showToast from "../../Utils/showToast";
import {
  setUserBookMarkedPosts,
  setUserPosts,
} from "../../Redux/user/userSlice";
import NothingFoundCard from "../../Utils/NothingFoundCard";

import userimg from "../../Utils/Images/user2.jpg";
import { getAllMeetings } from "../../APIs/Meeting_API";
// import SideBar from './SideBarProfile';
import SideBarProfile from "./SideBarProfile";
import toast from "react-hot-toast";
import { updateProfilePic } from "../../APIs/User_API";
// import { Spinner } from "@material-tailwind/react";

const localizer = momentLocalizer(moment);

const variants = {
  hidden: { x: -100 },
  visible: { x: 0 },
};

const Slider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-2 text-center"
    >
      {/* Your actual slider component */}
      <div className="h-1 bg-blue-500 mx-auto"></div>
    </motion.div>
  );
};

const Account = (props) => {
  const userRedux = useSelector((state) => state.user);

  if (!userRedux.data) {
    return null;
  }

  return (
    <motion.div className="mt-5 ml-3 md:ml-5 space-y-8">
      {userRedux.data && userRedux.data.experience.length > 0 ? (
        <div>
          <ExperienceCard exp={userRedux} isEdit={true}/>
        </div>
      ) : null}

      <div>
        <EducationCard edu={userRedux} isEdit={true}/>
      </div>
    </motion.div>
  );
};

const Calendar_Part = (props) => {
  const { events, setEvents } = props;

  const handleEventClick = props.handleEventClick;

  const userRedux = useSelector((state) => state.user);

  const [fetchedMeeting, setFetchedMeeting] = useState([]);

  const [fetchingEvents, setFetchingEvents] = useState(true);

  const convertToEvent = () => {
    var arr = [];

    const length = fetchedMeeting.length;

    for (var i = 0; i < length; i++) {
      var newEvent = fetchedMeeting[i].calendarEvent;
      const start = moment(newEvent.start).toDate();
      const end = moment(newEvent.end).toDate();
      newEvent = {
        ...newEvent,
        start,
        end,
        meeting_link: fetchedMeeting[i].meeting_link,
      };
      arr.push(newEvent);
    }

    setEvents(arr);
  };

  const fetchAllMeetings = async () => {
    if (!userRedux.data) {
      return;
    }

    const allMeeting = await getAllMeetings(userRedux.data.meetingScheduled);

    setFetchingEvents(false);

    // setFetchingEvents(false);

    if (allMeeting.success) {
      // console.log({ meetings: allMeeting.data });
      setFetchedMeeting(allMeeting.data);
      return;
    } else {
      showToast({
        msg: allMeeting.msg,
        type: "error",
        duration: 3000,
      });
    }
  };

  const shouldDisableDate = (date) => {
    const today = new Date();

    // compare date not whole time

    if (date.getFullYear() === today.getFullYear()) {
      if (date.getMonth() === today.getMonth()) {
        if (date.getDate() < today.getDate()) {
          return true;
        } else {
          return false;
        }
      }

      if (date.getMonth() < today.getMonth()) {
        return true;
      }

      return false;
    }

    if (date.getFullYear() < today.getFullYear()) {
      return true;
    }

    return false;
  };

  // Custom date cell wrapper to style disabled dates
  const CustomDateCellWrapper = ({ children, value }) => {
    const dateIsDisabled = shouldDisableDate(value);
    const className = dateIsDisabled ? "rbc-off-range-bg" : "";
    return React.cloneElement(React.Children.only(children), {
      className: `${children.props.className} ${className}`,
    });
  };

  useEffect(() => {
    fetchAllMeetings();
  }, [userRedux.data]);

  useEffect(() => {
    convertToEvent();
  }, [fetchedMeeting]);


  return fetchingEvents ? (
    <div className="w-[96%] lg:w-8/12 ml-2 lg:ml-7 mt-10">
      <div className="flex justify-center items-center mt-20 py-4 px-8 bg-white rounded-full">
        <Spinner color="blue" size="large" />
        <div className="font-handwritten2 text-base md:text-base ml-2 mt-[1px] md:-mt-1">
          Loading Calendar.....
        </div>
      </div>
    </div>
  ) : (
    <div className="w-[96%] lg:w-8/12 ml-2 lg:ml-7 mt-10">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `600px` }}
        onSelectEvent={handleEventClick}
        selectable
        className="font-inter font-semibold text-xs md:text-sm bg-white"
        components={{
          dateCellWrapper: CustomDateCellWrapper,
        }}
      />
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

    const id = params.id;
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
    <div className="w-[96%] lg:w-8/12 ml-2 lg:ml-7 mt-10">
      <div className="flex justify-center items-center mt-20 py-4 px-8 bg-white rounded-full">
        <Spinner color="blue" size="large" />
        <div className="font-handwritten2 text-base md:text-base ml-2 mt-[1px] md:-mt-1">
          Loading Posts.....
        </div>
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

const BookMarked = () => {
  const [items, setItems] = useState([]);

  const userRedux = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const params = useParams();

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

    const user_id = params.id;
    const role = params.role;

    setLoading(true);

    const response = await getBookmarkedPostUser(1, 10, token, user_id, role);

    setLoading(false);

    if (response.success) {
      dispatch(setUserBookMarkedPosts(response.data.result));
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
    setItems(userRedux.bookMarkedPosts ? userRedux.bookMarkedPosts : []);
  }, [userRedux.data]);

  return loading ? (
    <div className="w-[96%] lg:w-8/12 ml-2 lg:ml-7 mt-10">
      <div className="flex justify-center items-center mt-20 p-4 bg-white rounded-full">
        <Spinner color="blue" size="large" />
        <div className="font-handwritten2 text-base md:text-base ml-2 mt-[1px] md:-mt-1">
          Loading Bookmarked Posts.....
        </div>
      </div>
    </div>
  ) : userRedux.bookMarkedPosts && userRedux.bookMarkedPosts.length > 0 ? (
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
      heading={"No Bookmarked Posts Found"}
      description={"Posts that will be bookmarked, will appear here 😁"}
    />
  );
};

const User_Profile_Comp = () => {
  const navigate = useNavigate();

  const [checkFollowers, setCheckFollowers] = useState(false);
  const [checkFollowing, setCheckFollowing] = useState(false);

  const openCheckFollowers = () => {
    setCheckFollowers(true);
    document.body.style.overflow = "hidden";
  };

  const closeCheckFollowers = () => {
    setCheckFollowers(false);
    document.body.style.overflow = "auto";
  };

  const openCheckFollowings = () => {
    setCheckFollowing(true);
    document.body.style.overflow = "hidden";
  };

  const closeCheckFollowings = () => {
    setCheckFollowing(false);
    document.body.style.overflow = "auto";
  };

  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editImage, setEditImage] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);

    document.body.style.overflow = "auto";
  };

  const [selectedIcon, setSelectedIcon] = useState(
    localStorage.getItem("user-profile")
      ? localStorage.getItem("user-profile")
      : "account"
  );

  const handleIconClick = (icon) => {
    // Toggle the state to show/hide underline
    setSelectedIcon(icon);
    localStorage.setItem("user-profile", icon);
  };


  const userRedux = useSelector((state) => state.user);

  const [profileImg, setProfileImg] = useState(userRedux.data.profilePic ? userRedux.data.profilePic : userimg)

  const handleImageClick = () => {
    setEditImage(true);
    document.body.style.overflow = "hidden";

    console.log("clicked")
  }

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (newImages) => {
    setImages([...images, ...newImages]);
  };

  const handleImageFiles = (files) => {
    setImageFiles([...imageFiles, ...files]);
  }

  const handleImageUploadToServer = () => {
    console.log({ imageFiles })
  }

  const handleFileChange = (e) => {
    const newImages = [];
    const files = e.target.files;

    const toastId = toast.loading('Uploading...');

    let success = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      // Show loading toaster when the FileReader starts

      setUploading(true);


      reader.onloadend = () => {
        setUploading(false);
        showToast({
          msg: 'File Selected Successfully!',
          type: 'success',
          duration: 3000,
        });

        newImages.push(reader.result);

        if (newImages.length === files.length) {
          // All images have been processed
          handleImageUpload(newImages);
          handleImageFiles(files);
          toast.dismiss(toastId); // Dismiss the loading toaster

          success = true;

        }
      };


      reader.onerror = () => {
        setUploading(false);
        showToast({
          msg: 'Error uploading image',
          type: 'error',
          duration: 3000,
        });
        toast.dismiss(toastId); // Dismiss the loading toaster in case of an error
      };

      reader.readAsDataURL(file);
    }
  };


  const [sending, setSending] = useState(false);

  const handelUpload = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      showToast({
        msg: "Please Login",
        type: "error",
        duration: 3000,
      });
      navigate("/signin");
    }

    setSending(true);

    const response = await updateProfilePic(imageFiles, token);

    setSending(false);

    if (response.success) {

      showToast({
        msg: "Profile Pic Updated",
        type: "success",
        duration: 3000,
      });

      setProfileImg(response.url);

      setEditImage(false);
    }

    else {

      showToast({
        msg: response.msg,
        type: "error",
        duration: 3000,
      });
    }

  }



  useEffect(() => {
    scrollToTop();
  }, [userRedux.data]);


  // useEffect(() => {
  //   // change background color of the page to white
  //   document.body.style.backgroundColor = "white";

  //   return () => {
  //     // change background color of the page back to default
  //     document.body.style.backgroundColor = "#f0f4f9";
  //   }
  // },[])



  return (
    // <SideBar />
    userRedux.data ? (
      <div className="profile">
        <SideBarProfile
          selectedIcon={selectedIcon}
          handleIconClick={handleIconClick}
        />
        <div className="mt-2 ml-0 lg:mt-12 md:ml-[240px] lg:ml-[300px] md:pr-[100px] mb-10 ">
          <div className="">
            <div className="mx-3 sm:mx-4 flex ">

              <div className="overflow-hidden">
                <img
                  className="h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full border-2 border-gray-500 object-cover object-center mt-3 hover:cursor-pointer"
                  src={profileImg}
                  alt={userimg}
                  onClick={() => handleImageClick()}
                />
              </div>

              <div className="ml-2 mt-8 md:mt-12 ">
                {/* <div className="flex space-x-4 sm:space-x-16">
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={() => {
                                    setSelectedIcon("grid");
                                    window.scrollTo({ top: 600, behavior: "smooth" })
                                }}>
                                    <div className="number text-center">
                                        0
                                    </div>
                                    <div>
                                        Posts
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={openCheckFollowers}>
                                    <div className="number text-center">
                                        0
                                    </div>
                                    <div>
                                        Followers
                                    </div>
                                </div>
                                <div className="flex-col text-sm sm:text-base font-inter font-semibold hover:cursor-pointer hover:underline hover:text-blue-600" onClick={openCheckFollowings}>
                                    <div className="number text-center">
                                        0
                                    </div>
                                    <div>
                                        Following
                                    </div>
                                </div>
                            </div> */}
                <div className="ml-3">
                  <h1 className="font-inter font-semibold md:text-xl">
                    {userRedux.data.firstName + " " + userRedux.data.lastName}
                  </h1>
                  <h1 className="font-inter text-xs md:text-sm  text-gray-500">
                    {userRedux.data.bio}
                  </h1>
                </div>
              </div>
            </div>

            <div className="ml-5 lg:ml-7 description font-inter w-11/12 lg:w-8/12  mt-10 text-sm break-words">
              {userRedux.data.decription}
            </div>

            <div className="flex space-x-14 md:space-x-20 ml-2 lg:ml-7 description font-inter w-11/12 lg:w-8/12 mt-10 text-sm justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleIconClick("account")}
                className={`cursor-pointer ${selectedIcon === "account" ? "text-blue-500 underline" : ""
                  }`}
              >
                <AccountBoxOutlinedIcon />
                {/* Slider */}
                {selectedIcon === "account" && <Slider />}
              </motion.div>



              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleIconClick("calendar")}
                className={`cursor-pointer ${selectedIcon === "calendar" ? "text-blue-500 underline" : ""
                  }`}
              >
                <CalendarMonthOutlinedIcon />
                {/* Slider */}
                {selectedIcon === "calendar" && <Slider />}
              </motion.div>
            </div>

            {selectedIcon === "account" ? (
              <Account />
            ) : selectedIcon === "calendar" ? (
              <Calendar_Part
                events={events}
                setEvents={setEvents}
                handleEventClick={handleEventClick}
              />
            ) : selectedIcon === "grid" ? (
              <div className="flex justify-center w-[100%] lg:w-9/12">
                <Posts />
              </div>
            ) : selectedIcon === "bookmark" ? (
              <div className="flex justify-center w-[100%] lg:w-9/12">
                <BookMarked />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        {checkFollowers ? (
          <UserList_Modal
            handleClose={closeCheckFollowers}
            heading={"Followers"}
          />
        ) : checkFollowing ? (
          <UserList_Modal
            handleClose={closeCheckFollowings}
            heading={"Following"}
          />
        ) : null}

        {editImage && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">

              <div className="flex justify-between mb-8">
                <h2 className="md:text-lg font-inter font-bold ">
                  Edit Profile Photo
                </h2>
                <button
                  onClick={() => setEditImage(false)}
                  className="font-inter font-semibold text-gray-700"
                >
                  x
                </button>
              </div>

              <div className="flex justify-between">
                {images.length === 0 ? <label className="relative cursor-pointer">
                  <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-inter text-xs md:text-sm">Choose Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label> :



                  <label className="relative cursor-pointer">
                    <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-inter text-xs md:text-sm" onClick={handelUpload}>
                      {sending ? "Uploading..." : "Upload"}
                    </span>
                  </label >}
              </div>
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white p-4 md:p-6 rounded-2xl w-10/12 md:w-1/2 lg:w-1/3 max-h-full max-w-sm space-y-2  border-2 border-y-gray-500">
              <h2 className="text-2xl font-inter font-bold mb-4">
                Interview Details
              </h2>

              <p className="font-inter font-semibold text-gray-700">
                Title: {selectedEvent.title}
              </p>
              <p className="font-inter font-semibold text-gray-700">
                Starts At:{" "}
                {moment(selectedEvent.start).format("DD-MM-YYYY HH:mm")}
              </p>
              <p className="font-inter font-semibold text-gray-700">
                Ends At: {moment(selectedEvent.end).format("DD-MM-YYYY HH:mm")}
              </p>

              <p className="font-inter mb-4 font-semibold text-gray-700">
                Interview Link:{" "}
                <a
                  className="underline underline-offset-1 text-blue-800"
                  href={selectedEvent.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meet Link
                </a>
              </p>

              <div className="flex justify-end">
                <button
                  onClick={handleClosePopup}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300 ease-in-out font-inter font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : userRedux.loading ? (
      <Spinner />
    ) : null
  );
};

export default User_Profile_Comp;


// <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => handleIconClick("grid")}
//               className={`cursor-pointer ${
//                 selectedIcon === "grid" ? "text-blue-500 underline" : ""
//               }`}
//             >
//               <GridOnOutlinedIcon />
//               {/* Slider */}
//               {selectedIcon === "grid" && <Slider />}
//             </motion.div>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => handleIconClick("bookmark")}
//               className={`cursor-pointer ${
//                 selectedIcon === "bookmark" ? "text-blue-500 underline" : ""
//               }`}
//             >
//               <BookmarkBorderOutlinedIcon />
//               {/* Slider */}
//               {selectedIcon === "bookmark" && <Slider />}
//             </motion.div>