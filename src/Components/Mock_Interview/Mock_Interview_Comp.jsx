import React, { useState } from 'react';
import CatButton from './CatButton';
import Sorting_Button from './Sorting_Button';
import CompanyTag from './CompanyTag';
import Interviewer_Card from './Interviewer_Card';

const Mock_Interview_Comp = () => {
  const [comp, setComp] = useState([]);

  const companies = ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Oracle", "Paypal", "Salesforce", "Cisco", "Samsung", "Walmart", "Intuit", "Spotify", "Twitter", "LinkedIn", "Snapchat", "Twitch", "TikTok", "Reddit", "Pinterest", "Netflix", "Airbnb", "IBM"];
  const sort_by = ["Company", "Date", "Rating"];

  return (
    <div className='pb-10'>
      <div className="category">
        <div className="flex ml-2 md:ml-10 mt-10 space-x-4">
          <CatButton type={"All"} active={true} />
          <CatButton type={"SDE"} active={false} />
          <CatButton type={"Data Science"} active={false} />
          <CatButton type={"Analyst"} active={false} />
        </div>
      </div>

      <div className="sorting">
        <div className="flex ml-2 md:ml-10 mt-10 space-x-4">
          <Sorting_Button type={"Company"} menuItems={companies} setComp={setComp} tag="comp" comp={comp} />
          <Sorting_Button type={"Sort By"} menuItems={sort_by} />
        </div>
      </div>
      <CompanyTag comp={comp} setComp={setComp} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
        <Interviewer_Card />
      </div>
    </div>
  );
};

export default Mock_Interview_Comp;
