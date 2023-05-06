import React, {ChangeEvent, FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {FilterVuluesType, TaskType} from "./AppWithReducers";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    remoteTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterVuluesType, todolistId: string) => void
    filter: FilterVuluesType
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    todolistId: string
    removeTodoLists: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

}


const Todolist: FC<TodolistPropsType> = (props) => {
    let isAllTasksIsNotDane = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksIsNotDane = false
            break;
        }
    }
    const todoClass = isAllTasksIsNotDane ? "todolist-empty" : "todolist"

    const addItem = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }
    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => props.remoteTask(task.id, props.todolistId)
        const changeTaskTitleSpan = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todolistId)

        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)

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
        <div className={todoClass}>
            <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                gutterBottom
            >
                <EditableSpan title={props.title} changeTaskTitleSpan={changeTodolistTitle}/>
                <Button
                    variant={"contained"}
                    endIcon={<DeleteForeverIcon/>}
                    size="small"
                    onClick={() => props.removeTodoLists(props.todolistId)}
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
                    color={props.filter === 'All' ? 'secondary' : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("All", props.todolistId)
                    }}>
                    All
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={props.filter === 'Active' ? 'secondary' : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("Active", props.todolistId)
                    }}>
                    Active
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    disableElevation
                    color={props.filter === 'Completed' ? 'secondary' : "primary"}
                    onClick={() => {
                        props.changeTodoListFilter("Completed", props.todolistId)
                    }}>
                    Completed
                </Button>
            </div>
        </div>
    );
}


export default Todolist;