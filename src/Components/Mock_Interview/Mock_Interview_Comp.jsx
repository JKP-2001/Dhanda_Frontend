import React, { useEffect, useState } from 'react';
import CatButton from './CatButton';
import Sorting_Button from './Sorting_Button';
import CompanyTag from './CompanyTag';
import Interviewer_Card from './Interviewer_Card';
import { motion } from "framer-motion"
import { GetInterviewersList } from '../../APIs/InterviewersAPIs';
import Pager from '../Pager';

const Mock_Interview_Comp = () => {
  const [comp, setComp] = useState([]);
  const [curPage, setCurPage] = useState(1)
  const demoInterviewer = {
    firstName: 'Jitendra',
    lastName: 'Pandey',
    headline: 'SDE at Deutsche bank, going to rob the bank.',
    rating: 4.7,
    interviewsTaken: 56,
    price: 1250,
    interviewDuration: 45
  }
  const [interviewersList, setInterviewersList] = useState([demoInterviewer])

  useEffect(
    ()=>{
      async function getData(){
        try{
          const interviewers = await GetInterviewersList(1,undefined)
          console.log(interviewers)
          if (!Array.isArray(interviewers))
            throw new Error('Interviewers is not an array type')
          setInterviewersList(interviewers)
        }
        catch(e){
          console.error('Error :', e)
        }
      }
      getData()
  },
    []
  )

  const companies = ["Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Oracle", "Paypal", "Salesforce", "Cisco", "Samsung", "Walmart", "Intuit", "Spotify", "Twitter", "LinkedIn", "Snapchat", "Twitch", "TikTok", "Reddit", "Pinterest", "Netflix", "Airbnb", "IBM"];
  const sort_by = ["Company", "Date", "Rating"];

  const variants = {
    hidden: { x: -30 },
    visible: { x: 0 }
  };

  return (
    <div className='pb-10'>
      <motion.div className="category" initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ type: "spring", stiffness: 100 }}>
        <div className="flex flex-wrap mt-10 space-x-4">
          <div></div>
          <CatButton type={"All"} active={true} />
          <CatButton type={"SDE"} active={false} />
          <CatButton type={"Data Science"} active={false} />
          <CatButton type={"Analyst"} active={false} />
        </div>
      </motion.div>

      <motion.div className="sorting" initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ type: "spring", stiffness: 100 }}>
        <div className="flex mt-10 space-x-6">
          <div></div>
          <Sorting_Button type={"Company"} menuItems={companies} setComp={setComp} tag="comp" comp={comp} />
          <Sorting_Button type={"Sort By"} menuItems={sort_by} />
        </div>
      </motion.div>
      <CompanyTag comp={comp} setComp={setComp} />

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          interviewersList.map(
            (interviewer, index)=><Interviewer_Card key={index} {...interviewer}/>
          )
        }
      </motion.div>
      <Pager totalPage={10} currentPage={curPage} className="mt-5" onClick={(page)=>{
        setCurPage(page)
      }}/>
    </div>
  );
};

export default Mock_Interview_Comp;
