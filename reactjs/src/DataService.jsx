const API = "http://192.168.99.100:53316/api";

export const getYears = (body) => {
  console.log(`About to get url ${API}/years`);
  return fetch(`${API}/years`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json());
};
