import React, {Component} from 'react';
import {Button, Cascader, Col, DatePicker, Form, Radio, Row, Select, Input, InputNumber} from 'antd';
import axios from 'axios'
const FormItem = Form.Item;
const {RadioGroup} =Radio
const Option = Select.Option;
const { TextArea } = Input;
let uuid = 0;
//
class TeamForm extends Component {
  constructor(props) {
    super(props);
  }
  state = { subParams: ['' + uuid],subParams1: ['' + uuid],subParams2: ['' + uuid],subParams3: ['' + uuid],rows:[]}
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
  handleNewWiringPerson= () => {
    let { subParams1} = this.state;
    let params = [...subParams1];
    uuid++;
    params.push('' + uuid);
    this.setState(
      { subParams1: params }
    );
  }

  handleRemoveWiringPerson = (index) => {
    let { subParams1 } = this.state;
    console.log(subParams1.filter(key => key !== index));
    this.setState({ subParams1: subParams1.filter(key => key !== index) });
  }

  handleNewQCPerson= () => {
    let { subParams2} = this.state;
    let params = [...subParams2];
    uuid++;
    params.push('' + uuid);
    this.setState(
      { subParams2: params }
    );
  }

  handleRemoveQCPerson = (index) => {
    let { subParams2 } = this.state;
    console.log(subParams2.filter(key => key !== index));
    this.setState({ subParams2: subParams2.filter(key => key !== index) });
  }
  handleNewArcgisPerson= () => {
    let { subParams3} = this.state;
    let params = [...subParams3];
    uuid++;
    params.push('' + uuid);
    this.setState(
      { subParams3: params }
    );
  }

  handleRemoveArcgisPerson = (index) => {
    let { subParams3 } = this.state;
    console.log(subParams3.filter(key => key !== index));
    this.setState({ subParams3: subParams3.filter(key => key !== index) });
  }


