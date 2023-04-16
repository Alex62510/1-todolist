import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {IconButton, TextField} from "@mui/material";

type AddItemFormType = {
    addNewItem: (title: string) => void

}
export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setLocalItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const maxTitlelength = 20
    const recommendingTitlelength = 10
    const isAddItemNotPossible = title.length === 0 || title.length > maxTitlelength
    const onKeyDownAddItemHandler = isAddItemNotPossible
        ? undefined : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === "Enter" && addItem()
        }
    const longTaskTitleError = title.length > maxTitlelength && <div style={{color: "red"}}>STOOP!!!</div>
    const longTaskTitleWarning = (title.length > recommendingTitlelength && title.length < maxTitlelength) &&
        <div style={{color: "hotpink"}}>title must be shorter</div>
    return (
        <div className={'add-form'}>
            <TextField
                onKeyDown={onKeyDownAddItemHandler}
                placeholder={"Enter title please"}
                value={title}
                onChange={setLocalItemHandler}
                error={error}
               size={"small"}
                helperText={longTaskTitleError||longTaskTitleWarning}
            />
            <IconButton
                disabled={isAddItemNotPossible}
                onClick={addItem}>
                <AddCircleIcon/>
            </IconButton>
        </div>
    )
}