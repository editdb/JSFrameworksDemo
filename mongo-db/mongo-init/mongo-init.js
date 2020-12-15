conn = new Mongo();
db = conn.getDB("admin");

db.auth('root', 'rootpassword');

db.runCommand({ createRole: "listDatabases",
    privileges: [
        { resource: { cluster : true }, actions: ["listDatabases"]}
    ],
    roles: []
});

db = db.getSiblingDB('tennis_players');

db.createUser({
  user: 'tennis_user',
  pwd: 'tennis_pass',
  roles: [
    { role: 'dbOwner', db: 'tennis_players'},
    { role: 'listDatabases', db: 'admin' }
  ],
});

db.auth('tennis_user', 'tennis_pass');

try {
   db.country.insertMany( [
  {
    "_id": 6,
    "Code": "arg",
    "Name": "Argentina",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/arg.gif"
  },
  {
    "_id": 4,
    "Code": "aut",
    "Name": "Austria",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/aut.gif"
  },
  {
    "_id": 7,
    "Code": "bul",
    "Name": "Bulgaria",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/bul.gif"
  },
  {
    "_id": 9,
    "Code": "can",
    "Name": "Canada",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/can.gif"
  },
  {
    "_id": 11,
    "Code": "cze",
    "Name": "Czech Republic",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/cze.gif"
  },
  {
    "_id": 14,
    "Code": "den",
    "Name": "Denmark",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/den.gif"
  },
  {
    "_id": 5,
    "Code": "ger",
    "Name": "Germany",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/ger.gif"
  },
  {
    "_id": 8,
    "Code": "gbr",
    "Name": "Great Britain",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/gbr.gif"
  },
  {
    "_id": 10,
    "Code": "jpn",
    "Name": "Japan",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/jpn.gif"
  },
  {
    "_id": 13,
    "Code": "ned",
    "Name": "Netherlands",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/cze.gif"
  },
  {
    "_id": 17,
    "Code": "pol",
    "Name": "Poland",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/pol.gif"
  },
  {
    "_id": 12,
    "Code": "rou",
    "Name": "Romania",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/rou.gif"
  },
  {
    "_id": 19,
    "Code": "rus",
    "Name": "Russia",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/rus.gif"
  },
  {
    "_id": 1,
    "Code": "srb",
    "Name": "Serbia",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/srb.gif"
  },
  {
    "_id": 18,
    "Code": "svk",
    "Name": "Slovakia",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/svk.gif"
  },
  {
    "_id": 2,
    "Code": "esp",
    "Name": "Spain",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/esp.gif"
  },
  {
    "_id": 3,
    "Code": "sui",
    "Name": "Switzerland",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/sui.gif"
  },
  {
    "_id": 15,
    "Code": "ukr",
    "Name": "Ukraine",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/ukr.gif"
  },
  {
    "_id": 16,
    "Code": "usa",
    "Name": "USA",
    "ImageLink": "http://a.espncdn.com/i/flags/20x13/usa.gif"
  }
] );
} catch (e) {
   print (e);
}


