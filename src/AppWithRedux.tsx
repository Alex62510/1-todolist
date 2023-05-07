import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button, Checkbox,
    Container,
    createTheme, CssBaseline, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {deepPurple, green} from "@mui/material/colors";
import {
    AddTodoListAC,
    ChangeTodoListAC,
    ChangeTodoListFilterAC, RemoveTodoListAC,
    TodolistAction,
    TodolistsReducer
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskAction,
    tasksReducer
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type FilterVuluesType = "All" | "Active" | "Completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterVuluesType

}
export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function AppWithRedux(): JSX.Element {
    const TodolistId_1 = v1()
    const TodolistId_2 = v1()

    let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    const remoteTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todolistId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

//todolist
    const changeTodoListFilter = (filter: FilterVuluesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todolistId))
    }
    const changeTodoListTitle = (newTitle: string, todolistId: string) => {
        dispatch(ChangeTodoListAC(newTitle, todolistId))
    }
    const addTodolist = (title: string) => {
        dispatch(AddTodoListAC(title))
    }
    const removeTodoLists = (todolistId: string) => {
        dispatch(RemoveTodoListAC(todolistId))

    }

    const getFiltredTaskForRender = (taskslist: Array<TaskType>, filterValue: FilterVuluesType) => {
        switch (filterValue) {
            case "Active":
                return taskslist.filter((t) => !t.isDone)
            case "Completed":
                return taskslist.filter((t) => t.isDone)
            default:
                return taskslist
        }
    }


    const todolistsComponents = todoLists.map(t => {
        let taskForRender: Array<TaskType> = getFiltredTaskForRender(tasks[t.id], t.filter)
        return (
            <Grid item>
                <Paper elevation={8}>
                    <Todolist
                        key={t.id}
                        todolistId={t.id}
                        filter={t.filter}
                        title={t.title}
                        tasks={taskForRender}

                        changeTodoListFilter={changeTodoListFilter}
                        removeTodoLists={removeTodoLists}
                        changeTodolistTitle={changeTodoListTitle}

                        changeTaskStatus={changeTaskStatus}
                        remoteTask={remoteTask}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    const mode = isDarkMode ? "dark" : "light"
    const customTheme = createTheme({
        palette: {
            primary: deepPurple,
            secondary: green,
            mode: mode
        }
    })
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={(e) => setIsDarkMode(e.currentTarget.checked)}/>}
                                label={isDarkMode ? "Dark mode off" : "Dark mode on"}
                            />
                        </FormGroup>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: "15px 0px"}}>
                        <AddItemForm addNewItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>

    )
}

export default AppWithRedux;
