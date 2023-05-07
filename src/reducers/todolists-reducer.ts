
import {v1} from "uuid";
import {FilterVuluesType, TodolistType} from "../AppWithReducers";

export type RemoveTodolistAt = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAt = {
    type: "ADD-TODOLIST"
    title: string
    todolistId:string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLISTTITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLISTFILTER"
    filter: FilterVuluesType
    id: string
}
const initialTodolistState:Array<TodolistType>=[]

export type TodolistAction = RemoveTodolistAt | AddTodolistAt | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const TodolistsReducer = (todolists=initialTodolistState, action: TodolistAction): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: "All"}
            return [...todolists, newTodolist]
        case "CHANGE-TODOLISTTITLE":
            return todolists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLISTFILTER":
            return todolists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return todolists
    }
}
export const RemoveTodoListAC = (id: string): RemoveTodolistAt => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const AddTodoListAC = (title: string): AddTodolistAt => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}
export const ChangeTodoListAC = (title: string, id: string): ChangeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLISTTITLE",
        title: title,
        id: id
    }
}
export const ChangeTodoListFilterAC = (filter: FilterVuluesType, id: string): ChangeTodolistFilterAT => {
    return {
        type: "CHANGE-TODOLISTFILTER",
        filter: filter,
        id: id
    }
}