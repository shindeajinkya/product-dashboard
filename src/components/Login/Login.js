import React from 'react'
import { Button, Typography, Space, Card } from 'antd'
import app, { provider } from '../../base'
import './Login.css'

const { Title } = Typography


function Login({history}){
    function signIn() {
        app
        .auth()
        .signInWithPopup(provider)
        .then(() => {
            history.push('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='container flex login'>
            <Space direction='vertical'>
                <Card>
                    <Title>ProDash</Title>
                    <Button onClick={signIn} type='primary'>Sign In With Google</Button>
                </Card>
            </Space>
        </div>
    )
}

export default Login