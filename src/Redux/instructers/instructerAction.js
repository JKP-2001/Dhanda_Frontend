import {
  fetchInstructerSuccess,
  fetchInstructersLoading,
  fetchInstructersFail,
  setTotalResults,
  setCurrentPage,
} from "./instructerSlice";
import { fetchInstructers } from "../../APIs/Instructer_API";
import showToast from "../../Utils/showToast";
import { decryptFromJson, encryptToJson } from "../../Utils/functions";
import { DecryptResponseData } from "../../Utils/Encryption/DecryptResponseData";

export const fetchInstructer = (data) => async (dispatch, getState) => {
  try {
    dispatch(fetchInstructersLoading());
    const fetchId = encryptToJson(data);
    
    const instructers = await fetchInstructers(
      localStorage.getItem("token"),
      fetchId
    );
    if (instructers.success === false) {
      showToast({
        type: "error",
        duration: 2000,
        msg: instructers.msg,
      });
      dispatch(fetchInstructersFail(instructers.msg));
      return;
    }

    const decryptedInstructers = instructers

    const currentInstructers=getState().instructers.instructers;
    console.log(decryptedInstructers);
    const updatedInstructors=[...currentInstructers,...decryptedInstructers.result];
    dispatch(fetchInstructerSuccess(updatedInstructors));
    dispatch(setTotalResults(decryptedInstructers.totalResults))
    const currentPage=getState().instructers.currPage;
    dispatch(setCurrentPage(currentPage+1));
  } catch (error) {
    dispatch(fetchInstructersFail(error));
    console.log(error);
  }
};
