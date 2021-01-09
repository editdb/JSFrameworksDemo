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

export const getRanking = (rankingId) => {
  console.log(`About to get url ${API}/Rankings/${rankingId}`);
  return fetch(`${API}/Rankings/${rankingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};


export const updateRanking = (ranking) => {
  console.log(`About to PUT url ${API}/Rankings/${ranking.Id}`);
  return fetch(`${API}/Rankings/${ranking.Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ranking),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.body.length>0?response.json():{};
    }
    return response.text().then(text => {      
      return Promise.reject({
        status: response.status,
        ok: false,
        statusText: response.statusText,
        message: text
      });
    })
  })
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

export const getPlayerName = (playerId) => {
  console.log(`About to get url ${API}/PlayerName/${playerId}`);
  return fetch(`${API}/PlayerName/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.text());
};

export const updatePlayer = (player) => {
  console.log(`About to PUT url ${API}/Players/${player.Id}`);
  return fetch(`${API}/Players/${player.Id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.body.length>0?response.json():{};
    }
    return response.text().then(text => {      
      return Promise.reject({
        status: response.status,
        ok: false,
        statusText: response.statusText,
        message: text
      });
    })
  })
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
