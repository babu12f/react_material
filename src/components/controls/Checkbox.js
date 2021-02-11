import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox, FormHelperText } from '@material-ui/core'

export default function Checkbox(props) {

    const { name, label, value, error = null, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl {...(error && {error: true})}>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
