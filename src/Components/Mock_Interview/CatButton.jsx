import { Button } from '@material-tailwind/react'
import React from 'react'

const CatButton = (props) => {
  return (
    <Button color={props.active ? `black` : `white`} className={`w-[147.39px] h-[41px] font-inter rounded-3xl $text-black border-[1.5px] border-gray-500 text-center my-2`}>
      
        {props.type}
      
    </Button>
  )
}

export default CatButton