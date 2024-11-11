// Import and export statements
export { removemovie } from '../reducers/Movieslice';
import axios from '../../../utils/axios'; // default import without curly braces
import { loadmovie, removemovie } from '../reducers/Movieslice';

// Async action to load movie details
export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    // Fetch movie details and related data 
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`); // corrected spelling
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    // Consolidate all fetched data
    let alldata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find( m => m.type === 'Trailer'),
      watchproviders: watchproviders.data.results.IN,
    };
   dispatch(loadmovie(alldata))
    console.log(alldata);
    // You might want to dispatch some action with alldata here if needed
    // e.g., dispatch(loadmovie(alldata));

  } catch (error) {
    console.log("Error fetching movie data:", error);
  }
};
