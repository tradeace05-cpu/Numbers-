exports.handler = async (event) => {
  try {
    const { service, country } = JSON.parse(event.body);
    
    const response = await fetch('https://oraclelense.com/api/v1/buy', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ORACLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: service,
        server: country,
        quantity: 1
      })
    });
    
    const data = await response.json();
    
    // Send back the full response so we can debug
    return {
      statusCode: 200,
      body: JSON.stringify({
        received: data,
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
