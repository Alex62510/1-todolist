import {TodolistType} from "../App";
type RemoveTodolistAt={
    type: "REMOVE-TODOLIST"
    id:string
}

export const TodolistsReducer=(todolists:Array<TodolistType>, action:RemoveTodolistAt):Array<TodolistType>=> {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== action.id)
        default:
            return todolists
    }


    return todolists
}

