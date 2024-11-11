// Import and export statements
import { removeperson } from '../reducers/Personslice';
import axios from '../../../utils/axios'; // default import without curly braces
// import { loadperson, removeperson } from '../reducers/personslice';
import { loadperson   } from '../reducers/Personslice';
// Async action to load person details
export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    // Fetch person details and related data 
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);




    // Consolidate all fetched data
    let alldata = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
   dispatch(loadperson(alldata))
    console.log(alldata);
    // You might want to dispatch some action with alldata here if needed
    // e.g., dispatch(loadperson(alldata));

  } catch (error) {
    console.log("Error fetching person data:", error);
  }
};
