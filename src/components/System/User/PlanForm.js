import React, {Component} from 'react';
import moment from 'moment';
import {Button, Cascader, Col, DatePicker, Form, Radio, Row, Select, Input, InputNumber} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const {RadioGroup} = Radio
const Option = Select.Option;
moment.locale('zh-cn');

const {TextArea} = Input;
class PlanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[]
    };

  }
  handleSubmitProjectPlan = (e)=>{

    this.props.form.validateFields((err,values)=>{
    })
  }
  handleSaveProjectPlan=()=>{
    localStorage.setItem('planData',JSON.stringify(this.props.form.getFieldsValue()))
  }

  componentDidMount() {
    this.props.form.setFieldsValue(JSON.parse(localStorage.getItem('planData')))
    axios.post("http://10.0.17.17:8080/ccs_web_service/get_users",{updated_at:""}).then((res)=>{
      this.setState({rows:res.data.rows});
    })

  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15},
      },
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmitProjectPlan} autoComplete="off">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="EDA设计单号" style={{fontWeight: 'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode', {
                  rules: [{required: true, message: '请输入EDA设计单号!'}],
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="项目计划流水号" style={{fontWeight: 'bolder'}} {...formItemLayout}>
                {getFieldDecorator('serialNumber', {
                  rules: [{required: true, message: '请输入项目计划流水号!'}],
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              布局
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布局工时" {...formItemLayout}>
                {getFieldDecorator('layoutWorktime',{rules:[{max:5,type:"float",message:"请输入布局工时"}]})(<Input  addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('layoutPersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('layoutPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('layoutPlanDate')(<DatePicker style={{width: "100%"}}  showTime={{ format: 'HH:mm' }}
                                                                 format="YYYY-MM-DD HH:mm" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('layoutActualDate')(
                  <DatePicker style={{width: "100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              布局校对
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布局校对工时" {...formItemLayout}>
                {getFieldDecorator('layoutProofreadWorktime',{rules:[{max:5,type:"float",message:"请输入布局校对工时"}]})(<Input addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('layoutProofreadPersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('layoutProofreadPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('layoutProofreadPlanDate')(<DatePicker style={{width: "100%"}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('layoutProofreadActualDate')(
                  <DatePicker style={{width: "100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              布线
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布线工时" {...formItemLayout}>
                {getFieldDecorator('wiringWorktime',{rules:[{max:5,type:"float",message:"请输入布线工时"}]})(<Input addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('wiringPersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('wiringPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('wiringPlanDate')(<DatePicker style={{width: "100%"}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('wiringActualDate')(
                  <DatePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              布局校对
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布线校对工时" {...formItemLayout}>
                {getFieldDecorator('wiringProofreadWorktime',{rules:[{max:5,type:"float",message:"请输入布线校对工时"}]})(<Input addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('wiringProofreadPersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('wiringProofreadPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('wiringProofreadPlanDate')(<DatePicker style={{width: "100%"}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('wiringProofreadActualDate')(
                  <DatePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              质检投产
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="质检投产工时" {...formItemLayout}>
                {getFieldDecorator('qcWorktime')(<Input addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('qcPersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('qcPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('qcPlanDate')(<DatePicker style={{width: "100%"}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('qcActualDate')(
                  <DatePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '21px', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              设计归档
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计归档工时" {...formItemLayout}>
                {getFieldDecorator('designArchiveWorktime')(<Input addonAfter="小时"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('designArchivePersonName')(
                  <Select
                    showSearch
                    placeholder="请输入"
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="负责人编号" {...formItemLayout}>
                {getFieldDecorator('designArchivePersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="计划完成日期" {...formItemLayout}>
                {getFieldDecorator('designArchivePlanDate')(<DatePicker style={{width: "100%"}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="实际完成日期" {...formItemLayout}>
                {getFieldDecorator('designArchiveActualDate')(
                  <DatePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{overflow: 'hidden'}}>
                <div style={{float: 'left', marginBottom: 24}}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{marginLeft: 8}} onClick={this.handleSaveProjectPlan}>
                    保存
                  </Button>
                </div>
              </div>

            </Col>

          </Row>
        </Form>
      </div>
    );
  }
}

export default PlanForm=Form.create({})(PlanForm);
