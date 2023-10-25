import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { SvgIcon } from '@material-ui/core'
import { LoginPath, SignUpPath, LogoutPath } from '../assets/svg'

const classes = {
    root: {
        flexGrow: 1
    },
    logo: {
        paddingRight: '2em',
        textTransform: 'uppercase',
        color: 'rgb(0,219,131)',
        fontWeight: '700'
    },
    grow: {
        flexGrow: 1
    },
    linkStyle: {
        display: 'flex',
        justify: 'center',
        alignItem: 'center',
        margin: '0 .5em',
        color: 'white',
        fontWeight: '500',
        '&:hover': {
            color: 'skyblue',
            cursor: 'pointer',
            textDecoration: 'none'
        }
    },
    linkActive: {
        display: 'flex',
        justify: 'center',
        alignItem: 'center',
        margin: '0 .5em',
        color: 'skyblue',
        fontWeight: '500',
        '&:hover': {
            color: 'skyblue',
            cursor: 'pointer',
            textDecoration: 'none'
        }
    }
}

const guestRoutes = [
    {
        name: 'Home',
        to: '/'
    }
]

const authRoutes = [
    {
        name: 'AI-Chat',
        to: '/ai-chat'
    }
]

function Navbar({ classes, logout, isAuthenticated }) {
    const history = useHistory()
    const [redirect, setRedirect] = useState(false)
    const [routes, setRoutes] = useState(guestRoutes)
    const [currentPath, setCurrentPath] = useState(history.location.pathname)

    useEffect(() => {
        history.listen((route, type) => {
            setCurrentPath(route.pathname)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (redirect) {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirect])

    useEffect(() => {
        if (isAuthenticated) {
            setRoutes([...guestRoutes, ...authRoutes])
        } else {
            setRoutes([...guestRoutes])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    const logout_user = () => {
        logout()
        setRedirect(true)
    }

    // to do ->auth control
    // const authRoutes = [
    //     {

    //     }
    // ]

    return (
        <div className={classes.root}>
            <AppBar position='static' style={{backgroundColor: 'rgb(34,34,34)'}}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        color='inherit'
                        className={classes.logo}
                    >
                        MindTech
                    </Typography>
                    {routes.map((item, index) => (
                        <Link
                            className={item.to !== currentPath ? classes.linkStyle : classes.linkActive}
                            to={item.to}
                            onClick={() => {
                                setCurrentPath(item.to)
                            }}
                            key={index}
                        >
                            <b>{item.name}</b>
                        </Link>
                    ))}
                    <div
                        color='inherit'
                        className={classes.grow}
                    ></div>
                    {!isAuthenticated ? (
                        <Fragment>
                            <Link
                                className={'/login' !== currentPath ? classes.linkStyle : classes.linkActive}
                                to='/login'
                                onClick={() => {
                                    setCurrentPath('/login')
                                }}
                            >
                                <SvgIcon>
                                    <LoginPath></LoginPath>
                                </SvgIcon>
                                <b>Login</b>
                            </Link>
                            <Link
                                className={'/sign-up' !== currentPath ? classes.linkStyle : classes.linkActive}
                                to='/sign-up'
                                onClick={() => {
                                    setCurrentPath('/sign-up')
                                }}
                            >
                                <SvgIcon>
                                    <SignUpPath></SignUpPath>
                                </SvgIcon>
                                <b>sign up</b>
                            </Link>
                        </Fragment>
                    ) : (
                        <span
                        className={classes.linkStyle}
                            onClick={logout_user}
                        >
                            <SvgIcon>
                                <LogoutPath></LogoutPath>
                            </SvgIcon>
                            <b>Logout</b>
                        </span>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

// const Navbar = ({ logout, isAuthenticated }) => {
//     const [redirect, setRedirect] = useState(false)

//     const logout_user = () => {
//         logout()
//         setRedirect(true)
//     }

//     const guestLinks = () => (
//         <Fragment>
//             <li className='nav-item'>
//                 <Link
//                     className='nav-link'
//                     to='/login'
//                 >
//                     Login
//                 </Link>
//             </li>
//             <li className='nav-item'>
//                 <Link
//                     className='nav-link'
//                     to='/signup'
//                 >
//                     Sign Up
//                 </Link>
//             </li>
//         </Fragment>
//     )

//     const authLinks = () => (
//         <li className='nav-item'>
//             <a
//                 className='nav-link'
//                 href='#!'
//                 onClick={logout_user}
//             >
//                 Logout
//             </a>
//         </li>
//     )

//     return (
//         <Fragment>
//             <nav className='navbar navbar-expand-lg navbar-light bg-light'>
//                 <Link
//                     className='navbar-brand'
//                     to='/'
//                 >
//                     Advantage Link
//                 </Link>
//                 <button
//                     className='navbar-toggler'
//                     type='button'
//                     data-toggle='collapse'
//                     data-target='#navbarNav'
//                     aria-controls='navbarNav'
//                     aria-expanded='false'
//                     aria-label='Toggle navigation'
//                 >
//                     <span className='navbar-toggler-icon'></span>
//                 </button>
//                 <div
//                     className='collapse navbar-collapse'
//                     id='navbarNav'
//                 >
//                     <ul className='navbar-nav'>
//                         <li className='nav-item active'>
//                             <Link
//                                 className='nav-link'
//                                 to='/'
//                             >
//                                 Home <span className='sr-only'>(current)</span>
//                             </Link>
//                         </li>
//                         {isAuthenticated ? authLinks() : guestLinks()}
//                     </ul>
//                 </div>
//             </nav>
//             {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
//         </Fragment>
//     )
// }

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(withStyles(classes)(Navbar))
