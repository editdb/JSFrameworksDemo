import React, { useEffect, useLayoutEffect } from 'react';
import './RankingEdit.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from 'react-toastify';

import { getRanking, getPlayerName, updateRanking } from './DataService';

export default function PlayerEdit(props) {

  const [open, setOpen] = React.useState(false);
  const [rankingId, setRankingId] = React.useState(0);
  const [ranking, setRanking] = React.useState({});
  const [playerName, setPlayerName] = React.useState("");
  const [btnUpdateDisabled, setBtnUpdateDisabled] = React.useState(true);
  const [dialogClassName, setDialogClassName] = React.useState("dialogHidden");


  // Listen to requestOpen html element property. If it's changed then open Dialog
  useEffect(() => {
    if (props.requestOpen() === true) {
      setRankingId(props.rankingId);
      setOpen(true);
      props.requestOpen(false);
    }
  }, [props]);

  // Listen to "open" change. Load the player data
  useEffect(() => {  
    const loadRankingAndPlayer = (pRankingId) => {
      console.log("Loading data for ranking");
      getRanking(pRankingId)
      .then(dataRanking => {
        setRanking(dataRanking);
        getPlayerName(dataRanking.PlayerId)
        .then(dataPlayer => {
          setPlayerName(dataPlayer);
          setDialogClassName("");
        });
      });
    };

    if (open === true) {
      console.log("Opening for rankingId " + rankingId);
      loadRankingAndPlayer(rankingId);
    }
  }, [open, rankingId]);

  const handleInputChange = (e) => {
    setRanking({    
    ...ranking, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    })
  };

  const handleClose = () => {
    setDialogClassName("dialogHidden");
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
      updateRanking(ranking)
      .then(data => {
        toast("Ranking updated", {type: toast.TYPE.SUCCESS});
        setDialogClassName("dialogHidden");
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
/*
  ValidatorForm.addValidationRule('minDobYear', value => {      
    if (player.Dob && new Date(player.Dob).getFullYear() < 1970) {
      return false;
    } 
    return true;
  });
*/
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true} disableEscapeKeyDown={true}
    transitionDuration="0" className={dialogClassName}>
      <ValidatorForm
        //ref={r => (form = r)}
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >

      <DialogTitle id="form-dialog-title">Edit Ranking
        <span className="buttonRow">
          <Button id="btnUpdate" disabled={btnUpdateDisabled} onClick={handleSubmit} color="primary" variant="contained" size="small">Update</Button>&nbsp;
          <Button onClick={handleClose} color="secondary" variant="contained" size="small">Cancel</Button>
        </span>
      </DialogTitle>

      <DialogContent>
      <h3>{playerName} {ranking.Year}</h3>
        <div className="row">
          <FormControl className="formControlInput">
            <TextValidator
              label="Points"
              autoFocus
              margin="dense"
              id="Points"
              name="Points"
              required
              value={ranking.Points??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>

          <FormControl className="formControlInput">
            <TextValidator
              label="PrizeMoney"
              margin="dense"
              id="PrizeMoney"
              name="PrizeMoney"
              required
              value={ranking.PrizeMoney??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>
        </div>

        <div className="row">
          <FormControl className="formControlInput">
            <TextValidator
              label="Singles titles"
              autoFocus
              margin="dense"
              id="SinglesTitles"
              name="SinglesTitles"
              required
              value={ranking.SinglesTitles??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>

          <FormControl className="formControlInput">
            <TextValidator
              label="Doubles Titles"
              margin="dense"
              id="DoublesTitles"
              name="DoublesTitles"
              required
              value={ranking.DoublesTitles??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>
        </div>

        <div className="row">
          <FormControl className="formControlInput">
            <TextValidator
              label="Singles Wins"
              autoFocus
              margin="dense"
              id="SinglesWin"
              name="SinglesWin"
              required
              value={ranking.SinglesWin??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>

          <FormControl className="formControlInput">
            <TextValidator
              label="Singles Losses"
              margin="dense"
              id="SinglesLoss"
              name="SinglesLoss"
              required
              value={ranking.SinglesLoss??''}
              onChange={handleInputChange}
              type="number"
              InputProps={{ inputProps: { min: 0, } }}
              validators={["required"]}
              errorMessages={["this field is required"]}  
              withRequiredValidator={true}  
            />
          </FormControl>
        </div>


      </DialogContent>
      <DialogActions>
     </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}