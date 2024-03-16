import React from "react";

const Service = () => {
  return (
    <section className="w-full pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container w-[80%] mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] font-custom text-dark dark:text-white sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>

              <span className="mb-2 block  font-semibold text-2xl font-roboto">
                Our Services
              </span>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Offer 1:1 sessions"
            details="Mentorship sessions, consultations, discovery calls - do what you do best. We take care of everything else."
          />
          <ServiceCard
            title="Setup Priority of your messages"
            details="Set your priorities for any message, so that your mentor could focus on that very soon."
          />
          <ServiceCard
            title="Set your need to choose mentor."
            details="Choose your best mentor according to rating wise, company wise, profile wise etc."
          />
        </div>
      </div>
    </section>
  );
};

export default Service;

const ServiceCard = ({  title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
          <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};
