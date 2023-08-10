import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

const MultipleSelect = () => {
    const classes = useStyles();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="multiple-select-label">Select Multiple Options</InputLabel>
            <Select
                labelId="multiple-select-label"
                id="multiple-select"
                multiple
                value={selectedOptions}
                onChange={handleChange}
            >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
                <MenuItem value="option4">Option 4</MenuItem>
            </Select>
        </FormControl>
    );
};

export default MultipleSelect;