try {
   db.player.insertMany( [
  {
    "_id": 22,
    "Name": "Agnieszka Radwanska",
    "Country_id": 17,
    "Handed": "R",
    "Dob": ISODate("1989-03-06T00:00:00+0000"),
    "HomeTown": "Krakow",
    "HeightFeet": 5,
    "HeightInches": 8,
    "Weight": 123,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2005
  },
  {
    "_id": 5,
    "Name": "Alexander Zverev",
    "Country_id": 5,
    "Handed": "R",
    "Dob": ISODate("1997-04-20T00:00:00+0000"),
    "HomeTown": "Hamburg",
    "HeightFeet": 6,
    "HeightInches": 6,
    "Weight": 190,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2013
  },
  {
    "_id": 8,
    "Name": "Andy Murray",
    "Country_id": 8,
    "Handed": "R",
    "Dob": ISODate("1987-05-15T00:00:00+0000"),
    "HomeTown": "Glasgow",
    "HeightFeet": 6,
    "HeightInches": 3,
    "Weight": 185,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2005
  },
  {
    "_id": 16,
    "Name": "Angelique Kerber",
    "Country_id": 5,
    "Handed": "L",
    "Dob": ISODate("1988-01-18T00:00:00+0000"),
    "HomeTown": "Bremen",
    "HeightFeet": 5,
    "HeightInches": 8,
    "Weight": 150,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2003
  },
  {
    "_id": 17,
    "Name": "Caroline Wozniacki",
    "Country_id": 14,
    "Handed": "R",
    "Dob": ISODate("1990-07-11T00:00:00+0000"),
    "HomeTown": "Odense",
    "HeightFeet": 5,
    "HeightInches": 11,
    "Weight": 139,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2005
  },
  {
    "_id": 4,
    "Name": "Dominic Thiem",
    "Country_id": 4,
    "Handed": "R",
    "Dob": ISODate("1993-09-03T00:00:00+0000"),
    "HomeTown": "Wiener Neustadt",
    "HeightFeet": 6,
    "HeightInches": 1,
    "Weight": 181,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2011
  },
  {
    "_id": 23,
    "Name": "Dominika Cibulkova",
    "Country_id": 18,
    "Handed": "R",
    "Dob": ISODate("1989-05-06T00:00:00+0000"),
    "HomeTown": "Bratislava",
    "HeightFeet": 5,
    "HeightInches": 3,
    "Weight": 121,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2004
  },
  {
    "_id": 18,
    "Name": "Elina Svitolina",
    "Country_id": 15,
    "Handed": "R",
    "Dob": ISODate("1994-09-12T00:00:00+0000"),
    "HomeTown": "Odessa",
    "HeightFeet": 5,
    "HeightInches": 9,
    "Weight": 132,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2010
  },
  {
    "_id": 20,
    "Name": "Garbine Muguruza",
    "Country_id": 2,
    "Handed": "R",
    "Dob": ISODate("1993-10-08T00:00:00+0000"),
    "HomeTown": "Caracas",
    "HeightFeet": 6,
    "HeightInches": 0,
    "Weight": 161,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2011
  },
  {
    "_id": 7,
    "Name": "Grigor Dimitrov",
    "Country_id": 7,
    "Handed": "R",
    "Dob": ISODate("1991-05-16T00:00:00+0000"),
    "HomeTown": "Haskovo",
    "HeightFeet": 6,
    "HeightInches": 3,
    "Weight": 179,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2008
  },
  {
    "_id": 6,
    "Name": "Juan Martin del Potro",
    "Country_id": 6,
    "Handed": "R",
    "Dob": ISODate("1988-09-23T00:00:00+0000"),
    "HomeTown": "Tandil",
    "HeightFeet": 6,
    "HeightInches": 6,
    "Weight": 214,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2005
  },
  {
    "_id": 13,
    "Name": "Karolina Pliskova",
    "Country_id": 11,
    "Handed": "R",
    "Dob": ISODate("1992-03-21T00:00:00+0000"),
    "HomeTown": "Louny",
    "HeightFeet": 6,
    "HeightInches": 1,
    "Weight": 159,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": null
  },
  {
    "_id": 11,
    "Name": "Kei Nishikori",
    "Country_id": 10,
    "Handed": "R",
    "Dob": ISODate("1989-12-29T00:00:00+0000"),
    "HomeTown": "Shimane",
    "HeightFeet": 5,
    "HeightInches": 11,
    "Weight": 170,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2007
  },
  {
    "_id": 15,
    "Name": "Kiki Bertens",
    "Country_id": 13,
    "Handed": "R",
    "Dob": ISODate("1991-12-10T00:00:00+0000"),
    "HomeTown": "Wateringen",
    "HeightFeet": 6,
    "HeightInches": 0,
    "Weight": 163,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2009
  },
  {
    "_id": 24,
    "Name": "Maria Sharapova",
    "Country_id": 19,
    "Handed": "R",
    "Dob": ISODate("1989-04-19T00:00:00+0000"),
    "HomeTown": "Nyagan",
    "HeightFeet": 6,
    "HeightInches": 2,
    "Weight": 130,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 2001
  },
  {
    "_id": 9,
    "Name": "Milos Raonic",
    "Country_id": 9,
    "Handed": "R",
    "Dob": ISODate("1990-12-27T00:00:00+0000"),
    "HomeTown": "Podgorica",
    "HeightFeet": 6,
    "HeightInches": 5,
    "Weight": 216,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2008
  },
  {
    "_id": 12,
    "Name": "Naomi Osaka",
    "Country_id": 10,
    "Handed": "R",
    "Dob": ISODate("1997-10-16T00:00:00+0000"),
    "HomeTown": "Osaka",
    "HeightFeet": 5,
    "HeightInches": 11,
    "Weight": 152,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": null
  },

  {
    "_id": 21,
    "Name": "Serena Williams",
    "Country_id": 16,
    "Handed": "R",
    "Dob": ISODate("1981-09-26T00:00:00+0000"),
    "HomeTown": "Saginaw",
    "HeightFeet": 5,
    "HeightInches": 9,
    "Weight": 154,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 1995
  },
  {
    "_id": 14,
    "Name": "Simona Halep",
    "Country_id": 12,
    "Handed": "R",
    "Dob": ISODate("1991-09-27T00:00:00+0000"),
    "HomeTown": "Constanta",
    "HeightFeet": 5,
    "HeightInches": 6,
    "Weight": 132,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": null
  },
  {
    "_id": 10,
    "Name": "Stanislas Wawrinka",
    "Country_id": 3,
    "Handed": "R",
    "Dob": ISODate("1985-03-28T00:00:00+0000"),
    "HomeTown": "Lausanne",
    "HeightFeet": 6,
    "HeightInches": 0,
    "Weight": 179,
    "Photo": null,
    "Gender": "M",
    "TurnedPro": 2002
  },
  {
    "_id": 19,
    "Name": "Venus Williams",
    "Country_id": 16,
    "Handed": "R",
    "Dob": ISODate("1980-06-17T00:00:00+0000"),
    "HomeTown": "Lynwood",
    "HeightFeet": 6,
    "HeightInches": 1,
    "Weight": 161,
    "Photo": null,
    "Gender": "F",
    "TurnedPro": 1994
  }
] );
} catch (e) {
   print (e);
}


