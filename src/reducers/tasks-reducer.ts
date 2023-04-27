import {FilterVuluesType, TaskStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTaskAt = ReturnType<typeof removeTaskAC>
type AddTaskAt = ReturnType<typeof addTaskAC>


type Action = RemoveTaskAt | AddTaskAt

export const tasksReducer = (tasks: TaskStateType, action: Action): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: true}
            return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
        default:
            return tasks
    }
}
export const removeTaskAC=(taskId:string,todolistId:string)=> {
    return {
        type: "REMOVE-TASK", payload:{taskId, todolistId}
    } as const
}
export const addTaskAC=(title:string,todolistId:string)=> {
    return {
        type: "ADD-TASK", payload:{title,todolistId}
    } as const
}