  handleSubmitTeamInformation = (e)=>{
    e.preventDefault()
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
    })
  }
  handleSaveOrderTeamInformation=()=>{
    localStorage.setItem('teamData',JSON.stringify(this.props.form.getFieldsValue()))
  }

  componentDidMount() {
    this.props.form.setFieldsValue(JSON.parse(localStorage.getItem('teamData')))
    axios.post("http://10.0.17.16:8000/ccs_web_service/get_users",{updated_at:""}).then((res)=>{
      this.setState({rows:res.data.rows});
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const { loading, param, subParams,subParams1,subParams2,subParams3} = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmitTeamInformation} autoComplete="off">
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="EDA设计单号" style={{fontWeight: 'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode', {
                  rules: [{ required: true, message: '请输入EDA设计单号!' }]
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="下单客户" {...formItemLayout}>
                {getFieldDecorator('orderPersonName')(
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
              <FormItem label="下单客服编号" {...formItemLayout}>
                {getFieldDecorator('orderPersonCode')(<Input placeholder="请输入" disabled />)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="服务客服" {...formItemLayout}>
                {getFieldDecorator('servicePersonName')(
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
              <FormItem label="服务客户编号" {...formItemLayout}>
                {getFieldDecorator('servicePersonCode')(<Input placeholder="请输入" disabled />)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计联系销售部" {...formItemLayout}>
                {getFieldDecorator('serviceName')(
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
              <FormItem label="设计联系销售编号" {...formItemLayout}>
                {getFieldDecorator('servicePersonCode')(<Input placeholder="请输入" disabled />)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="调度员" {...formItemLayout}>
                {getFieldDecorator('dispatchPersonName')(
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
              <FormItem label="调度员编号" {...formItemLayout} >
                {getFieldDecorator('dispatchPersonCode')(<Input placeholder="请输入"  disabled/>)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="项目负责人" {...formItemLayout}>
                {getFieldDecorator('directorPersonName')(
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
              <FormItem label="项目负责人编号" {...formItemLayout}>
                {getFieldDecorator('directorPersonCode')(<Input placeholder="请输入"  disabled/>)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ fontWeight: 'bold', color: 'black',marginBottom:'21px',marginLeft:'21px'}}>
              布局
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem label="布局人员" {...formItemLayout} >
                    <Select
                    >
                      {this.state.rows.map((value, key) => {
                        return (<Option key={key}  value={value.name} >{value.name}</Option>)
                      })}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formItemLayout} label="布局人员编号">
                    {getFieldDecorator(`subName${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入布局人员编号！' }],
                    } : {})(
                      <span>
                        <Input />
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} style={{height:'32px',display:'flex',alignItems:'center'}}>
                  {index === subParams.length - 1 ?
                    <Button shape="circle" icon="plus" type='primary' size='small' onClick={this.handleNewControl} /> :
                    <Button shape="circle" icon="minus" type='danger' size='small' onClick={this.handleRemoveControl.bind(this, subParam)} />}
                </Col>
              </Row>))}
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ fontWeight: 'bold', color: 'black',marginBottom:'21px',marginLeft:'21px'}}>
              布线
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams1.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem label="布线人员" {...formItemLayout}>
                    <Select
                    >
                      {this.state.rows.map((value, key) => {
                        return (<Option key={key}  value={value.name} >{value.name}</Option>)
                      })}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formItemLayout} label="布线人员编号">
                    {getFieldDecorator(`wiringPersonCode${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入布线人员编号！' }],
                    } : {})(
                      <span>
                        <Input />
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} style={{height:'32px',display:'flex',alignItems:'center'}}>
                  {index === subParams1.length - 1 ?
                    <Button shape="circle" icon="plus" type='primary' size='small' onClick={this.handleNewWiringPerson} /> :
                    <Button shape="circle" icon="minus" type='danger' size='small' onClick={this.handleRemoveWiringPerson.bind(this, subParam)} />}
                </Col>
              </Row>))}
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{fontWeight: 'bold', color: 'black',marginBottom: '21px',marginLeft:'21px'}}>
              质检师
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams2.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem  label="质检师姓名" {...formItemLayout}>
                    <Select
                    >
                      {this.state.rows.map((value, key) => {
                        return (<Option key={key}  value={value.name} >{value.name}</Option>)
                      })}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formItemLayout} label="质检师编号">
                    {getFieldDecorator(`qcPersonCode${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入质检师编号！' }],
                    } : {})(
                      <span>
                        <Input />
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} style={{height:'32px',display:'flex',alignItems:'center'}}>
                  {index === subParams2.length - 1 ?
                    <Button shape="circle" icon="plus" type='primary' size='small' onClick={this.handleNewQCPerson} /> :
                    <Button shape="circle" icon="minus" type='danger' size='small' onClick={this.handleRemoveQCPerson.bind(this, subParam)} />}
                </Col>
              </Row>))}
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{fontWeight: 'bold', color: 'black',marginBottom: '21px',marginLeft:'21px'}}>
              建库人员
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams3.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem  label="建库人员姓名" {...formItemLayout}>
                    <Select
                    >
                      {this.state.rows.map((value, key) => {
                        return (<Option key={key}  value={value.name}  >{value.name}</Option>)
                      })}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  {...formItemLayout} label="建库人员编号">
                    {getFieldDecorator(`arcgisPersonCode${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入建库人员编号！' }],
                    } : {})(
                      <span>
                        <Input />
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} style={{height:'32px',display:'flex',alignItems:'center'}}>
                  {index === subParams3.length - 1 ?
                    <Button shape="circle" icon="plus" type='primary' size='small' onClick={this.handleNewArcgisPerson}  /> :
                    <Button shape="circle" icon="minus" type='danger' size='small' onClick={this.handleRemoveArcgisPerson.bind(this, subParam)}  />}
                </Col>
              </Row>))}
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ float: 'left', marginBottom: 24 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleSaveOrderTeamInformation}>
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
export default TeamForm=Form.create({})(TeamForm);
