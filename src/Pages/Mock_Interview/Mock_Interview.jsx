import React, { useEffect } from 'react'
import Nav from '../../Components/Nav'

import Mock_Interview_Comp from "../../Components/Mock_Interview/Mock_Interview_Comp"
import { scrollToTop } from '../../Utils/functions'
import SideNav from '../../Components/SideNav'


const Mock_Interview = () => {
  useEffect(() => {
    scrollToTop();
  }, [])

  return (
    <div>
      <SideNav/>
      <Nav />
      <div className='mb-20 select-none lg:ml-48'>
        <Mock_Interview_Comp />
      </div>

    </div>
  )
}

export default Mock_Interview