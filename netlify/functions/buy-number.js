exports.handler = async (event) => {
  try {
    const { service, country } = JSON.parse(event.body);
    
    const formData = new URLSearchParams();
    formData.append('api_key', process.env.ORACLE_API_KEY);
    formData.append('product_id', service);
    formData.append('server', country);
    formData.append('quantity', '1');
    
    const response = await fetch('https://oraclelense.com/api/v1/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: err.message })
    };
  }
};
