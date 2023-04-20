import {TodolistType} from "../App";
import {v1} from "uuid";
import {TodolistsReducer} from "./todolists-reducer";


test("correct todolist should be removed",()=>{
    let TodolistId_1 = v1()
    let TodolistId_2 = v1()

    const startState:Array<TodolistType>=[
        {id: TodolistId_1, title: "Whats to learn", filter: "All"},
        {id: TodolistId_2, title: "Whats to buy", filter: "All"},
    ]
    const andState=TodolistsReducer(startState, {})
expect(andState.length).toBe(1)
    expect(andState[1].id).toBe(TodolistId_2)
})