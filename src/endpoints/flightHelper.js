import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
  headers: {
    'x-rapidapi-key': '8dea73929bmsh75795a6e19a986bp1e854cjsnf336b93dd2ab',
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
  },
});

export const flightSearch = async ({
  origin,
  destination,
  startDate,
  passengers,
  travelClass,
}) => {
  try {
    const data = {
      legs: `[{"destination":"${destination}","origin":"${origin}","date":"${startDate.toISOString().split('T')[0]}"}]`,
      adults: passengers.toString(),
      travelClass: travelClass,
      currency: 'USD',
      locale: 'en-US',
      market: 'en-US',
      countryCode: 'US'
    };

    const response = await apiClient.get('/flights/getFlightDetails', { params: data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchAirport = async (query) => {
  try {
    const response = await apiClient.get('/flights/searchAirport', {
      params: { query, locale: 'en-US' },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
