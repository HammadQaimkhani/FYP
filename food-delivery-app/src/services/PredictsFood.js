import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';



const getPrediction = async imageUrl => {
  console.log(`Predition Service | getPreditionByUrl`);
  try {
    let predictResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PREDICT}/${imageUrl}`,
      // `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PREDICT}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (predictResponse?.status === 200) {
      return {
        status: true,
        message: `Food Predition data fetched`,
        data: predictResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Food Prediction data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Food Prediction data not found`,
    };
  }
};

const getPrediction2 = async ({imageUrl}) => {
  console.log(`FoodPredictionService | getPrediction2`);
  try {
    let response = await axios.post(
      `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.PREDICT}/${imageUrl}`,
      {},
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Item added to cart successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Item added to cart failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Item added to cart failed`,
    };
  }
};

export default {
 getPrediction, getPrediction2
};
