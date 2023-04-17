import React, {useState} from 'react';
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
type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App(): JSX.Element {
    const TodolistId_1 = v1()
    const TodolistId_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: TodolistId_1, title: "Whats to learn", filter: "All"},
        {id: TodolistId_2, title: "Whats to buy", filter: "All"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({

        [TodolistId_1]: [
            {id: v1(), title: "HTNL & CSS", isDone: true},
            {id: v1(), title: "CSS & SCSS", isDone: true},
            {id: v1(), title: "ES6/TS", isDone: false},
            {id: v1(), title: "Redax", isDone: false}
        ],
        [TodolistId_2]: [
            {id: v1(), title: "WATER", isDone: true},
            {id: v1(), title: "BREAD", isDone: true},
            {id: v1(), title: "SALT", isDone: false},
            {id: v1(), title: "BEER", isDone: false}
        ]
    })
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const remoteTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const changeTodoListFilter = (filter: FilterVuluesType, todolistId: string) => {
        setTodolists(todoLists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
    }
    const changeTodoListTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todoLists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "All"}
        setTodolists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
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
    const removeTodoLists = (todolistId: string) => {
        setTodolists(todoLists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
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
                                label={isDarkMode ? "Dark mode off" : "Dark mode on" }
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

export default App;
