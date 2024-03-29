import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    spanClases?: string
    changeTaskTitleSpan: (newTitle: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = ({
                                                     title,
                                                     spanClases,
                                                     changeTaskTitleSpan
                                                 }) => {
    const [localTitle, setlocalTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setlocalTitle(e.currentTarget.value)
    }
const offEditInput=() => {
        setEditMode(false)
    changeTaskTitleSpan(localTitle)
    }
    return (
        editMode ?
            <TextField
                size="small"
                variant="standard"
                value={localTitle}
                autoFocus={true}
                onChange={changeLocalTitle}
                onBlur={offEditInput}/>
            : <span
                className={spanClases}
                onDoubleClick={() => {
                    setEditMode(true)
                }}
            >{title}</span>
    );
};

export default EditableSpan;