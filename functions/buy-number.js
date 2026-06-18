exports.handler = async (event) => {
  const { service, country } = JSON.parse(event.body);
  
  const response = await fetch('https://oraclelense.com/api/v1/buy', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ORACLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ service, country })
  });
  
  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
