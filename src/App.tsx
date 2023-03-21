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

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTNL & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterVuluesType>("All")

    const changeTodoListFilter = (filter: FilterVuluesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: true
        }
        setTasks([newTask, ...tasks])
    }
    const remoteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        console.log(tasks)
    }
    const changeTaskStatus = (taskId: string, newisDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newisDone} : t))
    }

    const getFiltredTaskForRender = (taskslist: Array<TaskType>, filterValue: FilterVuluesType) => {
        switch (filterValue) {
            case "Active":
                return  taskslist.filter((t) => !t.isDone)
            case "Completed":
                return  taskslist.filter((t) => t.isDone)
            default:
                return  taskslist
        }
    }
    let taskForRender: Array<TaskType> = getFiltredTaskForRender(tasks, filter)

    return (
        <div className="App">
            <Todolist
                filter={filter}
                changeTaskStatus={changeTaskStatus}
                remoteTask={remoteTask}
                title={"Whats to learn"}
                tasks={taskForRender}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
