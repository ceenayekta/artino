import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';


const TableActions = ({ editHandler, deleteHandler }) => {
    return (
        <div>
            <IconButton onClick={editHandler} color="primary" aria-label="upload picture" component="span">
                <EditIcon />
            </IconButton>
            <IconButton onClick={deleteHandler} color="secondary" aria-label="upload picture" component="span">
                <DeleteForeverIcon />
            </IconButton>
        </div>
    )
}

export default TableActions
