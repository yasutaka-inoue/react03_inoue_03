import React from 'react'
import { db } from "./firebase";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const TaskItem = ({ id, title, content, date, time }) => {
    const classes = useStyles();
 
    const DeleteInputData = ()=>{
        db.collection("todos").doc(id).delete();
        console.log();
    };

    return (
        <div key={id}>
              <ListItem button>
                <ListItemText >
                <ListItemText primary={title} secondary={content} />
                <ListItemText secondary={date} />
                <ListItemText secondary={time} />
                </ListItemText>
                <IconButton aria-label="delete" className={classes.margin} onClick={DeleteInputData}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
        </div>
    )
}

export default TaskItem
