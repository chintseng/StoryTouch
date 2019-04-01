// import queryString from 'query-string';

export default class Api {
  constructor() {
    // this.url = `https://hoz8cvhdb1.execute-api.us-east-1.amazonaws.com/${process.env.REACT_APP_ENV}`;
    this.url = 'http://35.227.183.188:5000';
  }

  // get = async (endpoint: string, token: string, params: any) => {
  //   const url = params ? `${this.url}${endpoint}?${queryString.stringify(params)}` : `${this.url}${endpoint}`;
  //   const res = await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  //   const parsedRes = await res.json();
  //   if (!res.ok) {
  //     throw parsedRes;
  //   }
  //   return parsedRes;
  // }

  post = async (endpoint: string, body: any, contentType = 'application/json') => {
    const res = await fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      body: contentType === 'application/json' ? JSON.stringify(body) : body,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        // Authorization: token,
      },
    });
    return res.json();
  }

  // put = async (endpoint: string, token: string, body: any) => {
  //   const res = await fetch(`${this.url}${endpoint}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: token,
  //     },
  //   });
  //   return res.json();
  // }
}
