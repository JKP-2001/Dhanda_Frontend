import React, { useEffect } from "react";
import Nav from "../Components/Nav";

import { scrollToTop } from "../Utils/functions";
import ContactPage from "../Components/ContactPage";

const Contact = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Nav type={"home"} />

      <div className="mb-10">
        <ContactPage />
      </div>
    </>
  );
};

export default Contact;
