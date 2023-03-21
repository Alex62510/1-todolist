import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterVuluesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    remoteTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterVuluesType) => void
    filter: FilterVuluesType
    changeTaskStatus: (taskId: string, newisDone:boolean) => void
    addTask: (title: string) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError]= useState<boolean>(false)

    let isAllTasrsIsNotDane = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasrsIsNotDane = false
            break;
        }
    }
    const todoClass = isAllTasrsIsNotDane ? "todolist-empty" : "todolist"

    const maxTitlelength = 20
    const recommendingTitlelength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitlelength

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === "Enter" && addTask()
        }
    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => props.remoteTask(task.id)
        const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
                <span className={task.isDone?'task-done': 'task'}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimmedTitle= title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle)
        } else {setError(true)}
        setTitle("")
    }
    const longTaskTitleWarning = (title.length > recommendingTitlelength && title.length < maxTitlelength) &&
        <div style={{color: "hotpink"}}>title must be shorter</div>
    const longTaskTitleError = title.length > maxTitlelength && <div style={{color: "red"}}>STOOP!!!</div>
    return (
        <div className={todoClass}>
            <h3>{props.title}</h3>
            <div>
                <input
                    onKeyDown={onKeyDownAddTaskHandler}
                    placeholder={"Enter title please"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    className={error ? 'input-error' : ""}
                />

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
                <button
                    className={props.filter==='All'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("All")
                }}>
                    All
                </button>
                <button
                    className={props.filter==='Active'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Active")
                }}>
                    Active
                </button>
                <button
                    className={props.filter==='Completed'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Completed")
                }}>
                    Completed
                </button>
            </div>
        </div>
    );
}
export default Todolist;