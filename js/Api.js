var api = {
  getCompanies(){
    var url = 'https://oggata.github.io/stockchecker/sample/api-001.json';
    return fetch(url).then((res) => res.json());
  },

  getPrices(){
    var url = 'https://www.google.com/finance/getprices?q=AAPL&x=NASDAQ&i=86400&p=1M&f=d,c,v,o,h,l&df=cpct&auto=1&ts=1489550582260&ei=4rrIWJHoIYya0QS1i4IQ';
    return fetch(url).then((res) => res.text()); 
  }
};
