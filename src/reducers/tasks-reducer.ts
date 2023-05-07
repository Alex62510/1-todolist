

import {AddTodolistAt, RemoveTodolistAt} from "./todolists-reducer";
import {TaskStateType, TaskType} from "../AppWithReducers";
import {v1} from "uuid";


type RemoveTaskAt = ReturnType<typeof removeTaskAC>
type AddTaskAt = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAt = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAt = ReturnType<typeof changeTaskTitleAC>

export type TaskAction = RemoveTaskAt
    | AddTaskAt
    | ChangeTaskStatusAt
    | ChangeTaskTitleAt
    | AddTodolistAt
    | RemoveTodolistAt


const initialTaskState:TaskStateType= {}
export const tasksReducer = (tasks=initialTaskState, action: TaskAction): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: true}
            return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...tasks, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            const copyState={...tasks}
            delete copyState[action.id]
            return  copyState
        default:
            return tasks
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK", payload: {taskId, todolistId}
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK", payload: {title, todolistId}
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS", payload: {taskId, isDone, todolistId}
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}
    } as const
}