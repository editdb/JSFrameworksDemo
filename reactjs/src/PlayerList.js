import React, { useEffect } from 'react';

import './PlayerList.css';
import { DataGrid } from '@material-ui/data-grid';

import { getPlayersList } from './DataService';

import PlayerEdit from './PlayerEdit';


function PlayerList() {

  const [players, setPlayers] = React.useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = React.useState(0);

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

  const formatDate = (value) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    const date = new Date(value);
    const ukDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    return ukDate;
  };

  const playerUpdated = () => {
    getPlayers();
  };


  const columns = [
    { field: 'Name', headerName: 'Name', width: 180 },
    { field: 'Gender', headerName: 'Gender', width: 120, cellClassName: 'tableCellCentered' },
    { field: 'Handed', headerName: 'Handed', width: 120, cellClassName: 'tableCellCentered' },
    { field: 'Dob', headerName: 'Born', width: 120,
      valueFormatter: ({ value }) => formatDate(value) },
    { field: 'Country.Name', headerName: 'Country', width: 120, cellClassName: 'tableCellCentered',
      renderCell: (params) => (
        <img title={params.row.Country.Name} src={params.row.Country.ImageLink} alt={params.row.Country.Name} className='flagCentered' />
      )
    },
    { field: 'HomeTown', headerName: 'Home Town', width: 140 },
    { field: 'id', headerName: 'Actions', width: 100, cellClassName: 'tableCellCentered',
      renderCell: (params) => (
        <button
          onClick={(e) => editPlayer(params.value)}
          className="buttonLink"
        >
          Edit Player
        </button>
      ),
    }
  
  ];

  const getPlayers = () => {
    getPlayersList()
      .then(data => {
        data.forEach( rec => {
          rec.id = rec.Id;
          delete rec.Id;
        });
        console.log(data);
        setPlayers(data);
      });
  };

  useEffect(() => {  
      getPlayers();
    }, []
  );

  return (
    <div>  
      <div className="title">
      Rankings
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={players} columns={columns} pageSize={8} />
      </div>
      <PlayerEdit requestOpen={fnPlayerEdit} playerId={selectedPlayerId} onUpdated={playerUpdated} />
    </div>
  );
}

export default PlayerList;
