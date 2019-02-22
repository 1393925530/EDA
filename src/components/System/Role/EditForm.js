import React, { Component } from 'react';
import { Input, Form, Radio, Select } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;



class EditFrom extends Component {

    checkRole = (rule, value, callback) => {
        if (value != '角色组') {
          callback();
          return;
        }
        callback('请选择角色!');
      }

    render() {
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        
        const { form } = this.props;
        console.log(this.props.data);
        const {getFieldDecorator} = form;
        return (
            <Form> 
                <div style={{display:'none'}}> {getFieldDecorator('key',{initialVaule:this.props.data.key})
                        (<Input/>)}</div>
                <FormItem {...formItemLayout} label="角色名称">
                    {getFieldDecorator('name',{initialVaule:this.props.data.name})
                        (<Input style={{display:'none'}}/>)}<span>{this.props.data.name}</span>
                    </FormItem>
                <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('status',{initialValue:this.props.data.status})(<RadioGroup >
                        <Radio value='启用'>启用</Radio>
                        <Radio value='禁用'>禁用</Radio>
                    </RadioGroup>)}
                </FormItem>
                <FormItem {...formItemLayout} label="所属角色组">
                {getFieldDecorator('group',{initialValue:this.props.data.group,
                    rules: [{ validator: this.checkRole }]
                })(
                    <Select style={{ width: 130 }} >
                        <Option value="角色组">角色组</Option>
                        <Option value="设计人员">设计人员</Option>
                        <Option value="订单管理员">订单管理员</Option>
                        <Option value="质量管理员">质量管理员</Option>
                        <Option value="管理人员">管理人员</Option>
                        <Option value="系统管理员">系统管理员</Option>
                    </Select>)}
                </FormItem>
                <FormItem {...formItemLayout} label="备注">
                    {getFieldDecorator('note', {initialValue:this.props.data.note})(<TextArea />)}
                    </FormItem>
            </Form>
        )
    };
}


export default EditFrom = Form.create()(EditFrom);