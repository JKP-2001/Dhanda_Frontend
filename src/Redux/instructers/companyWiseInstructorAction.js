import { fetchInstructorsFail,fetchInstructorsLoading,fetchInstructorSuccess } from "./companyWiseInstructorSlice";
import {companyWiseFetchInstructor} from "../../APIs/Instructer_API"
import { encryptToJson } from "../../Utils/functions";

export const fetchCompanyWiseInstructors=(company)=> async (dispatch,getState)=>{
    try{
        dispatch(fetchInstructorsLoading());
        const fetchId=encryptToJson({company:company,companies:[],page:1,limit:6});
        const instructers = await companyWiseFetchInstructor(localStorage.getItem("token"),fetchId);
        console.log(instructers);
        
    }
    catch(error)
    {
        console.log(error);
    }
}