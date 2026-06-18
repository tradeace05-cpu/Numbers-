exports.handler = async (event) => {
  try {
    const { service, country } = JSON.parse(event.body);
    
    const response = await fetch(`https://5sim.net/v1/user/buy/activation/${country}/${service}`, {
      method: 'GET',
      headers: {
        'api-key': process.env.FIVESIM_API_KEY
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
