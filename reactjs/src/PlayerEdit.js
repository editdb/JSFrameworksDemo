import React, { useEffect } from 'react';
import './PlayerEdit.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { getPlayer, getCountries } from './DataService';

export default function PlayerEdit(props) {

  const [open, setOpen] = React.useState(false);
  const [playerId, setPlayerId] = React.useState(0);
  const [player, setPlayer] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [turnedProYears] = React.useState(Array.from({length: 40}, (_, i) => i - 40 + new Date().getFullYear()));


  // Listen to requestOpen html element property. If it's changed then open Dialog
  useEffect(() => {
    if (props.requestOpen !== 0) {
      setPlayerId(props.playerId);
      setOpen(true);
    }
  }, [props.requestOpen, props.playerId]);

  // Listen to "open" change. Load the player data
  useEffect(() => {  
    const loadCountriesAndPlayer = (pPlayerId) => {
      console.log("Loading data for countries");
      getCountries()
      .then((data) => {
        setCountries(data);
        loadPlayer(pPlayerId);
      });
    };
  
    const loadPlayer = (pPlayerId) => {
      console.log("Loading data for player " + pPlayerId);
      getPlayer(pPlayerId)
      .then(data => {
        if (data.Dob != null) {
          data.Dob = data.Dob.substring(0,10);
        }
        setPlayer(data);
      });
    };

    if (open === true) {
      console.log("Opening for player " + playerId);
      loadCountriesAndPlayer(playerId);
    }
  }, [open, playerId]);

  const handleInputChange = (e) => {
    console.log(`e.target.name=${e.target.name}`);
    console.log(`e.target.value=${e.target.value}`);
    setPlayer({    
    ...player, [e.target.name]: e.target.value
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true} disableEscapeKeyDown={true}>
      <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
      <DialogContent>
        <p>
          <FormControl className="formControlInput">
            <TextField
              label="Name"
              autoFocus
              margin="dense"
              name="Name"
              required
              value={player.Name??''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="formControlSelect">
            <InputLabel id="labelCountry">Country *</InputLabel>
            <Select
              labelId="labelCountry"
              name="CountryId"
              required
              value={player.CountryId??''}
              onChange={handleInputChange}
            >
              {countries.map(function(item, index){
                return <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </p>

        <p>
          <FormControl className="formControlSelect">
            <InputLabel id="labelHanded">Handed</InputLabel>
            <Select
              labelId="labelHanded"
              name="Handed"
              value={player.Handed??''}
              onChange={handleInputChange}
            >
              <MenuItem key="L" value="L">Left</MenuItem>;
              <MenuItem key="R" value="R">Right</MenuItem>;
            </Select>
          </FormControl>

          <FormControl className="formControlInput">
            <TextField
              label="Home town"
              margin="dense"
              name="HomeTown"
              required
              value={player.HomeTown??''}
              onChange={handleInputChange}
            />
          </FormControl>

        </p>

        <p>
          <FormControl className="formControlInput">
            <TextField
              label="Date of birth"
              margin="dense"
              name="Dob"
              type="date"
              value={player.Dob??''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="formControlSelect">
            <InputLabel id="labelGender">Gender *</InputLabel>
            <Select
              labelId="labelGender"
              name="Gender"
              required
              value={player.Gender??''}
              onChange={handleInputChange}
            >
              <MenuItem key="F" value="F">Female</MenuItem>;
              <MenuItem key="M" value="M">Male</MenuItem>;
            </Select>
          </FormControl>

          </p>

          <p>
          <FormControl className="formControlInputNarrow">
            <TextField
              label="Height feet"
              margin="dense"
              name="HeightFeet"
              type="number"
              InputProps={{ inputProps: { min: 4, max: 8 } }}
              value={player.HeightFeet??''}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl className="formControlInputNarrow">
          <TextField
              label="inches"
              margin="dense"
              name="HeightInches"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 11 } }}
              value={player.HeightInches??''}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl className="formControlInputNarrow">
          <TextField
              label="Weight lbs"
              margin="dense"
              name="Weight"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={player.Weight??''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="formControlSelectNarrow">
            <InputLabel id="labelTurnedPro">Turned pro</InputLabel>
            <Select
              labelId="labelTurnedPro"
              name="TurnedPro"
              required
              value={player.TurnedPro??''}
              onChange={handleInputChange}
            >
              {turnedProYears.map(function(item, index){
                return <MenuItem key={item} value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>

          </p>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}