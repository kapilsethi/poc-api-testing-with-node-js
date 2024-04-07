const getStationSuccessResponse = {
  id: "to-be-upadted",
  external_id: "to-be-updated",
  name: "to-be-updated",
  latitude: 33.33,
  longitude: -122.43,
  altitude: 223,
  rank: 10,
};

const getStationStationNotFoundResponse = {
  code: 404001,
  message: "Station not found",
};

const getStationResponseTemplates = {
  getStationSuccessResponse,
  getStationStationNotFoundResponse,
};

export default getStationResponseTemplates;
