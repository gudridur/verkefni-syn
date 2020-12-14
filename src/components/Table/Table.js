import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';



import RowExtraInfo from "./RowExtraInfo";

import "./TableStyles.css";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = ({row}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {open ? <div></div> : (
          <TableCell component="th" scope="row">
            {moment(row.upphaf).format("HH:mm")}
          </TableCell>
        )}
        <TableCell>{row.isltitill}</TableCell>
        <TableCell className="description-wrapper">
          {!open && (
            <div className="description">{row.lysing}</div>
          )}
            <IconButton align="left" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </IconButton>
        </TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <RowExtraInfo row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    midill_heiti: PropTypes.string.isRequired,
    upphaf: PropTypes.string.isRequired,
    isltitill: PropTypes.string.isRequired,
    lysing: PropTypes.string.isRequired,
    thattur: PropTypes.number.isRequired,
    thattafjoldi: PropTypes.number.isRequired,
    slott: PropTypes.number.isRequired,
  }).isRequired,
};

const CollapsibleTable = ({
  program
}) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tími</TableCell>
            <TableCell>Dagskrárliður</TableCell>
            <TableCell >Nánar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {program.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;