import React from 'react'
import { makeStyles, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'


const useStyles = makeStyles(theme=> ({
    root: {
        top: theme.spacing(9)
    }
}))

export default function Notification(props) {

    const classes = useStyles()

    const { notify, setNotify } = props

    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return
        }

        setNotify({...notify, isOpen: false})
    };

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen} 
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal:'right'}}
            onClose={handleClose}
        >
            <Alert
                variant="filled"
                elevation={6}
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}