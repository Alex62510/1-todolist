import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

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
    [todlistId: string]: Array<TaskType>
}

function App(): JSX.Element {
    const TodolistId_1 = v1()
    const TodolistId_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: TodolistId_1, title: "Whats to learn", filter: "All"},
        {id: TodolistId_2, title: "Whats to buy", filter: "Active"},
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
    const addTask = (title: string, todlistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todlistId]: [newTask, ...tasks[todlistId]]})
    }
    const remoteTask = (taskId: string, todlistId: string) => {
        setTasks({...tasks, [todlistId]: tasks[todlistId].filter(task => task.id !== taskId)})

    }
    const changeTaskStatus = (taskId: string, newisDone: boolean, todlistId: string) => {
        setTasks({...tasks, [todlistId]: tasks[todlistId].map(t => t.id === taskId ? {...t, isDone: newisDone} : t)})
    }
    const changeTodoListFilter = (filter: FilterVuluesType, todlistId: string) => {
        setTodolists(todoLists.map(t => t.id === todlistId ? {...t, filter: filter} : t))
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
    const removeTodoLists = (todlistId: string) => {
        setTodolists(todoLists.filter(t => t.id !== todlistId))
        delete tasks[todlistId]
    }
    const todolistsComponents = todoLists.map(t => {
        let taskForRender: Array<TaskType> = getFiltredTaskForRender(tasks[t.id], t.filter)
        return (
            <Todolist
                key={t.id}
                todlistId={t.id}
                filter={t.filter}
                changeTaskStatus={changeTaskStatus}
                remoteTask={remoteTask}
                title={t.title}
                tasks={taskForRender}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                removeTodoLists={removeTodoLists}
            />)
    })
    return (
        <div className="App">
            {todolistsComponents}
        </div>
    )
}

export default App;
