
import {v1} from "uuid";
import {
    AddTodoListAC, ChangeTodoListAC, ChangeTodoListFilterAC,
    ChangeTodolistFilterAT,
    ChangeTodolistTitleAT,
    RemoveTodoListAC,
    TodolistsReducer
} from "./todolists-reducer";
import {TodolistType} from "../AppWithReducers";
let TodolistId_1:string
let TodolistId_2:string

let startState:Array<TodolistType>
beforeEach(()=>{
    TodolistId_1 = v1()
    TodolistId_2 = v1()

     startState=[
        {id: TodolistId_1, title: "Whats to learn", filter: "All"},
        {id: TodolistId_2, title: "Whats to buy", filter: "All"},
    ]
})

test("correct todolist should be removed",()=>{

    const andState=TodolistsReducer(startState, RemoveTodoListAC(TodolistId_1))
expect(andState.length).toBe(1)
    expect(andState[0].id).toBe(TodolistId_2)
})
test("correct todolist should be added",()=>{

    let NewtodoloListTitle="New todolist title"

    const andState=TodolistsReducer(startState, AddTodoListAC(NewtodoloListTitle))
    expect(andState.length).toBe(3)
    expect(andState[2].title).toBe(NewtodoloListTitle)
})
test("correct todolist should be changed",()=>{

    let NewtodoloListTitle="New todolist title"
    const action: ChangeTodolistTitleAT = {
        type:"CHANGE-TODOLISTTITLE",
            title:"New todolist title",
            id: TodolistId_2
    }

    const andState=TodolistsReducer(startState, ChangeTodoListAC(action.title,action.id))
    expect(andState[0].title).toBe("Whats to learn")
    expect(andState[1].title).toBe(NewtodoloListTitle)
})
test("correct todolist filter should be changed",()=>{

    let NewtodoloListTitle="New todolist title"
    const action: ChangeTodolistFilterAT = {
        type:"CHANGE-TODOLISTFILTER",
        filter:"Active",
        id: TodolistId_2
    }
    const andState=TodolistsReducer(startState, ChangeTodoListFilterAC(action.filter,action.id))
    expect(andState[0].filter).toBe("All")
    expect(andState[1].filter).toBe("Active")
})