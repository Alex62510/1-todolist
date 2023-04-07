import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterVuluesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    remoteTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterVuluesType, todolistId: string) => void
    filter: FilterVuluesType
    changeTaskStatus: (taskId: string, newIsDone:boolean, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    todolistId: string
    removeTodoLists:(todolistId: string)=>void
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

    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => props.remoteTask(task.id,props.todolistId)
        const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.todolistId)

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
    return (
        <div className={todoClass}>
            <h3>{props.title}</h3>
            <button onClick={()=>props.removeTodoLists(props.todolistId)}>x</button>
            <AddItemForm todolistId={props.todolistId} addTask={props.addTask}/>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter==='All'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("All",props.todolistId)
                }}>
                    All
                </button>
                <button
                    className={props.filter==='Active'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Active",props.todolistId)
                }}>
                    Active
                </button>
                <button
                    className={props.filter==='Completed'?'btn-active' : ""}
                    onClick={() => {
                    props.changeTodoListFilter("Completed",props.todolistId)
                }}>
                    Completed
                </button>
            </div>
        </div>
    );
}


export default Todolist;