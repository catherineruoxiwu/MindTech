import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ProvideCard from '../components/ProvideCard'
import ChatOutlined from '@material-ui/icons/ChatOutlined'

const Home = ({ isAuthenticated }) => {
    return !isAuthenticated ? (
        <div className='container mt-5'>
            <div className='jumbotron'>
                <h1 className='display-4'>Welcome to MindTech!</h1>
                <p className='lead'>A platform to enable ...</p>
                <hr className='my-4' />
                <p>Click the Log In button</p>
                <Link
                    className='btn btn-primary btn-lg'
                    to='/login'
                    role='button'
                >
                    Login
                </Link>
            </div>
        </div>
    ) : (
        <div style={{ margin: '3em auto', width: '50%' }}>
            <ProvideCard
                title='AI chat'
                TitleIcon={ChatOutlined}
                to={{ name: 'Start Chatting', path: '/ai-chat' }}
            ></ProvideCard>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home)
