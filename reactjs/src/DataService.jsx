const API = "http://192.168.99.100:53316/api";

export const getYears = (body) => {
  return fetch(`${API}/years`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json());
};

export const getRankingsList = (year, gender) => {
  console.log(`About to get url ${API}/RankingsList/${year}/${gender}`);
  return fetch(`${API}/RankingsList/${year}/${gender}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getPlayersList = () => {
  console.log(`About to get url ${API}/PlayersWithCountry`);
  return fetch(`${API}/PlayersWithCountry`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getPlayer = (playerId) => {
  console.log(`About to get url ${API}/Players/${playerId}`);
  return fetch(`${API}/Players/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getCountries = () => {
  console.log(`About to get url ${API}/Countries`);
  return fetch(`${API}/Countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};
