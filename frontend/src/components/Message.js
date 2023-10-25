import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
const useStyles = makeStyles({
    messageBox: {
        display: 'flex',
        marginBottom: '1em',
        width: '100%'
    },
    message: {
        margin: '0 1em',
        padding: '.5em',
        width: '400px',
        minHeight: '40px',
        overflowWrap: 'break-word',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px grey',
        whiteSpace: 'pre-wrap',
        fontFamily: 'Times New Roman',
        fontSize: '16px'
    }
})

const Message = (props) => {
    const { role, direction, message, type } = props
    const classes = useStyles()
    function getBgColor(t) {
        if (t === 'error') {
            return 'red'
        } else if (t === 'info') {
            return 'blue'
        } else {
            return 'white'
        }
    }
    function getTextColor(t) {
        if (t === 'error') {
            return 'white'
        } else if (t === 'info') {
            return 'white'
        } else {
            return 'black'
        }
    }
    return (
        <div
            className={classes.messageBox}
            style={{
                flexDirection: direction === 'right' ? 'row-reverse' : ''
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Avatar></Avatar>
                <b>{role}</b>
            </div>
            <div>
                <pre
                    className={classes.message}
                    style={{ backgroundColor: getBgColor(type), color: getTextColor(type) }}
                >
                    {message}
                </pre>
            </div>
        </div>
    )
}

export default Message
