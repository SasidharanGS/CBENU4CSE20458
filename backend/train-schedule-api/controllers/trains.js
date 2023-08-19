// controllers/trains.js
const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/train';

exports.getTrainSchedules = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains`, {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
      },
    });
    const trainSchedules = response.data;

    // Process and filter trainSchedules
    const currentTime = new Date();
    const thirtyMinutesLater = new Date(currentTime.getTime() + 30 * 60 * 1000);

    const filteredSchedules = trainSchedules.filter((schedule) => {
      const departureTime = new Date();
      departureTime.setHours(schedule.departureTime.Hours);
      departureTime.setMinutes(schedule.departureTime.Minutes);
      departureTime.setSeconds(schedule.departureTime.Seconds);

      return departureTime > thirtyMinutesLater;
    });

    // Sort the filtered schedules based on sorting criteria
    filteredSchedules.sort((a, b) => {
      // Sort by ascending price
      if (a.price.sleeper === b.price.sleeper) {
        // If prices are equal, sort by descending tickets (AC + sleeper)
        if (a.seatsAvailable.AC + a.seatsAvailable.sleeper === b.seatsAvailable.AC + b.seatsAvailable.sleeper) {
          // If tickets are equal, sort by descending departure time (after considering delays)
          return (b.departureTime.Hours * 60 + b.departureTime.Minutes + b.delayedBy) -
                 (a.departureTime.Hours * 60 + a.departureTime.Minutes + a.delayedBy);
        }
        return (b.seatsAvailable.AC + b.seatsAvailable.sleeper) - (a.seatsAvailable.AC + a.seatsAvailable.sleeper);
      }
      return a.price.sleeper - b.price.sleeper;
    });

    // Construct API response
    const apiResponse = {
      message: 'Train schedules fetched successfully',
      data: filteredSchedules,
    };

    res.json(apiResponse);
  } catch (error) {
    console.error('Error fetching train schedules:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