try {
   db.player.insertOne({
    "_id": 1,
    "Name": "Novak Djokovic",
    "Country_id": 1,
    "Handed": "R",
    "Dob": ISODate("1987-05-22T00:00:00+0000"),
    "HomeTown": "Belgrade",
    "HeightFeet": 6,
    "HeightInches": 2,
    "Weight": 172,
    "Photo": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QEhUQDxAVEBAVFRUVFRAQEBUVFRAVFRUXFxUYFhUYHSggGBolGxYYIjEhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLf/AABEIAKkBKwMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBQYEBwj/xABBEAACAQIEBAMFBQcBBwUAAAABAgADEQQSITEFBkFRE2FxIjJCgZEUI1KhsQczYnLB0eFDJFOCorLw8RU0dJLC/8QAGwEBAAMBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAAzEQACAgEDAgQDCAEFAQAAAAAAAQIDEQQhMRJBBRNRYSLR8DJxgZGhscHhIxQzQlJyBv/aAAwDAQACEQMRAD8A8SIliRhkECRkBAFgCQAgBIASQKJIJFkgcYJImkAbIICQAgCpTZiAoLE7AC5PoIB2twfEL71Mp/MQCPUXuIyTgSpwquouU09R+m8DDONkI3EEAsvEhkyTeJRisJLRCZA055GiElSQkgIwBQJZIhkglyBGkMDDKFhJACSAgC2kALSCcCQQEAlMFiMwVEkAJIHQBDAEgBACAKJIJFgATBIwmQBsEBAJsJRDsATZerWvYf3gI3XCvARctCmtO+71HvUYAWux8yPdFgL9Zm2aKJNjMXSIA98KN6SK9/Ww0tBLwZbHYosTlJK9MwGn9pJVlcK1jcgONir3sd97WN/SWKk/E+GmmqV0F6FQDKb3yNYFqbHuO/W3rJTIOFTNUymAYyXIJERmTLhIASQKJIHCWRUcJYCGVYGGUZIkgkJYDgJbBA4CVZZDrSrLojYSCrQ2SVJCYLDDBUSQBRLYA6QBpgCQAgBJAogDhAAmQSNMECSAAEAvlNBKSIqFsQdXqE+ytxtbuP8AvzhlkSfbSgyo9NW6kkn+m8jBOR1apZRnqCox19kkgehtp/iCeCnxFbXc/wBvSTgo2c4fvrLYINNgeJUKlJMGy2R9CxI+7e5yODa97+gs5B2JMAzLqVJU6EGx8iJdMgQmTkDJUkIAQBRLIhjxLEATIbA28qSIZBIkhAUCXQJFWXwTglVJDRpFAyyjRdohaVM2NtBXAhMFRIASQSKIAGSBhkYAkYAQAgCiAF4AXkASAEgCobGAda1MvmT1P/mS4hMb9tqjTxGt2zG30jBOQD331ggieMAKdJm2F44JwCEqeoI+sgYwSY5wzlh8Vj8+vz6/OSiDnvJAkgBJAQBwlkQLJIEJkNkiSCRJVgIQHLLoEimXTLkymMmkQaUZZnO0qZMLQCODMIAogDwZIAmAMMALRggLQAtBIkgBIAQAkAJICAd2Domo2X1Mkg7KnCWJHQeglepF+lnZh+X2bQC57XX+pEhyRdVNl/wrkTNrWcAfhDKWP0uBMp3Y4N4abP2i7wnK2Ho/Dm7XnPK2UtjphTGJ55zBTRMRUQLYBjtOutPp3OC3HW8FNXtfTtLmJHJyAkAJIASUBwliBTDYQyVJCAEgBAASQOBk5JTJFeMl0x+aC6YwiQRgLQTghgwCAEAW8kBeAKIA9RJIFKwSMYSAMkAJACAEAIBccp4fD1MSq4pDUpWYlFfIWsNBm6f4lZy6Vk2oq82ah6nVw2hkxNREBsobLm3y39m/c2lovYzksN4NFw7iFOiR9qoadGWxt6jeYzqfKOmu9LaSNhw7HYZ0PgEFewvofSc7hJcnZGUJLYjbmjB0rpUJqEHREXNf0HzkqqbIldXHlnPX481S5TDMtL8VxcX7raXVDW7MnqVJYR57zrhyuIv+NA2nXcf0nRFnHZH4iLjvAEw2HpVfFLV2I8SmFGWmHUsoDd7DX18pWM+psvbR5cVLPJnZc5wgCyQKJIHSSBpMhkiSoCWASAEgBACSB6iSWiSrJNoofaC6QloGDlkHIEAIAQAgD1kglUQSK0jIIWggZACQAgBJASAWXLx/2hB0Icf8jSsllGtEumxM0+Cp/eVHIs2VAB2Htf1/SE9sl7IpSaRX8RwDMxcnXNe53t216SyeTKUGi55IotUxPg6rTYHY6i2wvM7ZYWxtp4NzIOYeEYrxnpWyUwzZX1CML6EkDXT6GTGaaIlTJNl5y3wGrTIKORTygMDezNb2iL7CTKyKEaJNchx7h2bE4YoAXHiKL7C1NmBPzH5zFSxlm9kMuK7lHz0p+y03en4TtUAI6NkV7sPm0VPqbaJ1ceiuMfcwk3PPCAEkBJAXkZAQAkAJYBIAkgBAFgD1kovElUyyNkyQGWRPUJeTgr1nJMznCAEAIAQB6yQSgyCwhMgEbQQMMkgIAQAgBAJ8DX8OolS2bKwJX8QB1HzFx85BKeNzc0sd4z+ML5HvZihUEg6i53Ivra+8tGO2CXPLyd9Pwz7+omE4NcHZVZFr4i05WpqMR4lgEUHLYi500mE/RnXVHOWaBwGFiL9dRt5iUSfJZ44Ijisvs9JvGvJz2WqJS4nFouIRmZUtcBqhsNRci/mAZrKHw4OWNmbE2zE/tG47TxVZUotmp0gfaBupdrZsv8IAHzvIrgoIrqLfMkZGXMAgBACAEASAEAWWASAJIAQDrwPD6tY2pre256D5y8Y9TwVlNR5NDwfCYejUSnjqIfD1CFaqt1elfTMD1AO80nS4lYWqRYc/8m08CFrYaoXolsjqxuabWupB6qw+n6ZI2UjGBpqiHIXNJI6zmmIFIkgSQAgBAHCAPBkFhCYA0wQJJIEgBACAEAIBsziVNHDH3alOkKWXoyEmorDzDOwPfMJ6mp02KIWL0WV9/c4qZ/5ZxfdklbGWW+/lPLlud6eCPhnHqtFj8Rb3fI9j5SOlPk0hfOHBtuXuM3pH7Q2ZydwAMo6CYTi87I6K7tviZ0Y9lB9k3v595tB7HPbhvY8658xF2Wne+pY+v/ZlpcGHcyUqSEAIAQAgBAFgBJASQEhgJALPgPCWxL2uFpr7TsTb2eoHnMrrfLXu+Csng12Jq06C5KCWHwU7+8PxOe07NNXKuPVZvI5Xmb9ijxdN3JLnMfPYjyHQdu80lJy5NUuksuI8TavhDTZrnw00P4kNr/kJzcM3MUDLplcC5o6hgQLKFgIkgQxggSMEi2kAWAF5BIl4AQQEkBJICAEEiSAaPl7lSviKbYpkK4RNWqEH7yxtlTvroW2GvXSdWl0/nWKL2Xc5r9TGvZfaI+K1rsSNB0HYdLT2tY02124OehYQ1MVmFut/0E+dmul4PQTyOwuHrs9krJbvVI0+oldzaMU+5p8HwmsqmpUxKsB0SmAPkdLyqnvjBEqtspna3EktdddtL9bSYoo3scXFeEU61LO+rXN3HvUydie6m35fMe7o9HXfp8TW7bw/T69DzLtRKu7C4/cwGNwr0Xam4synXz6gjyIsfnPGuqlVNwlyj0ITU4qSIJmWCAEgBACAEkBACSAkAkw9FnYIouxNgJDaSyyG8HoHDcEtCmKQAK3Adv8AeVDsPQSNLX1Pz5/gcspdbwhmIphKbVX9ttVP8Rucq+g0+k6JTy8s6IxSWEZirxKpm1sRc7CVUmS0hwYFT6sBbYDeUfJYo4ASMg6lSWQG1Ek4BDaMEC2kgLSAhDKkiSCRIAsECyQEkgJYCohJAAJJNgALkk7ACQwa3g3BcHhaofizEhQD9koKWct+Gs2ioB1UEnobWM7qvD7GlOeEvc5LL3JNVc+vyNk3N9bGIadHCk4RVy5FwYyKugy5mrBTpsAAR0tPRqqrT2zn8v4RxOlR3k9/v/pmS4tw5GUlKWISp/FRvTPkWVmy9NSfl1l7o9Sw3ubVy6X7feZN7q2VhYjQg7ieFfH4t+T0I8ZRZYZy1iANNyZl1Y2LYyXVXHMVyk9NQDpK4yS2ScLpknMbm5sPrEttiI77k/L+PFWvVw7vkDOwR+g1y2PkbA+oE+h8MufldHpueXroYl1lJz1galCsqVFAbJYFTcMATYg/Ocni7jKyM491+xvoJZg17mankHcEAJACSAkAIAScgJAO/gXC3xddKCaFja/YdTMdReqa3N9ispYR9M8ocn4PAUlVaStUt7VRlBYn1nxmo1tl0uqb/AvXBNZkM5u4Bhq9I5aYSoNQaYC3I1sfWdXh/iF8LFFv4fRmdqhF5iebcW4MaiKhJQXGYAb20Fr7D/zPsVuWMDzFww4aplvmQ6qevzHeSCDCsRSt0ub/ANJBJTyALALACaEEVSQSQERkBIyBLwBpkASVJCAKJJA6AEkCgSyIZqOU+EuSK6qWcG6AfABu5PTyPTftPb8M0cWvPs47L+fkedrNRj/Gvx+Re00LN4NCmtasT7bkXpr6/jP5T3LJben19bcnDFY3k9uxpOH8pVKj2d/FqLbNUqn7ulcaKlJfZt5fQzzpXxisv8l9fP3Du9EWOJ5Xyj7yqCAN2IAX0BuQP+KTXq4vhfX17GTmzLcX4Pg2OVqtGq2wIq3I+rGdEqq7l/kh+ZrXbZH7OTJY7gdSkWNIlkGpTdgO4/EJ5mo8LUfihwehVq+rZ8nLhSzG9s48t/8AM43op4zXv+5s7UtpFxh+JBVap+BTYen+Z5k+cHVDjJRcHds4Y3sTcsAdDuTpPb0DammuDj1K+Flpz0viZK5qFiQEysOgG4I3Gn5y3jNWFCa91/Jj4fLHVHHuZKeEekJIAQAgBACAEAIBuv2Qqn2y7bhdP6zx/Gs+Ssephc8JHv648T4yXVkiNxScX4uykg2Hn5Ts0dLsnFe5nOeTGcw4/wANC4NnUEi+z329Z+gJYR1I8749WapToNUN3PiE382FvSSSVAJCHXTXTzgkr5UCyQduaaNlURu0qWGWlScDTAGmMkCGSBJACCRRBA6AEA6MFhmqutNd2Nr290dSfIDX5TWquVk1CPLKzmoRcn2PQaFUIKmHo2SkAgv8dgNi3qLnzE+0pqjBRj/1WP7Pn5tyfW+WWnBqRVV8EfeM2WmnRiur1azdVUnRe4G5mVz3eeFz8l7vuystzWJilwyBAxJ1Jc71GPvMfMn6aDpONVO2XU1/S9DN7sq+IcSpP7yms3RLFwPkTlH6zeumUONl+X9k4I6XDsXiALYZKaEaF20INtvZ132Fzr6RLU005zPL9F9fub10Tnwir4nwepQKl0UXvY0nDAEWv6b/ANO82o1MLs9PyLWVygl1MymK4Z4dQmnore0B27j6yP8AT9Esx7l/O6o/F2GcWWllGZfaa2axtoO9utxMdVotPY1KUd/VPBpp7bVlJ7HVgGoPSFMoAq2sFuNe973v3nRVVUoKEVsjG1zU+pvkrObfcp22DEDy0/xODxuOKoff/B0eHvM5GWnzJ6oSAEAIAQAgBIAQDR8i4k0cQKnQaEDqOv5Tm1lHnVOK5Mb49UGe3YXF3AYG4OoI2M+Ms07TweSrMFXzBWsMx9ryHSer4Rpn5vV6G9EnKZR4mmldPDq+4fdYbrPq8HpoxHHWD13GdclNLKw932RoB3N5Ukz9W4XXqIBySpIssDpLSzZVDSZUuhZBYYxghjDBULSQLljBImWRgBBAQAgGj5TYKKr21ORQbdLlmA+in5DvPc8ErTnKbXGEvx5PP18tlEucLVu9U21OXTta8+gT+JnnyXwosjjDTfQ2yKEBHf3qn/MT9JnzlsrjKOfE8Yd21OkRaRKrwaXl6lSVS9amar3XIpN6VVXUkEWsD7jg3Iy/zbcGqunJqMJYXf1TT/tYxz9x001xW8lv+hKOY2eo9LDgVUuWqVagJSn71wmYgOpAYhWHfUKvs4OqFSXXnPZLb05aXPq1+730zKbeOPr63/YsMVRooobE4sugPut4ajLZVuLKpPsqNiTovnatVlspf4o4+uN8937fOZwrS+Pf6/D+TN45KFQ3oXya62OUHb2SdbaA7+U9il2dP+Tk4J9Kl8PBh8XTqsXU6uL3vpqOlv0nPPzZxaXJ2xcItPsT8vKcuvr85fw6L8tdRnrH8Wx188cPFPC4ernu1RmJS4uoOYKbXvY5D9D5TyvGdV1z8rH2X/B0aCrpXX6mHM8JnohIARkBACQAgBAFUXkpZBc8LorkL2zeza+awVydAQNSLaWHeWg9yk+DTcH43isOmRXDj8LdCe3QWHwj5znv0VV0uqS3OWzTwnuWnj1av7xitQ/D0M1pojVHETSqpQWwmOxJw9Eva5tbIehPX0l2boyPEEC0MwH75gRntmAG9h6wl2DKDEHpEthEglCwssCQtJAoaQSKTIJGEwBsFSWmskk6BTgtgjdIIwQMIIY2MEHXwnh9TFVqeHpAGpVcItzYXY7k9ANz6Qk2VlJRWWa77EmHTw6b+IFZhnAsKhv7wHY/oBPtNJp/9Pp1Hvy/v+tjw7bXbY2QU6hVmI7j9Zo9mycZSGtVJOpvKNk4GmSlsCw4e2KqIadMsKXxFVzHzCX0XzO3e+0xlHMlJbNd/rn+C3UorEt/Y2fCq1KlSHgNkYoFIJD5W0LMbDVyw3DagL7oGWcb0s5v4ltnOe77L8Me236lpalRW3p+BWf+lKWLohr1tTqAzN3IvZV9dB5zqv1NOlhmx49P6RnTVdqJdMF9/wDbLvg3CahJbFWA+GijXH/Gw3PkNPWfL6zx2614q+Ffr9fd+Z9BpvBq697Pif6f2c/HuRDV+9wxPiAaKW99fw3PX1mmh8cshNK/devdfP8AcjU+GQ6f8W3t2/r9jDYHDPSUJUUo4vmVhYqb6gz6/QNOiMlumsnz+rT81p9jj50xOalh0F/Zz5tdGsbpp5Bm+s8LxvT9Fis/7fwjs8PnmLj6GSnhM9ESQAgBACAEAIB0UTlB0BuCNRtft5zWPwplHuy75RwYq1VRgxUtqENmYdgfhv33te0VxyRJm95h4LhcPUy0kKUymihiQhHQE7jrLOLiQmmc60jojEFT7lUa5NrX+u0hv0LFFxF6uNxIoLtTvcqdCF0LN3MoXKnmfFo9cBRpTULfoTboOgl4+pST7GertczObyyyWwwSESEkC3kAAYAXkAS8AUSQTUjGSUdKtGS6G1DAZzPJRRjJJBe8qIyVPtKmzUiDTbtU3B87D9Z63hOlVs3OSykv1f8ARw62zEVBd/2L/HVw5zqoUNclRsCd7Dpr0n0v/FHmRWHucYFyfMW/tKpZZfgiG8yS3wXY7TrqP18paT7EIlao7CxY2Hw9PpKkC08U6EEGwHSS20sjpTNTwHjd000c6se/b5AaT4HXWWXWucnzx7L0PrdDGuupQj25+81HA+IeKctwZxNYOzqTNhQotlsupHT/ABGG+DJySe5m+dOVziE8aktsSg1X/eqOnr2+k97wXxR6Wfl2/Yf6P1+f5nleI6NXx64faX6+3yPE+bxZaY/ib9BPc8fx0V49zyPDuZZ9jMz5k9UIAQAgBIACSCWlTuQCbXO5ghneHWg4NhVAvodiCpF/z/KayeI47lI7vJ3cFrFDnpXDqbob/u76Am3U7dzsLCRB43Qksm3L1SXZm8W7sGucwuPDG3RvIaDrJbzuyVHGyKTmLiYpL4OHYkOPa6lNNbHue/lKNkpEuBp/YMM1VyDUYAqh3cnYX7R7E5MTXqklmbckk+pmr+FGfLOIznNQkoBJASoCAEASALAHqZJKJQ8gsBaARMZYqCKWIVQSSQAALkk7ACCGbDC4Xwaa0iLPu4O4c7j5bfKfZ6CjyKIxfL3f3s8O+zzLHJcdh7bETqa2Mu5AGtM84NMHLUrnMSJg7H1No2jBY3JaRPX6y8Yy7lJJdibWW6Wig2tsfQyLtq2/ZlofaSJcOxWxGk+HlHKPoITw8mi5Y4wlEtVqG1tAO95z2V7bHTC3nJ6Lytzph8Q2Rhk7FtAZl09L3LvE18JuaFanUFgVcH0M1Ti9jllGUNzz7n/9llHHDPhqn2eqCzZWuabs1r5huNtx32nVPVWzhGuTzGPBjGmvqcksN8ng/M/K+M4dUFLF08hOqurBkcDqpH6GxlIyT4JlFx5KWWKhACAEgDkElA7sEAoNQ9NB897ec1isLqfBnLLfSjnqXY+ZmTbbyzTGFgueAIbFb5QDrY2Yd7H/AExbdzr0G8lEG5oldTewBqFgQFsuc206Icvu7t1liCiwGFSpVbGVNEYO1JG09xbBj2W42kElNx3iBxVQOBZQiKAepUam3rebwg8ZZlOa4RQ4qoCbDYde5mVksvCLwWFuQTIuEAWAJACAEAIAsAUSSR4MgkS8kDSYKlry5hGep4my0iGv/Fug+ov8p6Xhel86/L4ju/4OTWW9FeO72NXXxtKoSz0QHO7IzJc97ai/oBPqVFep5OJI5Seg1XsTcj52miUl3GzIaiWkSiWTK4zjS3Oskzk9Zp1NlcJGr4fy9ah4+KxOSm1POlFEao4zL7DvZSwHkARbqJyy1klPpW6Tx9e5Dgm8Jb+pnMa+VGPYH67frOjWWRWmnKO+z+RWmL81JjuGYrxh7jL5/DfyP9J81Rorbk3COUenZfCv7TOmvRZBqDlNxe2l+tjMbdPOp4msFo2qa2Zb8K5hQIKVaktSkNAVAVl8ww1Bnn21S5id9V0eJGr4LiXVlqYLE5hf91WOo9G6zjzh+jO1rK9UbrhePxeLY0/ZphLCrVX2spIvlW+hfY67A67gHorUp88GNkKqY9T3b4X8v2/cs8byxgMUhp4iiMQt9fFZnIPkb+ydelrToUUuDildOWz/AGR5tzH+w/AG7YXGNhWOop1ytRAOwNwwHmSZbKM1FvhHkXN/J2M4W6piVUo9zTrUmzU6oG+U9CL7EAyWiDPyAbb9n/7OcTxQiqxOHwYPtV2U3qWNitEfEdCL7D8pKQM5xLAgVqlOhqgq1EVSbsFR7LmPcj9DLxg5bIrKSjuy8o8p1XQPXrU8NSA3c2A+u5nY9NlZm8I5VqMPEVllZxHh+FpH7nHrWYdqLgX8m2nPOupfZkbQnY+Yllj+Zziq6V61JKeVaKMtJSadTw/9RhfV9SddNu0xwzXJ3JzBRtdAWfMxCAFst2qkMT8THMvkJZKT4RDaXJW4mpVqixGSmCxC3sfaYn2j212nTCjG8jCd2dolJjsUPdQ36Fh18h5TK23OyL1192V85zYIAQAgBACAEAIAQBYAt4AXgCSQazhFDw6Ivoz+0fT4R9P1n13hdHk6dN8y3+R42rs67cLhbEjBepna1HuzJZGLl6AmVXR2WSz6u5NfTa3zm6ba4M8YZWkTjOs7eC8MqYuqKNKwYgks17KBuTYHyHzlJ2KCyyXsssvsTy/iKlY0cXicgy5kORmpgKPwIQAw6DTTW+1+XPUvgj8/z+sDzIxjkdi+VMEieC/EAjEBsv2eplN9R7YLW26i/lNlXK2ny1W+n2azt95l57U+vuXuD4e9SkEoYbCYpEGX7j7qqApGoJIJ/mI11loyrofT1Th6J7r9v5MpdU/ie50twOq1x/6PlBBA/wBrOjWtm1axFiNLbjfcSlltU49M78r/AMhKUd4x/Ux/GeXMVhx4rUWpqTlN7Fb9rg9p4+u09UJZollPt6Ho6a+U1ia3KzCY2pTYFSUNx1t1nkWVKXKPTqucX7H0NypUYYOlRSy1si52JuVd9areZuWsPTpOh6fy4oyt1HnWSl9Y7FjxziiYKkoS2dzkpqTe7G5uSd7C5Mwk+mLky9UOuWCp4FxKlTDePVJJYsz1bAknv0tOOM8vLOy2t4SiWGNocPxiinUoUsSgOYK9NWUG1rgNpex3mjtS4MXTYt5GaxvIfBql2qcOpIov7hqUixHlTYaS9DnY/YrbGEFzuWCYgKq0qCinTQBUVRZUVRYBR0E9evTYWZHlW6nG0TynnrgOC4YDiUrOK9Ri1PDkKwYk3Y6i4UX3+UtOUK1lLcyqlO54fB5pjcdVrtnquXPS+y+QGwE86c5TeZHowhGKwjmJlS4tKsyG6sQfKSpNcFGk+SwTmDEgWzL/APRb/UCbLU2LuZOiDOTFcQq1dHckfhGg+glJ2ylyy8a4x4RyzMuEAIAQAgBACAEAIAQAgC3gCQDp4fhjVqKg6nXyHX8pvpqXdbGC7v8ATuZ22KuDka6u2vl2n3DwtkeHHfdkJtKfCW3DNLZzwMABJSBBUw99b2HaZSqzvk1jYaPkbhWLc1KuHVVBRqa1qjuqg5gTly+/t6aTgushsm9vYvOSS3L3HYDiWEpgriqji5ZimcgE3LFmte1+4tr2vNqrNNY+lw/PlnK8t5OGnzbi1utU0sQAf9WmrD5MtridH+gql8Ucx+5/MdTWxLR45gXa9fh6qdTnw1VkI32Xa9j3h6XURWIW/hJZ+vyCnHujtHHMKqkUmxiE6EfaDoA2ljm7E6EdTtvM/wDR3SfxKH5f1/JV2xXGSOjxekdGw7VLg5Gr1KlYWBsAEJAJ21vLT0ksY6l7pJL9dyqtwYjifEsP49SnYJZiNrIGvqo1Nrec+Z1vkq1xrey/fuezpvM8tOR6b+zrj5emKRY+PTGoY3NRL+y4PXTQ/wCRNKnGyHTLlGd7dcuuPDJOceIPUxNIH4aRyeTs1mPyAE87XVOOF2PS0Nyks9yHmDjFHF4Y0k0qpYs/VyosbDtOOMHFp42O3KmnuV3K3Mz0jkY3ynQ+XaLau6LU2da6ZG2xHF/HYID0BseoM7/DcPOeUeZ4knDjgj4pxBcNSdgVNUIzIjGwYgG1+oF52ajUKv5HnabSTvbfCXc+b+M8Wr4uq1fEOXqN9FHRVHRR2nnzm5vLO+EIwWEcV5UuF5AEgCQAgBACAEAIAQAgBACAEAIAQAgBALzlmlq9TsMo+ep/T857vgdWZys9Fj8zg18/hUS4qbz6FnnrgZK7EheXyMEdSuBoNT2G/wDiZzujHZbsvGtvcfhs2YMwDb+wVDKbi2oOh3hVys+3+SJc1D7Je8P40MO5ehS8MlSoVWDIgNts6kkmwvrrIs0zlBQbz+GP2f8ABlnPJp8Dzwh0roGFgGKCxa+h+7a6gd7vOKegkvsv6+/+iU0WuF4lw5CagwrUFbRqjYX2SL9SlwBfqZhOrUSWOrPt1fPBfKL40sFXTMooVRbdfDbT9Zxqdtcsbr80XcYtZM1hOJ4U1hQwuFUoG9p/C1GvtN3VRpqfynpWUXKvzLZ7+mfyRzKUHLpSODnfmSnhqFXw3DOQ1KnkN2VmuCS97i2psN8o1nHepVUuxrHz7bG1FassUTw0z589s6MFj61Fg9Ko1NlNwUYgg+UtGTi8ohrKwa3h/NmMxdRftNUO1MEociqT+K+UC+wlp2SsWJEVVxreYnSrFTmU3U6nyMlLCLZ3yM8cq4cbHcyjjlGkLHGWS8bHVWCGmSHUaOOkmmEq31RGpuhasNGP5q489Rsi1S7H97UvfMdsoPYeUtOX59zFLHGy9DMTMsEAJACAJACAEAIAQAgBACAEAIAQAgCmAJACAbLhX/taXrU/659T4J/sP7zydZ/ufgFTeeqzmXA2QSRt19JlIvEgwUw0vJrcWq7T1lwcT5IhKIsxZIJqPxfyf2k2cIhdz0jg/wC4qf8AxqU8G/8A3Y/+maQ+yzJ8O9zEfy//AKns3c1nKuJGR5x92l6v/SeJ/wDQcV/j/B6Phf8Ay/AyxnzJ64kAseX/AN+nz/6TLR5IZqh75/lmnchkY2b1EhEosOXfjmlfczmed1dz6n9ZzGo2SAkIBJAQAMgCQAgBACAEAWSD/9k=",
    "Gender": "M",
    "TurnedPro": 2003
  });
} catch (e) {
   print (e);
}
  
try {
   db.player.insertOne(  {
    "_id": 2,
    "Name": "Rafael Nadal",
    "Country_id": 2,
    "Handed": "L",
    "Dob": ISODate("1986-06-03T00:00:00+0000"),
    "HomeTown": "Manacor",
    "HeightFeet": 6,
    "HeightInches": 1,
    "Weight": 187,
    "Photo": "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",
    "Gender": "M",
    "TurnedPro": 2001
  });
} catch (e) {
   print (e);
}

  
try {
   db.player.insertOne({
    "_id": 3,
    "Name": "Roger Federer",
    "Country_id": 3,
    "Handed": "R",
    "Dob": ISODate("1981-08-08T00:00:00+0000"),
    "HomeTown": "Basel",
    "HeightFeet": 6,
    "HeightInches": 1,
    "Weight": 187,
    "Photo": "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",
    "Gender": "M",
    "TurnedPro": 1998
  });
} catch (e) {
   print (e);
}






try {
   db.ranking.insertMany( [
  {
    "_id": 1,
    "Player_id": 1,
    "Year": 2019,
    "Movement": 0,
    "Rank": 1,
    "Points": 12355,
    "PrizeMoney": 5268343,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 23,
    "SinglesLoss": 5
  },
  {
    "_id": 2,
    "Player_id": 2,
    "Year": 2019,
    "Movement": 0,
    "Rank": 2,
    "Points": 7945,
    "PrizeMoney": 3705211,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 25,
    "SinglesLoss": 5
  },
  {
    "_id": 3,
    "Player_id": 3,
    "Year": 2019,
    "Movement": 0,
    "Rank": 3,
    "Points": 5950,
    "PrizeMoney": 3117288,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 22,
    "SinglesLoss": 3
  },
  {
    "_id": 4,
    "Player_id": 4,
    "Year": 2019,
    "Movement": 0,
    "Rank": 4,
    "Points": 4685,
    "PrizeMoney": 2686505,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 17,
    "SinglesLoss": 8
  },
  {
    "_id": 5,
    "Player_id": 5,
    "Year": 2019,
    "Movement": 0,
    "Rank": 5,
    "Points": 4360,
    "PrizeMoney": 981360,
    "SinglesTitles": 1,
    "DoublesTitles": 1,
    "SinglesWin": 19,
    "SinglesLoss": 10
  },
  {
    "_id": 6,
    "Player_id": 1,
    "Year": 2018,
    "Movement": 0,
    "Rank": 1,
    "Points": 9045,
    "PrizeMoney": 15967184,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 12
  },
  {
    "_id": 7,
    "Player_id": 2,
    "Year": 2018,
    "Movement": 0,
    "Rank": 2,
    "Points": 7480,
    "PrizeMoney": 8663347,
    "SinglesTitles": 5,
    "DoublesTitles": 0,
    "SinglesWin": 45,
    "SinglesLoss": 4
  },
  {
    "_id": 8,
    "Player_id": 3,
    "Year": 2018,
    "Movement": 0,
    "Rank": 3,
    "Points": 6420,
    "PrizeMoney": 8629233,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 48,
    "SinglesLoss": 10
  },
  {
    "_id": 9,
    "Player_id": 5,
    "Year": 2018,
    "Movement": 0,
    "Rank": 4,
    "Points": 6385,
    "PrizeMoney": 8706298,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 58,
    "SinglesLoss": 19
  },
  {
    "_id": 10,
    "Player_id": 6,
    "Year": 2018,
    "Movement": 0,
    "Rank": 5,
    "Points": 5300,
    "PrizeMoney": 6486251,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 47,
    "SinglesLoss": 13
  },
  {
    "_id": 11,
    "Player_id": 2,
    "Year": 2017,
    "Movement": 0,
    "Rank": 1,
    "Points": 10645,
    "PrizeMoney": 15864000,
    "SinglesTitles": 6,
    "DoublesTitles": 0,
    "SinglesWin": 67,
    "SinglesLoss": 11
  },
  {
    "_id": 12,
    "Player_id": 3,
    "Year": 2017,
    "Movement": 0,
    "Rank": 2,
    "Points": 9605,
    "PrizeMoney": 13054856,
    "SinglesTitles": 7,
    "DoublesTitles": 0,
    "SinglesWin": 52,
    "SinglesLoss": 5
  },
  {
    "_id": 13,
    "Player_id": 7,
    "Year": 2017,
    "Movement": 0,
    "Rank": 3,
    "Points": 5150,
    "PrizeMoney": 6608510,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 49,
    "SinglesLoss": 19
  },
  {
    "_id": 14,
    "Player_id": 5,
    "Year": 2017,
    "Movement": 0,
    "Rank": 4,
    "Points": 4610,
    "PrizeMoney": 5108996,
    "SinglesTitles": 5,
    "DoublesTitles": 1,
    "SinglesWin": 55,
    "SinglesLoss": 22
  },
  {
    "_id": 15,
    "Player_id": 4,
    "Year": 2017,
    "Movement": 0,
    "Rank": 5,
    "Points": 4015,
    "PrizeMoney": 4345626,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 49,
    "SinglesLoss": 27
  },
  {
    "_id": 16,
    "Player_id": 8,
    "Year": 2016,
    "Movement": 0,
    "Rank": 1,
    "Points": 12410,
    "PrizeMoney": 16349701,
    "SinglesTitles": 9,
    "DoublesTitles": 0,
    "SinglesWin": 78,
    "SinglesLoss": 9
  },
  {
    "_id": 17,
    "Player_id": 1,
    "Year": 2016,
    "Movement": 0,
    "Rank": 2,
    "Points": 11780,
    "PrizeMoney": 14138824,
    "SinglesTitles": 7,
    "DoublesTitles": 0,
    "SinglesWin": 65,
    "SinglesLoss": 9
  },
  {
    "_id": 18,
    "Player_id": 9,
    "Year": 2016,
    "Movement": 0,
    "Rank": 3,
    "Points": 5450,
    "PrizeMoney": 5588492,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 52,
    "SinglesLoss": 17
  },
  {
    "_id": 19,
    "Player_id": 10,
    "Year": 2016,
    "Movement": 0,
    "Rank": 4,
    "Points": 5315,
    "PrizeMoney": 6856954,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 46,
    "SinglesLoss": 18
  },
  {
    "_id": 20,
    "Player_id": 11,
    "Year": 2016,
    "Movement": 0,
    "Rank": 5,
    "Points": 4950,
    "PrizeMoney": 4806748,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 58,
    "SinglesLoss": 21
  },
  {
    "_id": 21,
    "Player_id": 1,
    "Year": 2015,
    "Movement": 0,
    "Rank": 1,
    "Points": 16585,
    "PrizeMoney": 16760145,
    "SinglesTitles": 11,
    "DoublesTitles": 0,
    "SinglesWin": 78,
    "SinglesLoss": 5
  },
  {
    "_id": 22,
    "Player_id": 8,
    "Year": 2015,
    "Movement": 0,
    "Rank": 2,
    "Points": 8945,
    "PrizeMoney": 6486230,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 68,
    "SinglesLoss": 12
  },
  {
    "_id": 23,
    "Player_id": 3,
    "Year": 2015,
    "Movement": 0,
    "Rank": 3,
    "Points": 8265,
    "PrizeMoney": 6634017,
    "SinglesTitles": 6,
    "DoublesTitles": 0,
    "SinglesWin": 59,
    "SinglesLoss": 10
  },
  {
    "_id": 24,
    "Player_id": 10,
    "Year": 2015,
    "Movement": 0,
    "Rank": 4,
    "Points": 6865,
    "PrizeMoney": 5336877,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 16
  },
  {
    "_id": 25,
    "Player_id": 2,
    "Year": 2015,
    "Movement": 0,
    "Rank": 5,
    "Points": 5230,
    "PrizeMoney": 3275888,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 58,
    "SinglesLoss": 19
  },
  {
    "_id": 26,
    "Player_id": 12,
    "Year": 2019,
    "Movement": 0,
    "Rank": 1,
    "Points": 6486,
    "PrizeMoney": 3558048,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 19,
    "SinglesLoss": 5
  },
  {
    "_id": 27,
    "Player_id": 13,
    "Year": 2019,
    "Movement": 0,
    "Rank": 2,
    "Points": 5685,
    "PrizeMoney": 2530025,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 27,
    "SinglesLoss": 7
  },
  {
    "_id": 28,
    "Player_id": 14,
    "Year": 2019,
    "Movement": 0,
    "Rank": 3,
    "Points": 5533,
    "PrizeMoney": 1532290,
    "SinglesTitles": 0,
    "DoublesTitles": 0,
    "SinglesWin": 23,
    "SinglesLoss": 8
  },
  {
    "_id": 29,
    "Player_id": 15,
    "Year": 2019,
    "Movement": 0,
    "Rank": 4,
    "Points": 5405,
    "PrizeMoney": 2088181,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 26,
    "SinglesLoss": 10
  },
  {
    "_id": 30,
    "Player_id": 16,
    "Year": 2019,
    "Movement": 0,
    "Rank": 5,
    "Points": 5095,
    "PrizeMoney": 1106997,
    "SinglesTitles": 0,
    "DoublesTitles": 0,
    "SinglesWin": 18,
    "SinglesLoss": 8
  },
  {
    "_id": 31,
    "Player_id": 14,
    "Year": 2018,
    "Movement": 0,
    "Rank": 1,
    "Points": 6921,
    "PrizeMoney": 7409564,
    "SinglesTitles": 3,
    "DoublesTitles": 1,
    "SinglesWin": 46,
    "SinglesLoss": 11
  },
  {
    "_id": 32,
    "Player_id": 16,
    "Year": 2018,
    "Movement": 0,
    "Rank": 2,
    "Points": 5875,
    "PrizeMoney": 5686362,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 46,
    "SinglesLoss": 19
  },
  {
    "_id": 33,
    "Player_id": 17,
    "Year": 2018,
    "Movement": 0,
    "Rank": 3,
    "Points": 5586,
    "PrizeMoney": 6657719,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 41,
    "SinglesLoss": 17
  },
  {
    "_id": 34,
    "Player_id": 18,
    "Year": 2018,
    "Movement": 0,
    "Rank": 4,
    "Points": 5350,
    "PrizeMoney": 5737247,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 44,
    "SinglesLoss": 15
  },
  {
    "_id": 35,
    "Player_id": 12,
    "Year": 2018,
    "Movement": 0,
    "Rank": 5,
    "Points": 5115,
    "PrizeMoney": 6394289,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 42,
    "SinglesLoss": 20
  },
  {
    "_id": 36,
    "Player_id": 14,
    "Year": 2017,
    "Movement": 0,
    "Rank": 1,
    "Points": 6175,
    "PrizeMoney": 5275227,
    "SinglesTitles": 1,
    "DoublesTitles": 0,
    "SinglesWin": 45,
    "SinglesLoss": 17
  },
  {
    "_id": 37,
    "Player_id": 20,
    "Year": 2017,
    "Movement": 0,
    "Rank": 2,
    "Points": 6135,
    "PrizeMoney": 5433457,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 47,
    "SinglesLoss": 21
  },
  {
    "_id": 38,
    "Player_id": 17,
    "Year": 2017,
    "Movement": 0,
    "Rank": 3,
    "Points": 6015,
    "PrizeMoney": 4748518,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 60,
    "SinglesLoss": 21
  },
  {
    "_id": 39,
    "Player_id": 13,
    "Year": 2017,
    "Movement": 0,
    "Rank": 4,
    "Points": 5730,
    "PrizeMoney": 3902665,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 18
  },
  {
    "_id": 40,
    "Player_id": 19,
    "Year": 2017,
    "Movement": 0,
    "Rank": 5,
    "Points": 5597,
    "PrizeMoney": 5468741,
    "SinglesTitles": 0,
    "DoublesTitles": 0,
    "SinglesWin": 38,
    "SinglesLoss": 14
  },
  {
    "_id": 41,
    "Player_id": 16,
    "Year": 2016,
    "Movement": 0,
    "Rank": 1,
    "Points": 9080,
    "PrizeMoney": 10136615,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 63,
    "SinglesLoss": 18
  },
  {
    "_id": 42,
    "Player_id": 21,
    "Year": 2016,
    "Movement": 0,
    "Rank": 2,
    "Points": 7050,
    "PrizeMoney": 7675030,
    "SinglesTitles": 2,
    "DoublesTitles": 1,
    "SinglesWin": 38,
    "SinglesLoss": 6
  },
  {
    "_id": 43,
    "Player_id": 22,
    "Year": 2016,
    "Movement": 0,
    "Rank": 3,
    "Points": 5600,
    "PrizeMoney": 4162193,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 18
  },
  {
    "_id": 44,
    "Player_id": 14,
    "Year": 2016,
    "Movement": 0,
    "Rank": 4,
    "Points": 5228,
    "PrizeMoney": 4333253,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 45,
    "SinglesLoss": 18
  },
  {
    "_id": 45,
    "Player_id": 23,
    "Year": 2016,
    "Movement": 0,
    "Rank": 5,
    "Points": 4875,
    "PrizeMoney": 3940433,
    "SinglesTitles": 4,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 21
  },
  {
    "_id": 46,
    "Player_id": 21,
    "Year": 2015,
    "Movement": 0,
    "Rank": 1,
    "Points": 9945,
    "PrizeMoney": 10582642,
    "SinglesTitles": 5,
    "DoublesTitles": 0,
    "SinglesWin": 53,
    "SinglesLoss": 3
  },
  {
    "_id": 47,
    "Player_id": 14,
    "Year": 2015,
    "Movement": 0,
    "Rank": 2,
    "Points": 6060,
    "PrizeMoney": 4568127,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 49,
    "SinglesLoss": 17
  },
  {
    "_id": 48,
    "Player_id": 20,
    "Year": 2015,
    "Movement": 0,
    "Rank": 3,
    "Points": 5200,
    "PrizeMoney": 4498308,
    "SinglesTitles": 1,
    "DoublesTitles": 2,
    "SinglesWin": 41,
    "SinglesLoss": 19
  },
  {
    "_id": 49,
    "Player_id": 24,
    "Year": 2015,
    "Movement": 0,
    "Rank": 4,
    "Points": 5011,
    "PrizeMoney": 3949284,
    "SinglesTitles": 2,
    "DoublesTitles": 0,
    "SinglesWin": 39,
    "SinglesLoss": 9
  },
  {
    "_id": 50,
    "Player_id": 22,
    "Year": 2015,
    "Movement": 0,
    "Rank": 5,
    "Points": 4500,
    "PrizeMoney": 4412293,
    "SinglesTitles": 3,
    "DoublesTitles": 0,
    "SinglesWin": 51,
    "SinglesLoss": 25
  }
]);
} catch (e) {
   print (e);
}

