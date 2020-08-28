import React, { useCallback } from 'react'
import { Button, Typography, Space, Card } from 'antd'
import { withRouter } from 'react-router-dom'
import app, { provider } from '../../base'
import './Login.css'

const { Title } = Typography


function Login({history}){
    const signIn = useCallback(async event => {
        event.preventDefault()
        await app
        .auth()
        .signInWithPopup(provider)
        .then(res => history.push('/'))
        .catch(err => console.log(err))
    }, [history])

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

export default withRouter(Login)