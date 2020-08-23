import React, { useState, useEffect } from 'react'
import app, { db } from '../../base'
import { Layout, Button, List } from 'antd'
import ModalForm from './ModalForm'
import './Dashboard.css'
const { Header } = Layout


function Dashboard(){
    const [visible, setVisible] = useState(false);
    const [productArray, setProductArray] = useState([])

    useEffect(() => {
        const userid = app.auth().currentUser.uid
        const docRef = db.collection("users").doc(`${userid}`)
        docRef.get()
        .then(doc => {
            if(doc.exists){
                if(productArray !== doc.data().products){
                    setProductArray(doc.data().products)
                }
            }else{
                console.log('not found', doc.exists)
            }
        })
        .catch(err => console.log(err, 'error'))

        return () => {
            console.log('unmounted')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Signs out of the app
    function signOut() {
        app.auth().signOut()
    }

    // updating firebase 
    const updateProducts = async (productArray) => {
        setProductArray(productArray)
        await db.collection('users')
        .doc(`${app.auth().currentUser.uid}`)
        .set({
            products: productArray
        })
        .catch(err => console.log(err))
    }

    // delete product
    const deleteProduct = (productLink) => {
        updateProducts(productArray.filter((product) => product.productLink !== productLink))
    }

    //Handles what to do after form gets submitted successfully
    const onCreate = values => {
        console.log('Received values of form: ', values);
        updateProducts(productArray.concat(values))
        setVisible(false);
    }

    return (
        <Layout className='layout'>
            <Header>
                <Button className='btn add-product' onClick={() => setVisible(true)} type='primary'>Add a Product</Button>
                <Button className='btn signout' onClick={signOut} type='danger'>Sign Out</Button>
            </Header>
            <List
                itemLayout="horizontal"
                dataSource={productArray}
                renderItem={product => (
                <List.Item className='list-item'>
                    <List.Item.Meta
                    title={<a href={product.productLink}>{product.productName}</a>}
                    description={`Product Stock: ${product.productStock}`}
                    />
                    <Button className='btn del-product' onClick={() => deleteProduct(product.productLink)} type='danger'>Delete</Button>
                </List.Item>
                )}
            />
            <ModalForm
                visible={visible}
                onCancel={() => setVisible(false)}
                onCreate={onCreate}
            />
        </Layout>
    )
}

export default Dashboard