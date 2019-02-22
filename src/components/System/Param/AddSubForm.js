import React, { Component } from 'react';
import { Input, Form, Modal, Button } from 'antd';

const FormItem = Form.Item;
let uuid = 0;
class AddFrom extends Component {

    state = { subParams: ['' + uuid], loading: false }

    handleNextStep = () => {
        const { step } = this.state;
        const { form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err)
                return;
            console.log(fieldsValue);

            this.setState(
                {
                    step: step + 1,
                    param: fieldsValue.name
                }
            )
        });

    }

    handlePrevStep = () => {
        const { step } = this.state;
        const { form } = this.props;

        console.log(form.fieldsValue);
        this.setState(
            { step: step - 1 }
        )
    }

    handleNewControl = () => {
        let { subParams } = this.state;
        let params = [...subParams];
        uuid++;
        params.push('' + uuid);
        this.setState(
            { subParams: params }
        );
    }

    handleRemoveControl = (index) => {
        let { subParams } = this.state;
        console.log(subParams.filter(key => key !== index));
        this.setState({ subParams: subParams.filter(key => key !== index) });
    }

    handleSubSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err)
                return;
            let sub = [];
            Object.keys(fieldsValue).map(key =>
                key !== 'name' && sub.push({ name: fieldsValue[key] }));

            this.setState({ loading: true });
            setTimeout(() => {
                uuid = 0;
                this.setState({
                    subParams: [''+uuid],
                    loading: false,
                });
                this.props.onAdd(sub);
            }, 1000);
        });

    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { form, visible, parent } = this.props;

        const { loading, param, subParams } = this.state;
        console.log(subParams);
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={`添加子参数-${parent}`}
                width={600}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="cancel" onClick={this.props.onCancel}>取消</Button>,
                    <Button key="submit" loading={loading} type="primary" onClick={this.handleSubSubmit}>
                        提交
        </Button>,
                ]}
            >
                <Form style={{ marginTop: 24 }}>

                    {subParams.map((subParam, index) => (<FormItem key={`subf_${subParam}`} {...formItemLayout} label="子参数名称">
                        {getFieldDecorator(`subName${subParam}`, visible ? {
                            initialValue: subParam,
                            rules: [{ required: true, message: '请输入子参数名称！' }],
                        } : {})(
                            <span><Input style={{ width: 300 }} />&nbsp;&nbsp;
            {index === subParams.length - 1 ? <Button shape="circle" icon="plus" onClick={this.handleNewControl} /> :
                                    <Button shape="circle" icon="minus" onClick={this.handleRemoveControl.bind(this, subParam)} />}
                            </span>
                        )}
                    </FormItem>))}

                </Form>
            </Modal>
        )
    };
}

export default AddFrom = Form.create()(AddFrom);
