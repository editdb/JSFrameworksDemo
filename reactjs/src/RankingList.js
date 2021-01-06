import React, { useEffect } from 'react';

import './RankingList.css';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { DataGrid } from '@material-ui/data-grid';

import { getRankingsList, getYears } from './DataService';


function RankingList() {

  const [gender, setGender] = React.useState('M');
  const [year, setYear] = React.useState(2019);
  const [years, setYears] = React.useState([]);
  const [rankings, setRankings] = React.useState([]);

  const selectGenderChange = (event) => {
    setGender(event.target.value);
  };

  const selectYearChange = (event) => {
    setYear(event.target.value);
  };

  const editPlayer = (value) => {
    alert(`Edit Player ${value}`);
  };

  const editRanking = (value) => {
    alert(`Edit Ranking ${value}`);
  };

  const genders = [
    {id: 'M', value: 'Men\'s'},
    {id: 'F', value: 'Women\'s'},
  ];

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const columns = [
    { field: 'Rank', headerName: 'Rank', width: 100 },
    { field: 'PlayerName', headerName: 'Name', width: 160 },
    { field: 'CountryName', headerName: 'Country', width: 160 },
    { field: 'Points', headerName: 'Points', width: 100 },
    { field: 'PrizeMoney', headerName: 'Prize Money', width: 140,
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), },
    { field: 'PlayerId', headerName: 'Actions', width: 140,
      renderCell: (params) => (
        <button
          onClick={(e) => editPlayer(params.value)}
          className="buttonLink"
        >
          Edit Player {params.value}
        </button>
      ),
    },
    { field: 'id', headerName: ' ', width: 140,
      renderCell: (params) => (
        <button
          onClick={(e) => editRanking(params.value)}
          className="buttonLink"
        >
          Edit Ranking {params.value}
        </button>
      ),
    },
  
  ];

  useEffect(() => {
      getYears()
        .then(data => {
          setYears(data);
        });
    }, []
  );

  useEffect(() => {
      const getRankings = () => {
        getRankingsList(year, gender)
          .then(data => {
            data.forEach( rec => {
              rec.id = rec.Id;
              delete rec.Id;
            });
            console.log(data);
            setRankings(data);
          });
      };
  
      getRankings();
    }, [gender, year]
  );

  return (
    <div>  
      <div className="title">
      Rankings
      </div>

      <FormControl className="formControlSelect">
      <InputLabel id="labelGender">Competition</InputLabel>
      <Select
        labelId="labelGender"
        id="selectGender"
        value={gender}
        onChange={selectGenderChange}
      >
        {genders.map(function(item, index){
          return <MenuItem value={item.id}>{item.value}</MenuItem>;
        })}
      </Select>
      </FormControl>


      <FormControl className="formControlSelect">
        <InputLabel id="labelYear">Year</InputLabel>
        <Select
          labelId="labelYear"
          id="selectYear"
          value={year}
          onChange={selectYearChange}
        >
          {years.map(function(item, index) {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rankings} columns={columns} pageSize={8} />
      </div>
    </div>
  );
}

export default RankingList;
