import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MessageOutlined from '@material-ui/icons/MessageOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import Send from '@material-ui/icons/Send'
import Block from '@material-ui/icons/Block'
import AddOutlined from '@material-ui/icons/AddOutlined'
import TextsmsOutlined from '@material-ui/icons/TextsmsOutlined'
import Message from '../components/Message'

import * as chatAgent from '../actions/chat'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 'calc(100vh - 64px)'
    },
    drawer: {
        width: '240px',
        height: '100%',
        flexShrink: 0,
        backgroundColor: 'black',
        color: 'white'
    },
    listHeader: {
        fontWeight: 'bold',
        color: 'skyblue'
    },
    listItem: {
        '&:hover': {
            backgroundColor: 'grey'
        }
    },
    listItemActive: {
        backgroundColor: 'grey'
    },
    content: {
        flexGrow: 1
    },
    actionButton: {
        color: 'white',
        '&:hover': {
            color: 'white'
        }
    },
    chatBody: {
        width: '100%',
        height: '100%'
    },
    chatMessageBox: {
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 96px)',
        padding: '4em 8em',
        overflowY: 'scroll',
        scrollBehavior: 'smooth'
    },
    chatAction: {
        display: 'flex',
        justifyContent: 'center',
        height: '96px'
    }
}))

const AIChat = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const chatMessageBoxRef = useRef()
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [sessions, setSessions] = useState([])
    const [currentSessionId, setCurrentSessionId] = useState(-1)
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        fetchAllData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchMessageListData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSessionId])

    useEffect(() => {
        fetchAllData()
        scrollToBottom()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageList])

    function scrollToBottom() {
        setTimeout(() => {
            chatMessageBoxRef.current.scrollTop = 9999999999
        }, 200)
    }

    function fetchAllData() {
        chatAgent
            .getSessionList()
            .then((response) => {
                const { data } = response
                setSessions(data['session_list'])
                if (currentSessionId === -1) {
                    if (data['session_list'].length !== 0) {
                        const { session_id } = data['session_list'][0]
                        setCurrentSessionId(session_id)
                    }
                }
            })
            .catch((e) => {
                alert('there must be something wrong with your Internet, please check')
                history.push('/')
            })
    }

    function fetchMessageListData() {
        if (currentSessionId === -1) {
            setMessageList([])
            return
        }
        chatAgent
            .getMessageList(currentSessionId)
            .then((response) => {
                const { data } = response
                setMessageList(data['message_list'])
            })
            .catch(() => {
                alert('there must be something wrong with your Internet, please check')
                history.push('/')
            })
    }

    function handleSend(event) {
        setIsError(false)
        setIsLoading(true)
        setMessageList([
            ...messageList,
            {
                direction: 'right',
                role: 'User',
                message: inputMessage
            }
        ])
        const newMessageList = [
            ...messageList,
            {
                direction: 'right',
                role: 'User',
                message: inputMessage
            }
        ]
        // send
        chatAgent
            .AIQuery(inputMessage, currentSessionId)
            .then((response) => {
                const { data } = response
                setMessageList([
                    ...newMessageList,
                    {
                        direction: 'left',
                        role: 'AI',
                        message: data.message
                    }
                ])
                setIsLoading(false)
            })
            .catch(() => {
                setIsError(true)
                setIsLoading(false)
            })
        setInputMessage('')
    }

    function handleCreate() {
        chatAgent
            .createSession()
            .then(() => {
                fetchAllData()
            })
            .catch((e) => {
                alert('there must be something wrong with your Internet, please check')
                history.push('/')
            })
    }

    function handleDelete(session_id) {
        if (!window.confirm(`sure to delete session ${session_id}`)) {
            return
        }
        chatAgent
            .deleteSession(session_id)
            .then(() => {
                fetchAllData()
                setCurrentSessionId(-1)
            })
            .catch(() => {
                alert('there must be something wrong with your Internet, please check')
                history.push('/')
            })
    }

    function handleSwitch(session_id) {
        setIsError(false)
        setCurrentSessionId(session_id)
    }

    return (
        <div className={classes.root}>
            <nav
                className={classes.drawer}
                aria-label='mailbox folders'
            >
                <List
                    subheader={
                        <ListSubheader
                            component='h5'
                            className={classes.listHeader}
                        >
                            Chat History
                        </ListSubheader>
                    }
                >
                    <ListItem
                        className={classes.listItem}
                        style={{ cursor: 'pointer' }}
                        onClick={handleCreate}
                    >
                        <ListItemAvatar style={{ display: 'flex', justifyContent: 'center' }}>
                            <AddOutlined />
                        </ListItemAvatar>
                        <ListItemText primary='Create new session' />
                    </ListItem>
                    {sessions.map((item, index) => (
                        <ListItem
                            className={item.session_id === currentSessionId ? classes.listItemActive : classes.listItem}
                            onClick={() => handleSwitch(item.session_id)}
                            key={index}
                        >
                            <ListItemAvatar style={{ display: 'flex', justifyContent: 'center' }}>
                                <MessageOutlined />
                            </ListItemAvatar>
                            <ListItemText
                                style={{ cursor: 'pointer' }}
                                primary={item.description || 'New chat'}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge='end'
                                    aria-label='delete'
                                    className={classes.actionButton}
                                    onClick={() => handleDelete(item.session_id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </nav>
            <main className={classes.content}>
                <Card
                    className={classes.chatBody}
                    variant='outlined'
                >
                    <CardContent
                        ref={chatMessageBoxRef}
                        className={classes.chatMessageBox}
                    >
                        {(sessions.length !== 0 && messageList.length === 0) ? (
                            <Message
                                direction='left'
                                role='AI'
                                message='How can I help you today'
                            ></Message>
                        ) : (
                            ''
                        )}
                        {messageList.map((item, index) => (
                            <Message
                                direction={item.role === 'AI' ? 'left' : 'right'}
                                {...item}
                                key={index}
                            ></Message>
                        ))}
                        {isLoading ? (
                            <Message
                                direction='left'
                                role='AI'
                                type='info'
                                message='Waiting for response'
                            ></Message>
                        ) : (
                            ''
                        )}
                        {isError ? (
                            <Message
                                direction='left'
                                role='AI'
                                type='error'
                                message='Internet Error! Please try again'
                            ></Message>
                        ) : (
                            ''
                        )}
                    </CardContent>
                    {sessions.length === 0 ? (
                        ''
                    ) : (
                        <CardActions className={classes.chatAction}>
                            <TextField
                                label='Message'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <TextsmsOutlined />
                                        </InputAdornment>
                                    )
                                }}
                                variant='outlined'
                                style={{ flex: '0 0 50%' }}
                                value={inputMessage}
                                onChange={(e) => {
                                    setInputMessage(e.target.value)
                                }}
                            />
                            <Button
                                style={{ height: '70%' }}
                                size='large'
                                onClick={handleSend}
                                disabled={inputMessage.trim() === '' && !isLoading}
                            >
                                {isLoading ? <Block /> : <Send />}
                            </Button>
                        </CardActions>
                    )}
                </Card>
            </main>
        </div>
    )
}

export default AIChat
