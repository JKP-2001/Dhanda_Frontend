import { Button } from '@material-tailwind/react'
import React from 'react'

const CatButton = (props) => {
  return (
    <Button color={props.active?`black`:`white`} buttonType="filled" size="regular" rounded={false} block={false} iconOnly={false} ripple="light" className={`w-40 h-10 font-inter rounded-3xl $text-black border-2 border-gray-500`}> {props.type} </Button>
  )
}

export default CatButton