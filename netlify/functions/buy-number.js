exports.handler = async (event) => {
  try {
    const { service, country } = JSON.parse(event.body);

    // 5sim expects: country in lowercase, service in lowercase
    const response = await fetch(`https://5sim.net/v1/user/buy/activation/${country.toLowerCase()}/${service.toLowerCase()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.FIVESIM_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        number: data.phone || data.number || 'No number',
        orderId: data.id,
        full: data
      })
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: err.message })
    };
  }
};
