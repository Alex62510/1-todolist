import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterVuluesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    remoteTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterVuluesType) => void
    addTask: (title: string) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")

    let isAllTasrsIsNotDane = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasrsIsNotDane = false
            break;
        }
    }
    const todoClass = isAllTasrsIsNotDane ? "todolist-empty" : "todolist"
const maxTitlelength=20
const recommendingTitlelength=10

    const isAddTaskNotPossible=title.length === 0 || title.length > maxTitlelength
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler =isAddTaskNotPossible
    ?undefined : (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTask()
    }
    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => props.remoteTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const longTaskTitleWarning=(title.length > recommendingTitlelength && title.length < maxTitlelength) &&
        <div style={{color: "hotpink"}}>title must be shorter</div>
    const longTaskTitleError=title.length > maxTitlelength && <div style={{color: "red"}}>STOOP!!!</div>
    return (
        <div className={todoClass}>
            <h3>{props.title}</h3>
            <div>
                <input
                    onKeyDown={onKeyDownAddTaskHandler}
                    placeholder={"Enter title please"}
                    value={title}
                    onChange={setLocalTitleHandler}/>

                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTask}>+
                </button>
                {longTaskTitleWarning}
                {longTaskTitleError}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter("All")
                }}>
                    All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("Active")
                }}>
                    Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("Completed")
                }}>
                    Completed
                </button>
            </div>
        </div>
    );
}
export default Todolist;