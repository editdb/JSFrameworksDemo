import React, { useEffect } from 'react';

import './RankingList.css';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { DataGrid } from '@material-ui/data-grid';

import PlayerEdit from './PlayerEdit';
import RankingEdit from './RankingEdit';

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

  const [selectedPlayerId, setSelectedPlayerId] = React.useState(0);
  const [selectedRankingId, setSelectedRankingId] = React.useState(0);

  const [playerEdit, setPlayerEdit] = React.useState(false);
  const editPlayer = (value) => {
    setSelectedPlayerId(value);
    fnPlayerEdit(true);
  };

  const fnPlayerEdit = (value) => {
    if (value !== undefined) {
      setPlayerEdit(value);
      return value;
    }
    return playerEdit;
  };

  const [rankingEdit, setRankingEdit] = React.useState(false);
  const editRanking = (value) => {
    setSelectedRankingId(value);
    fnRankingEdit(true);
  };

  const fnRankingEdit = (value) => {
    if (value !== undefined) {
      setRankingEdit(value);
      return value;
    }
    return rankingEdit;
  };

  const playerUpdated = () => {
    getRankings();
  };

  const rankingUpdated = () => {
    getRankings();
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
    { field: 'Rank', headerName: 'Rank', type: 'number', width: 100 },
    { field: 'PlayerName', headerName: 'Name', width: 160 },
    { field: 'CountryName', headerName: 'Country', width: 120, cellClassName: 'tableCellCentered',
      renderCell: (params) => (
        <img title={params.row.CountryName} src={params.row.CountryImageLink} alt={params.row.CountryName} className='flagCentered' />
      )
    },
    { field: 'Points', headerName: 'Points', type: 'number', width: 120 },
    { field: 'PrizeMoney', headerName: 'Prize Money', type: 'number', width: 160,
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), },
    { field: 'PlayerId', headerName: 'Actions', width: 140,
      renderCell: (params) => (
        <button
          onClick={(e) => editPlayer(params.value)}
          className="buttonLink"
        >
          Edit Player
        </button>
      ),
    },
    { field: 'id', headerName: ' ', width: 140,
      renderCell: (params) => (
        <button
          onClick={(e) => editRanking(params.value)}
          className="buttonLink"
        >
          Edit Ranking
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

  useEffect(() => {  
      getRankings();
// eslint-disable-next-line
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
        <DataGrid rows={rankings} columns={columns} pageSize={8} 
        sortModel={[
          {
            field: 'Rank',
            sort: 'asc',
          },
        ]}
        />
      </div>
      <PlayerEdit requestOpen={fnPlayerEdit} playerId={selectedPlayerId} onUpdated={playerUpdated} />
      <RankingEdit requestOpen={fnRankingEdit} rankingId={selectedRankingId} onUpdated={rankingUpdated} />
    </div>
  );
}

export default RankingList;
