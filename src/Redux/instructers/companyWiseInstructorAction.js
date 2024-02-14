import {
  fetchInstructerSuccess,
  fetchInstructersFail,
  fetchInstructersLoading,
  setCurrentPage,
  setTotalResults,
} from "./instructerSlice";
import { companyWiseFetchInstructor } from "../../APIs/Instructer_API";
import { decryptFromJson, encryptToJson } from "../../Utils/functions";
import showToast from "../../Utils/showToast";

export const fetchCompanyWiseInstructors =
  (data) => async (dispatch, getState) => {
    try {
      dispatch(fetchInstructersLoading());
      data["page"] = 1;
      data["limit"] = 6;
      const fetchId = encryptToJson(data);
      const instructers = await companyWiseFetchInstructor(
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
      const decryptedInstructers = decryptFromJson(instructers.data);
      console.log("hii",decryptedInstructers);
      dispatch(fetchInstructerSuccess(decryptedInstructers.result));
      dispatch(setTotalResults(decryptedInstructers.totalResults));
      dispatch(setCurrentPage(2));
    } catch (error) {
      console.log(error);
      dispatch(fetchInstructersFail(error));
    }
  };
