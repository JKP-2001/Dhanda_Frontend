import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'

import Mock_Interview_Comp from "../../Components/Mock_Interview/Mock_Interview_Comp"
import { scrollToTop } from '../../Utils/functions'


const Mock_Interview = () => {

  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div>
      <Nav />
      <div className='mb-20 select-none'>
        <Mock_Interview_Comp />
      </div>

    </div>
  )
}

export default Mock_Interview