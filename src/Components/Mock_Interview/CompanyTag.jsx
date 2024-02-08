import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCompanyWiseInstructors } from '../../Redux/instructers/companyWiseInstructorAction';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const CompanyTag = (props) => {
  const dispatch=useDispatch();

  let selectedComp = props.comp;

  

  const handleClick = (item)=>{
    const index = selectedComp.indexOf(item);
    

    selectedComp.splice(index,1);
    
    dispatch(fetchCompanyWiseInstructors({companies:selectedComp,sortBy:props.sortBy}));

    props.setComp([...selectedComp]);
    props.updateURLWithCompanies();
  }

  return (
    <div className="flex flex-wrap justify-self-auto ml-4 mt-2 space-x-3">

      <div className=''></div>

      {selectedComp.map((item, i) => {
        return (
          <span
            className="flex bg-blue-100 text-gray-800 text-xs my-2 font-medium me-1 px-2.5 py-0.5 rounded dark:bg-gray-700 
        dark:text-gray-300" key={i}
          >
            {item}
            <div onClick={()=>handleClick(item)}>
            <CloseOutlinedIcon fontSize='inherit' className='mx-1 mb-1  hover:cursor-pointer'/>
            </div>
          </span>
        )
      })}
    </div>
  );
};

export default CompanyTag;
