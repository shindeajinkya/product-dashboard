import React from 'react'
import { Modal, Form, Input } from 'antd'

function ModalForm({ visible, onCancel, onCreate }) {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title='Add a product'
            okText='Add'
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then(values => {
                    form.resetFields();
                    onCreate(values);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                })
            }}
        >
            <Form 
                form={form} 
                layout='vertical' 
                name="modal_form"
                initialValues={{
                productStock: 5,
                }}
                >
                <Form.Item 
                name='productName'
                label="Product Name" 
                rules={[{ 
                    required: true,
                    message: 'Please input the name of product'
                }]}>
                    <Input type='text'/>
                </Form.Item>
                <Form.Item 
                name='productLink'
                label="Product Link" 
                rules={[{ 
                    required: true,
                    message: 'Please input the link of product',
                }]}>
                    <Input type='url'/>
                </Form.Item>
                <Form.Item 
                label="Product Stock" 
                name='productStock'
                >
                    <Input type='number'/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalForm

