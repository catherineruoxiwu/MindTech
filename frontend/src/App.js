import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Facebook from './containers/Facebook'
import Google from './containers/Google'

import { Provider } from 'react-redux'
import store from './store'

import Layout from './hocs/Layout'
import AIChat from './containers/AIChat'

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={Home}
                    />
                    <Route
                        exact
                        path='/login'
                        component={Login}
                    />
                    <Route
                        exact
                        path='/sign-up'
                        component={Signup}
                    />
                    <Route
                        exact
                        path='/facebook'
                        component={Facebook}
                    />
                    <Route
                        exact
                        path='/google'
                        component={Google}
                    />
                    <Route
                        exact
                        path='/reset-password'
                        component={ResetPassword}
                    />
                    <Route
                        exact
                        path='/password/reset/confirm/:uid/:token'
                        component={ResetPasswordConfirm}
                    />
                    <Route
                        exact
                        path='/activate/:uid/:token'
                        component={Activate}
                    />
                    <Route
                        exact
                        path='/ai-chat'
                        component={AIChat}
                    ></Route>
                </Switch>
            </Layout>
        </Router>
    </Provider>
)

export default App
