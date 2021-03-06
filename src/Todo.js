import React, { useState} from 'react';
import './Todo.css'
import { List, ListItemText, ListItem, Button , Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import db from './firebase';
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    
    


    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true})
        setOpen(false);
    }
   

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>I am modal</h1>
                    <input  placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                    <Button onClick={updateTodo}>Done</Button>
                </div>
        </Modal>
        <List className="todo__list">       
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary={props.todo.timestamp}></ListItemText>
            </ListItem>      
           <DeleteForeverRoundedIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        <Button onClick={e => setOpen(true)}>Edit</Button>

        </>
    )
}

export default Todo
