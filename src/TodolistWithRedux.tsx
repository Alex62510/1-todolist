import React, {ChangeEvent, FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {FilterVuluesType, TaskType} from "./AppWithReducers";
import {TaskStateType, TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {ChangeTodoListAC, ChangeTodoListFilterAC, RemoveTodoListAC} from "./reducers/todolists-reducer";


type TodolistPropsType = {
todoList:TodolistType
}


const TodolistWithRedux: FC<TodolistPropsType> = ({todoList}) => {
    const {id,filter,title}=todoList

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks[id])
    const dispatch=useDispatch()

    // let isAllTasksIsNotDane = true
    // for (let i = 0; i < props.tasks.length; i++) {
    //     if (props.tasks[i].isDone) {
    //         isAllTasksIsNotDane = false
    //         break;
    //     }
    // }
    // const todoClass = isAllTasksIsNotDane ? "todolist-empty" : "todolist"

    const addItem = (title: string) => {
        dispatch(addTaskAC(title,id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(ChangeTodoListAC(title,id))
    }
    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => dispatch(removeTaskAC(task.id,id))
        const changeTaskTitleSpan = (title: string) => {
            dispatch(changeTaskTitleAC(task.id,title,id))

        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id,e.currentTarget.checked,id))

        return (
            <ListItem
                divider
                disablePadding
                secondaryAction={<IconButton size="small" onClick={removeTaskHandler}>
                    <DeleteForeverIcon/>
                </IconButton>}>
                <Checkbox
                    color="secondary"
                    size="small"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan
                    title={task.title}
                    spanClases={task.isDone ? 'task-done' : 'task'}
                    changeTaskTitleSpan={changeTaskTitleSpan}
                />

            </ListItem>
        )
    })
    return (
        <div >
            <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                gutterBottom
            >
                <EditableSpan title={title} changeTaskTitleSpan={changeTodolistTitle}/>
                <Button
                    variant={"contained"}
                    endIcon={<DeleteForeverIcon/>}
                    size="small"
                    onClick={() => dispatch(RemoveTodoListAC(id))}
                    sx={{ml: "10px"}}>
                    DEL
                </Button>
            </Typography>
            <AddItemForm addNewItem={addItem}/>
            <List>
                {todoListItems}
            </List>
            <div className={"btn-filter-container"}>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'All' ? 'secondary' : "primary"}
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC('All',id))
                    }}>
                    All
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'Active' ? 'secondary' : "primary"}
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC('Active',id))
                    }}>
                    Active
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'Completed' ? 'secondary' : "primary"}
                    onClick={() => {
                        dispatch(ChangeTodoListFilterAC('Completed',id))
                    }}>
                    Completed
                </Button>
            </div>
        </div>
    );
}


export default TodolistWithRedux;