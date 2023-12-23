import React from 'react'
import CatButton from './CatButton'
import Sorting_Button from './Sorting_Button'



const Mock_Interview_Comp = () => {

    const companies = [ "Amazon", "Google", "Microsoft", "Facebook", "Apple", "Uber", "Adobe", "Oracle", "Paypal", "Salesforce", "Cisco", "Samsung", "Walmart", "Intuit", "Spotify", "Twitter", "LinkedIn", "Snapchat", "Twitch", "TikTok", "Reddit", "Pinterest", "Netflix", "Airbnb", "IBM"];

    const sort_by = ["Company", "Date", "Rating"];

    return (
        <div>
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
                    <Sorting_Button type={"Company"} menuItems={companies}/>
                    <Sorting_Button type={"Sort By"} menuItems={sort_by}/>
                </div>
            </div>
        </div>
    )
}

export default Mock_Interview_Comp