const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Get quote from each url in array
  // Return array of responses
  return Promise.allSettled(urls.map( url => httpGet(url)))
    .then(processQuoteResponses) 
};


const processQuoteResponses = responses => {
  // Process the responses into the required format
  const quotesArray = [];
  
  for (const response of responses){
    const responseBody = JSON.parse(response.value.body);
    
    if (response.value.status == 200){
      quotesArray.push({"Arnie Quote": responseBody.message});
    } else{ 
      quotesArray.push({"FAILURE": responseBody.message});
    }  
  }
  return quotesArray; 
}

module.exports = {
  getArnieQuotes,
};
