import { fetchInstructerSuccess,fetchInstructersLoading,fetchInstructersFail,setTotalResults, setCurrentPage } from "./instructerSlice";
import { fetchInstructers } from "../../APIs/Instructer_API";
import showToast from "../../Utils/showToast";
import { decryptFromJson } from "../../Utils/functions";
import { DecryptResponseData } from "../../Utils/Encryption/DecryptResponseData";

export const fetchInstructer=()=>async (dispatch,getState)=>{
    try{
        dispatch(fetchInstructersLoading());
        const page=getState().instructers.currPage;
        const instructers = await fetchInstructers(localStorage.getItem("token"),page);
        // const decryptedInstructers=decryptFromJson(instructers.data);
        console.log('at fetchInstructor, instructors ', instructers)

        const decryptedInstructers = decryptFromJson(instructers.payload)
        console.log('at fetchInstructor, decryptedInstructers ', decryptedInstructers)

        if(decryptedInstructers.success===false)
        {
            showToast({
                type:"error",
                duration:2000,
                msg:instructers.msg
            })
            dispatch(fetchInstructersFail(instructers.msg))
            return ;
        }
        const currentInstructers=getState().instructers.instructers;
        const updatedInstructors=[...currentInstructers,...decryptedInstructers.result];
        dispatch(fetchInstructerSuccess(updatedInstructors));
        dispatch(setTotalResults(decryptedInstructers.totalResults))
        const currentPage=getState().instructers.currPage; 
        dispatch(setCurrentPage(currentPage+1));
    }catch(error)
    {
        dispatch(fetchInstructersFail(error));
        console.log(error);
    }
}
