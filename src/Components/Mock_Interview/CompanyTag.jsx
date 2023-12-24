import React from 'react';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const CompanyTag = (props) => {

  let selectedComp = props.comp;

  

  const handleClick = (item)=>{
    const index = selectedComp.indexOf(item);
    console.log({index})

    selectedComp.splice(index,1);
    

    props.setComp([...selectedComp]);
  }

  return (
    <div className="flex flex-wrap justify-self-auto ml-4 mt-2">

      {selectedComp.map((item, i) => {
        return (
          <span
            className="flex bg-gray-100 text-gray-800 text-xs my-2 font-medium me-1 px-2.5 py-0.5 rounded dark:bg-gray-700 
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
