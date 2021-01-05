import React, { useEffect } from 'react';

import './RankingList.css';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { getYears } from './DataService';


function RankingList() {

  const [gender, setGender] = React.useState('M');
  const [year, setYear] = React.useState(2019);
  const [years, setYears] = React.useState([]);

  const selectGenderChange = (event) => {
    setGender(event.target.value);
  };

  const selectYearChange = (event) => {
    setYear(event.target.value);
  };

  const genders = [
    {id: 'M', value: 'Men\'s'},
    {id: 'F', value: 'Women\'s'},
  ];

  useEffect(() => {
    getYears()
      .then(data => setYears(data));
  }, []);

  return (
    <div>  
      <div className="rankingsTitle">
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

    </div>
  );
}

export default RankingList;
