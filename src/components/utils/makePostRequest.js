const makePostRequest = async ({ apiUrl, data = {} }, headersOps) => {
  const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
  try {
    const result = await fetch(`${baseURL}${apiUrl}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headersOps,
    }).then((response) => response.json());
    return result;
  } catch (error) {
    console.error(error.message);
    return { error: "Sorry, something went wrong. Please try again later." };
  }
};

export default makePostRequest;
