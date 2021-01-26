import Configuration from './Configuration';

const rootUrl = (new Configuration()).value("webapiUrl");

export const getYears = (body) => {
  return fetch(`${rootUrl}/years`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => response.json());
};

export const getRankingsList = (year, gender) => {
  console.log(`About to get url ${rootUrl}/RankingsList/${year}/${gender}`);
  return fetch(`${rootUrl}/RankingsList/${year}/${gender}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getRanking = (rankingId) => {
  console.log(`About to get url ${rootUrl}/Rankings/${rankingId}`);
  return fetch(`${rootUrl}/Rankings/${rankingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};


export const updateRanking = (ranking) => {
  console.log(`About to PUT url ${rootUrl}/Rankings/${ranking.Id}`);
  return fetch(`${rootUrl}/Rankings/${ranking.Id}`, {
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
  console.log(`About to get url ${rootUrl}/PlayersWithCountry`);
  return fetch(`${rootUrl}/PlayersWithCountry`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getPlayer = (playerId) => {
  console.log(`About to get url ${rootUrl}/Players/${playerId}`);
  return fetch(`${rootUrl}/Players/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};

export const getPlayerName = (playerId) => {
  console.log(`About to get url ${rootUrl}/PlayerName/${playerId}`);
  return fetch(`${rootUrl}/PlayerName/${playerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.text());
};

export const updatePlayer = (player) => {
  console.log(`About to PUT url ${rootUrl}/Players/${player.Id}`);
  return fetch(`${rootUrl}/Players/${player.Id}`, {
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
  console.log(`About to get url ${rootUrl}/Countries`);
  return fetch(`${rootUrl}/Countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
};
