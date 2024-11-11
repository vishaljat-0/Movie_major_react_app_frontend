// Import and export statements
import { removetv, loadtv } from '../reducers/Tvslice';
import axios from '../../../utils/axios';

// Async action to load tv details
export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    // Fetch TV details and related data
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    // Consolidate all fetched data
    const alldata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === 'Trailer'),
      watchproviders: watchproviders.data.results.IN,
    };

    // Dispatch consolidated data to the store
    dispatch(loadtv(alldata));

    // Uncomment this line if you need to check the output
    // console.log(alldata);
  } catch (error) {
    console.error("Error fetching TV data:", error);
  }
};
