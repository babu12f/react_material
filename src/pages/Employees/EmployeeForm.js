import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core'
import { useForm, Form } from '../../components/useForm'
import { Controls } from '../../components/controls/Controls'
import * as employeeService from '../../services/EmployeeService'

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hiredDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props) {

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = {...errors}

        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        if ('hiredDate' in fieldValues)
            temp.hiredDate = fieldValues.hiredDate instanceof Date ? "" : "This field is required."
        if ('isPermanent' in fieldValues)
            temp.isPermanent = fieldValues.isPermanent ? "" : "This field is required."
        if ('gender' in fieldValues)
            temp.gender = ["male", "female"].includes(fieldValues.gender) ? "" : "This field is required."

        setErrors({
            ...temp 
        })


        console.log(temp, fieldValues.hiredDate)

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {
            addOrEdit(values, resetForm)
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />

                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />

                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />

                    <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item sm={6}>
                    <Controls.RadioGroup
                        label="Gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                        error={errors.gender}
                    />
                    
                    <Controls.Select
                        label="Department"
                        name="departmentId"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />

                    <Controls.DatePicker
                        label="Hire Date"
                        name="hiredDate"
                        value={values.hiredDate}
                        onChange={handleInputChange}
                        error={errors.hiredDate}
                    />

                    <Controls.Checkbox
                        label="Permanent"
                        name="isPermanent"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                        error={errors.isPermanent}
                    />

                    <div>
                        <Controls.Button
                            text="Submit"
                            type="submit"
                        />

                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}