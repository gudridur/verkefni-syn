import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Dropdown = ({
    currentValue,
    options,
    placeholder,
    onOptionChange = (value) => {},
}) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          backgroundColor: "white"
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));
    
    const classes = useStyles();
    const [option, setOption] = useState(currentValue);

    const handleChange = (target) => {
        const value = target.value;
        setOption(value);

        onOptionChange(value);
    };

    return (
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel className="dropdown" id="demo-simple-select-filled-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={option}
          onChange={({target}) => handleChange(target)}
        >
          {options && options.map((o, key) => {
              return <MenuItem key={key} value={o.value}>{o.label}</MenuItem>
          })}
        </Select>
      </FormControl>
    )
}

export default Dropdown;