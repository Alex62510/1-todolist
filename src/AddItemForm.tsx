import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType={
    todolistId:string
    addTask:(title: string, todolistId: string) => void

}
export const AddItemForm = (props:AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError]= useState<boolean>(false)
    const addTask = () => {
        const trimmedTitle= title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle,props.todolistId)
        } else {setError(true)}
        setTitle("")
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const maxTitlelength = 20
    const recommendingTitlelength = 10
    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitlelength
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === "Enter" && addTask()
        }
    const longTaskTitleError = title.length > maxTitlelength && <div style={{color: "red"}}>STOOP!!!</div>
    const longTaskTitleWarning = (title.length > recommendingTitlelength && title.length < maxTitlelength) &&
        <div style={{color: "hotpink"}}>title must be shorter</div>
    return (
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
    )
}