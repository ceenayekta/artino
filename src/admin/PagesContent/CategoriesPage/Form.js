import { Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import Title from '../../components/Title'
import SelectInput from '../../components/Input/SelectInput'
import TextInput from '../../components/Input/TextInput'
import { createHandler } from '../../utils/categoriesUtils'

const useStyles = makeStyles(theme => ({    
  inputs: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'row',
  },
  submitButton: {
    width: '100%',
  }
}))

const Form = ({ categoriesPageState }) => {
  const classes = useStyles();  

  const [createdName, setCreatedName] = useState("");
  const [createdParent, setCreatedParent] = useState("");


  const {
    categoriesList,
    // setCategoriesList,
    isAnyError,
    // setIsAnyError, 
    // isAnySuccess,
    // setIsAnySuccess, 
    // errorText, 
    // setErrorText,
    // successText, 
    // setSuccessText,
  } = categoriesPageState;

  const formState = {
    ...categoriesPageState,
    createdName,
    setCreatedName,
    createdParent,
    setCreatedParent,
  }

  const selectList = categoriesList.filter(category => category.name !== createdName && category.parent === "")

  const onSubmit = (event) => {
    event.preventDefault()
    createHandler(formState)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Title>افزودن دسته بندی جدید به لیست</Title>
        <div className={classes.inputs}>
          <TextInput value={createdName} setValue={setCreatedName} error={isAnyError} label="نام دسته بندی" />
          <SelectInput value={createdParent} setValue={setCreatedParent} label='دسته بندی والد' selectList={selectList}/>
        </div>
        <Button type="submit" variant="outlined" color="primary" className={classes.submitButton}>افزودن</Button>
      </form>
    </>
  )
}

export default Form
