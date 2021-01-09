import React, { useEffect, useLayoutEffect } from 'react';
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
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { red, blue } from '@material-ui/core/colors'
import FileUploadDD from './FileUploadDD.jsx';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from 'react-toastify';

import { getPlayer, getCountries, updatePlayer } from './DataService';

//const redTheme = createMuiTheme({ palette: { primary: red } })
//const blueTheme = createMuiTheme({ palette: { primary: blue } })

export default function PlayerEdit(props) {

  const [open, setOpen] = React.useState(false);
  const [playerId, setPlayerId] = React.useState(0);
  const [player, setPlayer] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [turnedProYears] = React.useState(Array.from({length: 40}, (_, i) => i - 40 + new Date().getFullYear()));
  const [btnUpdateDisabled, setBtnUpdateDisabled] = React.useState(true);


  // Listen to requestOpen html element property. If it's changed then open Dialog
  useEffect(() => {
    if (props.requestOpen() === true) {
      setPlayerId(props.playerId);
      setOpen(true);
      props.requestOpen(false);
    }
  }, [props]);

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

  const fileReceived = (evt) => {
    console.log("fileReceived() length:"+ evt.length);
    setPlayer({    
      ...player, "Photo": null
    });  

    setPlayer({    
      ...player, "Photo": evt
    });  
  };

  const handleInputChange = (e) => {
    setPlayer({    
    ...player, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  const handleClose = () => {
    setPlayer({});
    setOpen(false);
  };

  //var form;
/*
  const handleBlur = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    if (name === "Name") {
      e.target.validate(value);
    }
  };
*/
  const handleSubmit = () => {
    if (formIsValid()) {
      updatePlayer(player)
      .then(data => {
        toast("Player updated", {type: toast.TYPE.SUCCESS});
        setPlayer({});
        setOpen(false);
        if (props.onUpdated) {
          props.onUpdated();
        }
      })
      .catch(err => toast(err.message, {type: toast.TYPE.ERROR}));  
    }
  };

  const formIsValid = () => {
    let anyInvalid = document.getElementsByClassName('Mui-error').length > 0;
    if (anyInvalid) {
      return !anyInvalid;
    }

    return true;
  }

  useLayoutEffect(() => {  
    const checkForm = () => {
      if (document.getElementById('btnUpdate')) {
        console.log("Invalid form: " + !formIsValid());
        setBtnUpdateDisabled(!formIsValid());
      }
    }

    setTimeout(checkForm, 50);
  });

  ValidatorForm.addValidationRule('minDobYear', value => {      
    if (player.Dob && new Date(player.Dob).getFullYear() < 1970) {
      return false;
    } 
    return true;
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true} disableEscapeKeyDown={true}
    transitionDuration="0">
      <ValidatorForm
        //ref={r => (form = r)}
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >

      <DialogTitle id="form-dialog-title">Edit Player
        <span className="buttonRow">
          <Button id="btnUpdate" disabled={btnUpdateDisabled} onClick={handleSubmit} color="primary" variant="contained" size="small">Update</Button>&nbsp;
          <Button onClick={handleClose} color="secondary" variant="contained" size="small">Cancel</Button>
        </span>
      </DialogTitle>
      <DialogContent>
        <div className="row">
          <FormControl className="formControlInput">
            <TextValidator
              label="Name"
              autoFocus
              margin="dense"
              id="Name"
              name="Name"
              required
              value={player.Name??' '}
              onChange={handleInputChange}
              //onBlur={handleBlur}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
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
        </div>

        <div className="row">
          <FormControl className="formControlSelect">
            <InputLabel id="labelHanded">Handed</InputLabel>
            <Select
              labelId="labelHanded"
              name="Handed"
              value={player.Handed??'R'}
              onChange={handleInputChange}
            >
              <MenuItem key="L" value="L">Left</MenuItem>;
              <MenuItem key="R" value="R">Right</MenuItem>;
            </Select>
          </FormControl>

          <FormControl className="formControlInput">
            <TextValidator
              label="Home town"
              margin="dense"
              name="HomeTown"
              required
              value={player.HomeTown??''}
              onChange={handleInputChange}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
             />
          </FormControl>

        </div>

        <div className="row">
          <FormControl className="formControlInput">
            <TextValidator
              label="Date of birth"
              margin="dense"
              name="Dob"
              type="date"
              value={player.Dob??' '}
              onChange={handleInputChange}
              validators={["minDobYear"]}
              errorMessages={["The player is too old"]}  

            />
          </FormControl>

          <FormControl className="formControlSelect">
            <InputLabel id="labelGender">Gender *</InputLabel>
            <Select
              labelId="labelGender"
              name="Gender"
              required
              value={player.Gender??'M'}
              onChange={handleInputChange}
            >
              <MenuItem key="F" value="F">Female</MenuItem>;
              <MenuItem key="M" value="M">Male</MenuItem>;
            </Select>
          </FormControl>

          </div>

          <div className="row">
          <FormControl className="formControlInputNarrow">
            <TextField
              label="Height feet"
              margin="dense"
              name="HeightFeet"
              type="number"
              InputProps={{ inputProps: { min: 4, max: 8 } }}
              value={player.HeightFeet??'0'}
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
              value={player.HeightInches??'0'}
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
              value={player.Weight??'0'}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="formControlSelectNarrow">
            <InputLabel id="labelTurnedPro">Turned pro</InputLabel>
            <Select
              labelId="labelTurnedPro"
              name="TurnedPro"
              required
              value={player.TurnedPro??'0'}
              onChange={handleInputChange}
            >
              {turnedProYears.map(function(item, index){
                return <MenuItem key={item} value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>

          </div>
          {player.Photo != null &&
          <img src={"data:image/jpeg;base64," + player.Photo} className="photo" alt="Player's pic" />
          }
          <FileUploadDD onFileReceived={fileReceived} />
      </DialogContent>
      <DialogActions>
     </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}