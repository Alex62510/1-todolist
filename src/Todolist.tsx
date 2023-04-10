import React, {ChangeEvent, FC} from 'react';
import {FilterVuluesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle:(taskId: string, title: string, todolistId: string)=>void
    changeTodolistTitle:(title: string, todolistId: string )=>void

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
    const changeTodolistTitle=(title:string)=>{
        props.changeTodolistTitle(title,props.todolistId)
    }
    const todoListItems = props.tasks.map((task) => {
        const removeTaskHandler = () => props.remoteTask(task.id, props.todolistId)
        const changeTaskTitleSpan=(title:string)=>{
            props.changeTaskTitle(task.id, title, props.todolistId)

        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)

        return (
            <li>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />

                <EditableSpan
                    title={task.title}
                    spanClases={task.isDone ? 'task-done' : 'task'}
                    changeTaskTitleSpan={changeTaskTitleSpan}
                />
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    return (
        <div className={todoClass}>
            <h3><EditableSpan title={props.title} changeTaskTitleSpan={changeTodolistTitle}/></h3>
            <button onClick={() => props.removeTodoLists(props.todolistId)}>x</button>
            <AddItemForm addNewItem={addItem}/>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'All' ? 'btn-active' : ""}
                    onClick={() => {
                        props.changeTodoListFilter("All", props.todolistId)
                    }}>
                    All
                </button>
                <button
                    className={props.filter === 'Active' ? 'btn-active' : ""}
                    onClick={() => {
                        props.changeTodoListFilter("Active", props.todolistId)
                    }}>
                    Active
                </button>
                <button
                    className={props.filter === 'Completed' ? 'btn-active' : ""}
                    onClick={() => {
                        props.changeTodoListFilter("Completed", props.todolistId)
                    }}>
                    Completed
                </button>
            </div>
        </div>
    );
}


export default Todolist;