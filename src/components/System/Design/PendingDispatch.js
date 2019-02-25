import React, { Component } from 'react';
import { Input, Form, Radio, Select, Col, Row, Button} from 'antd';
import PendingDispatchList from './PendingDispatchList';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

class PendingDispatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {

        const { form } = this.props;
        const { getFieldDecorator } = form;
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
        const formItemLayout2 = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
          },
        };
        return (
          <div>
            <Form onSubmit={this.handleSubmitList} autoComplete="off">
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="EDA设计单号" {...formItemLayout}>
                    {getFieldDecorator('designCode')(
                      <Input style={{width:"100%"}} placeholder="" />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="文件名" {...formItemLayout}>
                    {getFieldDecorator('streamNo')(
                      <Input style={{width:"100%"}} placeholder=""  />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="客户单位简称" {...formItemLayout}>
                    {getFieldDecorator('revision')(
                      <Input style={{width:"100%"}} placeholder="" />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="客户联系人" {...formItemLayout}>
                    {getFieldDecorator('documentNum')(
                      <Input style={{width:"100%"}} placeholder="" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="设计联系销售" {...formItemLayout}>
                    {getFieldDecorator('customerUnit')(
                      <Input style={{width:"100%"}} placeholder=""/>
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="服务地区" {...formItemLayout}>
                    {getFieldDecorator('contactCode')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                      <Option value=""></Option>
                      <Option value=""></Option>
                    </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={11}>
                 <div style={{ overflow: 'hidden' }}>
                  <div style={{ float: 'right', marginBottom: 24 }}>
                  <Button type="danger" style={{ marginRight: 10}} onClick={this.handleSaveDesignAndDevelopInput}>
                    重置
                  </Button>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  </div>
                 </div>
                </Col>
              </Row>
            </Form>
            <PendingDispatchList />
          </div>
        );
      }
}

export default PendingDispatch =Form.create({})(PendingDispatch)