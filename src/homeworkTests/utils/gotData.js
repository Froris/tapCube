import got from "got";

const gotData = (path, fixturesData) => {
  return got.post(path, {
    json: {
      input: fixturesData,
    },
    responseType: "json",
  });
};

export default gotData;
