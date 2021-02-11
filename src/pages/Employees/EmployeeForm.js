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

export default function EmployeeForm() {

    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues)

    return (
        <Form>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange}
                    />

                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />

                    <Controls.Input
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
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
                    />
                    
                    <Controls.Select
                        label="Department"
                        name="departmentId"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                    />

                    <Controls.DatePicker
                        label="Hire Date"
                        name="hiredDate"
                        value={values.hiredDate}
                        onChange={handleInputChange}
                    />

                    <Controls.Checkbox
                        label="Permanent"
                        name="isPermanent"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            text="Submit"
                            type="submit"
                        />

                        <Controls.Button
                            text="Reset"
                            color="default"
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}