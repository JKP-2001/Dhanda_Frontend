import React from 'react'
import Nav from '../../Components/Nav'
import { Button } from '@material-tailwind/react'
import CatButton from './CatButton'

const Mock_Interview = () => {
  return (
    <div>
        <Nav />
        
        <div className="category">
            <div className="flex mt-4 ml-5 space-x-4">
                <CatButton type={"All"} active={true}/>
                <CatButton type={"SDE"} active={false}/>
                <CatButton type={"Data Science"} active={false}/>
                <CatButton type={"Analyst"} active={false}/>
            </div>
        </div>
    </div>
  )
}

export default Mock_Interview