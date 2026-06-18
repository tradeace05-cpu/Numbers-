exports.handler = async (event) => {
  try {
    const { service, country } = JSON.parse(event.body);
    
    // Test: Just return what was sent
    return {
      statusCode: 200,
      body: JSON.stringify({
        test: "Function is working",
        service: service,
        country: country,
        time: new Date().toISOString()
      })
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: err.message })
    };
  }
};
