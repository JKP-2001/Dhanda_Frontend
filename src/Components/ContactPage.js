import React, { useState } from "react";
import { submitForm } from "../APIs/User_API";
import showToast from "../Utils/showToast";

function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading,setLoading]=useState(false);

  const handleclick = async (e) => {
    e.preventDefault();
    const data = {
      email,
      subject,
      message,
    };
    setLoading(true);
    const result =await submitForm(data);
    setLoading(false);
    if(result.success)
    {
      setEmail("");
      setMessage("");
      setSubject("");
      showToast({
        msg:result.msg,
        type:"success",
        duration:3000
      })
    }
    else
    {
      showToast({
        msg:result.msg,
        type:"error",
        duration:3000
      })
    }
  };

  return (
    <section className="bg-white ">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-inter font-semibold text-center text-gray-900 ">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-inter text-center text-gray-500  sm:text-lg">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form className="space-y-8">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              placeholder="name@xyz.com"
              required
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            onClick={handleclick}
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
          >
            {loading?"Sending......":"Send"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
