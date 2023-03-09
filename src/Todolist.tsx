import React, {FC} from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    remoteTask: (taskId: number) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {

    let isAllTasrsIsNotDane = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasrsIsNotDane = false
            break;
        }
    }
    const todoClass = isAllTasrsIsNotDane ? "todolist-empty" : "todolist"

    const todoListItems = props.tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.remoteTask(task.id)
                }}>x</button>
            </li>
        )
    })

    return (
        <div className={todoClass}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
export default Todolist;