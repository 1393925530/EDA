import React, { Component } from 'react';
import { Input, Form, Modal, Button, Steps} from 'antd';

const FormItem = Form.Item;
const Step = Steps.Step;
let uuid=0;
class AddFrom extends Component {

    state = {step: 0,param:'', subParams:[''+uuid],loading: false}

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
        let {subParams } = this.state;
        let params = [...subParams];
        uuid++;
        params.push(''+uuid);
        this.setState(
            { subParams: params }
        );
    }

    handleRemoveControl = (index) => {
        let {subParams } = this.state;
        console.log(subParams.filter(key => key !== index));
        this.setState({subParams:subParams.filter(key => key !== index)});
    }

    // 保存添加参数
    handleSubmit = (e) => {
        e.preventDefault();

        const { form } = this.props;
        const { param } = this.state;
        form.validateFields((err, fieldsValue) => {
            if (err)
                return;
            let sub = [];
            Object.keys(fieldsValue).map(key => sub.push({ name: fieldsValue[key] }))
            let item = { name: param, sub: sub };
            this.setState({loading: true});
            setTimeout(() => {
                this.setState({
                    step: 0,
                    param: '',
                    subParams: [''],
                    loading: false,
                });
                this.props.onAdd(item);
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
        const { form, visible } = this.props;
        const { step,loading,param,subParams } = this.state;
        const { getFieldDecorator } = form;
        return (
            <Modal
            visible={visible}
            title="添加参数"
            width={600}
            onCancel={this.props.onCancel}
            footer={step === 0 ? [<Button key="back" onClick={this.handleNextStep}>下一步</Button>,] : [
                <Button key="back" onClick={this.handlePrevStep}>上一步</Button>,
                <Button key="submit" loading={loading} type="primary" onClick={this.handleSubmit}>
                    提交
        </Button>,
            ]}
        >
            <Steps size="small" current={step}>
                <Step title="添加参数" />
                <Step title="添加子参数" />
            </Steps>
            {step === 0 ? <Form style={{ marginTop: 24 }}>
                <FormItem {...formItemLayout} label="参数名称">
                    {getFieldDecorator('name', visible ? {
                        initialValue: param,
                        rules: [{ required: true, message: '请输入参数名称！' }],
                    }:{})(
                        <Input key={`first_param`} />
                    )}
                </FormItem>
            </Form>
                : <Form style={{ marginTop: 24 }}>
                    {subParams.map((subParam, index) => (<FormItem key={`f_${subParam}`} {...formItemLayout} label="子参数名称">
                        {getFieldDecorator(`subName${subParam}`, {
                            rules: [{ required: true, message: '请输入子参数名称！' }],
                        })(
                            <span><Input style={{ width: 300 }} />&nbsp;&nbsp;
                                    {index === subParams.length - 1 ? <Button shape="circle" icon="plus" onClick={this.handleNewControl} /> :
                                    <Button shape="circle" icon="minus" onClick={this.handleRemoveControl.bind(this, subParam)} />}
                            </span>
                        )}
                    </FormItem>))}

                </Form>}
        </Modal>
        )
    };
}

export default AddFrom = Form.create()(AddFrom);
