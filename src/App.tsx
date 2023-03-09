import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {type} from "os";

export type FilterVuluesType = "All" | "Active" | "Completed"
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTNL & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
        {id: 4, title: "Redax", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterVuluesType>("All")

    const changeTodoListFilter = (filter: FilterVuluesType) =>
    {
        setFilter(filter)

    }
    let taskForRender: Array<TaskType> = []
    if (filter === "All") {
        taskForRender = tasks
    }
    if (filter === "Active") {
        taskForRender = tasks.filter((t) => !t.isDone)
    }
    if (filter === "Completed") {
        taskForRender = tasks.filter((t) => t.isDone)
    }

    const remoteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        console.log(tasks)
    }

    return (
        <div className="App">
            <Todolist
                remoteTask={remoteTask}
                title={"Whats to learn"}
                tasks={taskForRender}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
