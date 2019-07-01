import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "5vh",
    // left: "5vw",
    // maxWidth: "90vw",
    maxHeight: "90vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    overflow: "auto"
  },
  textField: {
    marginRight: 10
  },
  pushRight: {
    marginLeft: 20
  },
  pushDown: {
    marginTop: 12
  }
}));

function TableModal({
  modalLabels = {},
  modalData = { cells: [] },
  handleClose,
  exceptionColumnIndex = -1,
  sheetRows,
  setSheetRows
}) {
  console.log(modalData);
  const [exceptionState, setExceptionState] = useState(
    modalData.cells[exceptionColumnIndex].value
  );

  const classes = useStyles();

  const open = modalData.cells ? true : false;

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.paper}>
        <Typography variant="h4">
          Job Data
          <Button
            variant="contained"
            onClick={handleClose}
            className={classes.pushRight}
            color="secondary"
          >
            Close
          </Button>
        </Typography>
        <Divider className={classes.pushDown} />
        {open &&
          modalData.cells.map((cell, key) => {
            const exception = key === exceptionColumnIndex;
            return exception ? (
              <React.Fragment key={cell.columnId}>
                <br />
                <TextField
                  id="outlined-read-only-input"
                  label={modalLabels[key].title}
                  value={exceptionState}
                  onChange={e => setExceptionState(e.target.value)}
                  className={classes.textField}
                  margin="normal"
                  // variant="outlined"
                />
              </React.Fragment>
            ) : (
              <TextField
                key={cell.columnId}
                id="outlined-read-only-input"
                label={modalLabels[key].title}
                defaultValue={cell.value || "N/A"}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
            );
          })}
      </div>
    </Modal>
  );
}

export default TableModal;
