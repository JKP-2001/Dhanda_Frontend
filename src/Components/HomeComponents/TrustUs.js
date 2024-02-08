import React from "react";
import trustImage from "../../Utils/Images/trustImage.jpg";
import whyChoose from "../../Utils/Images/why-choose-us.jpg";

function TrustUs() {
  return (
    <div>
      <div className="mt-28 w-[100%]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-[80%] mx-auto">
          <img src={trustImage}></img>
          <div className="flex flex-col justify-center gap-6">
            <div className="text-center lg:text-left font-custom font-semibold text-5xl ">
              Trust Us
            </div>
            <div className="text-center lg:text-left font-custom font-semibold text-4xl ">
              We Are Here to Help!
            </div>
            <div className="text-xl font-inter">
              If you are looking for a reliable mentors with whom you share your
              mind, thoughts and get the best advice you’ve been looking for, we
              are here. With years of experience in helping college students, we
              have experienced mentors, how to crack interviews of companies and
              get job in dream company. Then, what are you waiting for, checkout
              our services and book your mock interview now.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28 w-[100%]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-[80%] mx-auto">
          <div className="flex flex-col justify-center gap-4">
            <div className="text-center lg:text-left font-custom  text-4xl ">
              Why Choose Us?
            </div>
            <div className="text-center lg:text-left font-body  text-xl ">
              We are well-experienced industry professionals with brilliant
              minds.
            </div>
            <div className="text-xl font-inter font-semibold flex-col leading-relaxed ">
              <div className="text-center lg:text-left">Passion & Commitment</div>
              <div className="text-center lg:text-left">Honesty & Openness</div>
              <div className="text-center lg:text-left">Dedicated Team</div>
              <div className="text-center lg:text-left">Practical Approach</div>
            </div>
          </div>
          <img src={whyChoose}></img>
        </div>
      </div>
    </div>
  );
}

export default TrustUs;
