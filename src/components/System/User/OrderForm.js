import React, {Component} from 'react';
import {Button, Cascader, Col, DatePicker, Form, Radio, Row, Select, Input, Upload, Icon, InputNumber} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
      userList: [],
      department_code:'',
      designList:[],
      technologyList:[],
      boardList:[],
      gradeList:[],
      PCBList:[],
      rows:[],
      saleDepCode:'',
      technologyPersonCode:'',
      orderPersonCode:'',
      servicePersonCode:'',
      directorPersonCode:'',
      layoutPersonCode:'',
      WiringPersonCode:''
    };
  }
  handleSaleDepName=(option)=>{
   this.setState({
     saleDepCode:option.props.code
   })
  }
  handleTechnologyPersonCode=(option)=>{
    this.setState({technologyPersonCode:option.props.code});
  }
  handleOrderPersonName=(option)=>{
    this.setState({orderPersonCode:option.props.code})
  }
 handleServicePersonName=(option)=>{
    this.setState({servicePersonCode:option.props.code})
 }
  handleDirectorPersonName=(option)=>{
    this.setState({directorPersonCode:option.props.code});
  }
  handleLayoutPersonName=(option)=>{
    this.setState({layoutPersonCode:option.props.code});
  }
  handleWiringPersonName=(option)=>{
    this.setState({WiringPersonCode:option.props.code})
  }
  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.slice(-2);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return false;
    });

    this.setState({fileList});
  }
  handleSubmitOrderInformation = (e) => {
    e.preventDefault()
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo)
    this.props.form.validateFields((err, values) => {
    })
  }

  handleSaveOrderInformation = () => {
    localStorage.setItem('orderData', JSON.stringify(this.props.form.getFieldsValue()))
  }

  componentDidMount() {
    this.props.form.setFieldsValue(JSON.parse(localStorage.getItem('orderData')))
    const paramList=["DTMS_0033","TB_PCB_TECHNOLOGY","DTMS_0018","TB_PCB_GRADE","DTMS_1157"]
    for(let index in paramList){
      axios.post('http://10.0.17.17:8080/dtms/api/parameter/getData', {
        code:index
      })
        .then( (res)=> {
          switch(res.data.code)
          {
            case "DTMS_0033":
              this.setState({designList:res.data.parameterChilds});
              break;
            case "TB_PCB_TECHNOLOGY":
              this.setState({technologyList:res.data.parameterChilds});
              break;
            case "DTMS_0018":
              this.setState({boardList:res.data.parameterChilds});
              break;
            case "TB_PCB_GRADE":
              this.setState({gradeList:res.data.parameterChilds});
              break;
            case "DTMS_1157":
              this.setState({PCBList:res.data.parameterChilds});
              break;
            default:
              break
          }
          console.log(res);
        })
        .catch( (err)=> {
          console.log(err);
        });
    }
    axios.get("/ccs_web_service/get_users",{updated_at:""}).then((res)=>{
      this.setState({rows:res.data.rows});
    })
  }


  render() {
    const {MonthPicker, RangePicker, WeekPicker} = DatePicker;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 9},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 15},
      },
    };
    const {form} = this.props;
    const {getFieldDecorator} = form;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmitOrderInformation} autoComplete="off">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="EDA设计单号" style={{fontWeight: 'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode', {
                  rules: [{
                    required: true, message: '请输入EDA设计单号!', max: 32
                  }]
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="销售部门"  {...formItemLayout}>
                {getFieldDecorator('saleDepName')(<Select onChange={this.handleSaleDepName}
                  showSearch placeholder='请选择'
                >
                  {this.state.rows.map((value, key) => {
                  return (<Option key={key} code={value.code}  value={value.department_name} >{value.department_name}</Option>)
                })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="销售部门编号" {...formItemLayout}>
                {getFieldDecorator('saleDepCode',{initialValue:this.state.saleDepCode})(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="客户单位全称" {...formItemLayout}>
                {getFieldDecorator('unitFullName')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="客户单位简称" {...formItemLayout}>
                {getFieldDecorator('unitSimpleName', {
                  rules: [{
                    required: true, message: '请输入客户单位简称!', max: 32
                  }]
                })(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="客户单位编号" {...formItemLayout} >
                {getFieldDecorator('unitCode', {
                  rules: [{
                    required: true, message: '请输入客户单位编号!', max: 32
                  }]
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="客户联系人" {...formItemLayout}>
                {getFieldDecorator('customerContactName', {
                  rules: [{
                    required: true, message: '请输入客户联系人!', max: 32
                  }]
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="客户联系人编号" {...formItemLayout}>
                {getFieldDecorator('customerContactCode')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="客户部门" {...formItemLayout}>
                {getFieldDecorator('customerDep', {
                  initialValue: '',
                  rules: [{required: true, message: '请输入客户部门!'}],
                })(
                  <Select placeholder='请选择'
                          showSearch
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="性别" {...formItemLayout}>
                {getFieldDecorator('sex', {initialValue: '男'})(<RadioGroup>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="手机号" {...formItemLayout}>
                {getFieldDecorator('phoneNum', {
                  rules: [{required: true}]
                })(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="固话" {...formItemLayout}>
                {getFieldDecorator('fixedPhoneNo')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="邮箱" {...formItemLayout}>
                {getFieldDecorator('email', {
                  rules: [{required: true, type: "email"}]
                })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('address')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="客户单位效益PIN系数" {...formItemLayout}>
                {getFieldDecorator('benefitPin')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="文件名" {...formItemLayout}>
                {getFieldDecorator('fileName')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="原文件名" {...formItemLayout}>
                {getFieldDecorator('originalFileName')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="PCB设计软件" {...formItemLayout}>
                {getFieldDecorator('softwareName')(
                  <Cascader placeholder='请选择'/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="工作量" {...formItemLayout}>
                {getFieldDecorator('workload')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="PIN数" {...formItemLayout}>
                {getFieldDecorator('pin')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="备料号" {...formItemLayout}>
                {getFieldDecorator('stockCode')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="要求完成日期" {...formItemLayout}>
                {getFieldDecorator('demandStartDate')(
                  <RangePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计类型" {...formItemLayout}>
                {getFieldDecorator('designType')(
                  <Select placeholder="请选择" placeholder='请选择'
                          showSearch
                  >
                    {this.state.designList.map((key,value)=>{
                      return (<Option value={value} key={key}>{value}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="工艺类型" {...formItemLayout}>
                {getFieldDecorator('technologyType')(<Select
                  showSearch placeholder="请选择"
                >
                  {this.state.technologyList.map((key,value)=>{
                    return (<Option value={value.parameterName} key={key}>{value.parameterName}</Option>)
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="板卡类型" {...formItemLayout}>
                {getFieldDecorator('boardCardType')(
                  <Select placeholder="请选择"
                          showSearch
                  >
                    {this.state.boardList.map((key,value)=>{
                      return (<Option value={value} key={key}>{value}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="等级" {...formItemLayout}>
                {getFieldDecorator('level')(
                  <Select placeholder="请选择"
                          showSearch

                  >
                    {this.state.gradeList.map((key,value)=>{
                      return (<Option value={value} key={key}>{value}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="器件数量" {...formItemLayout}>
                {getFieldDecorator('deviceNum')(<InputNumber placeholder="请输入" min={1} style={{width: '100%'}}/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="BGA数量" {...formItemLayout}>
                {getFieldDecorator('bagNum',{ rules: [{
                    required: true, message: '请输入正确的BGA数量!', max: 6
                  }]
                })(
                  <InputNumber placeholder="请输入" min={1} style={{width: '100%'}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="重点单位接口人" {...formItemLayout}>
                {getFieldDecorator('keyUnitInterface')(<Select placeholder='请选择'
                                                               showSearch
                >
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="服务模式" {...formItemLayout}>
                {getFieldDecorator('serviceMode')(
                  <Select placeholder='请选择'
                          showSearch
                  >
                    <Option value="外协服务 ">外协服务</Option>
                    <Option value="组合服务">组合服务</Option>
                    <Option value="本地服务">本地服务</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="服务地区" {...formItemLayout}>
                {getFieldDecorator('event')(
                  <Select placeholder='请选择'
                          showSearch
                  >
                  </Select>
                )}
              </FormItem>
            </Col>

          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="板厚要求" {...formItemLayout}>
                {getFieldDecorator('thicknessRequest')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="层数要求" {...formItemLayout}>
                {getFieldDecorator('levelRequest')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="电子原理图" {...formItemLayout}>
                {getFieldDecorator('schematicFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>

          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="SI仿真要求" {...formItemLayout}>
                {getFieldDecorator('simulationFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="阻抗要求" {...formItemLayout}>
                {getFieldDecorator('impedanceFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="冷板要求" {...formItemLayout}>
                <RadioGroup>
                  {getFieldDecorator('coldplateFlag', {initialValue: '1'})(<RadioGroup>
                    <Radio value='1'>有</Radio>
                    <Radio value='2'>无</Radio>
                  </RadioGroup>)}
                </RadioGroup>

              </FormItem>
            </Col>

          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="禁布要求" {...formItemLayout}>
                {getFieldDecorator('noLayoutFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="限高要求" {...formItemLayout}>
                {getFieldDecorator('hignLimitFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="机械孔要求" {...formItemLayout}>
                {getFieldDecorator('holeRequestFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>

          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="器件定位要求" {...formItemLayout}>
                {getFieldDecorator('locationFlag', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计联系销售" {...formItemLayout}>
                {getFieldDecorator('technologyPersonName')(
                  <Select placeholder="请选择" showSearch onChange={this.handleTechnologyPersonCode}>
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key} code={value.code}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="设计联系销售编号" {...formItemLayout}>
                {getFieldDecorator('technologyPersonCode',{initialValue:this.state.technologyPersonCode})(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="下单客服" {...formItemLayout}>
                {getFieldDecorator('orderPersonName')(<Select placeholder="请选择"
                                                              showSearch onChange={this.handleOrderPersonName}
                >
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="下单客服编号" {...formItemLayout}>
                {getFieldDecorator('orderPersonCode',{initialValue:this.state.orderPersonCode})(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="下单日期" {...formItemLayout}>
                {getFieldDecorator('orderCreateTime')(
                  <DatePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="服务客服" {...formItemLayout}>
                {getFieldDecorator('servicePersonName')(<Select placeholder="请选择"
                                                                showSearch onChange={this.handleServicePersonName}
                >
                  {this.state.rows.map((value, key) => {
                    return (<Option key={key}  value={value.name} >{value.name}</Option>)
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="服务客户编号" {...formItemLayout}>
                {getFieldDecorator('servicePersonCode',{initialValue:this.state.servicePersonCode})(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="评估单流水号" {...formItemLayout}>
                {getFieldDecorator('valuationCode')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="优先级" {...formItemLayout}>
                {getFieldDecorator('priorityLevel', {
                  initialValue: 1
                })(
                  <Select placeholder="请选择">
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                  </Select>)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="仿真" {...formItemLayout}>
                {getFieldDecorator('simulation', {initialValue: '1'})(<RadioGroup>
                  <Radio value='1'>有</Radio>
                  <Radio value='2'>无</Radio>
                </RadioGroup>)}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="总设计工时" {...formItemLayout}>
                {getFieldDecorator('overallDesignHour',{ rules: [{
                    message: '请输入总设计工时!',max:5
                  }]})(
                  <Input addonAfter="小时"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布局工时" {...formItemLayout}>
                {getFieldDecorator('layoutHour',{ rules: [{
                    required: false, message: '请输入布局工时!',max:5
                  }]})(
                  <Input addonAfter="小时"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布线工时" {...formItemLayout}>
                {getFieldDecorator('wiringHour',{ rules: [{
                    required: false, message: '请输入布线工时!',max:5
                  }]})(
                  <Input addonAfter="小时"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="评估周期" {...formItemLayout}>
                {getFieldDecorator('startDate')(
                  <RangePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <Col span={8}>
              <FormItem label="调度单流水号" {...formItemLayout}>
                {getFieldDecorator('dispatchCode')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="项目负责人" {...formItemLayout} >
                {getFieldDecorator('directorPersonName')(
                  <Select placeholder="请选择" showSearch onChange={this.handleDirectorPersonName}>
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>

                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="项目负责人编号" {...formItemLayout}>
                {getFieldDecorator('directorPersonCode' ,{initialValue:this.state.directorPersonCode})(
                  <Input placeholder="请输入" disabled/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布局人员" {...formItemLayout}>
                {getFieldDecorator('layoutPersonName')(
                  <Select
                    placeholder="请选择" showSearch onChange={this.handleLayoutPersonName}
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布局人员编号" {...formItemLayout}>
                {getFieldDecorator('layoutPersonCode',{initialValue:this.state.layoutPersonCode})(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布局要求周期" {...formItemLayout}>
                {getFieldDecorator('layoutDemandEndDate')(
                  <RangePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="布线人员" {...formItemLayout}>
                {getFieldDecorator('wiringPersonName')(
                  <Select
                    placeholder="请选择" showSearch onChange={this.handleWiringPersonName}
                  >
                    {this.state.rows.map((value, key) => {
                      return (<Option key={key}  value={value.name} >{value.name}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布线人员编号" {...formItemLayout}>
                {getFieldDecorator('wiringPersonCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="布线要求周期" {...formItemLayout}>
                {getFieldDecorator('wiringDemandEndDate')(
                  <RangePicker style={{width: "100%"}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="备注" {...formItemLayout}>
                {getFieldDecorator('requestDesc')(
                  <TextArea/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="附件" {...formItemLayout}>
                <Upload {...props} fileList={this.state.fileList}>
                  <Button>
                    <Icon type="upload"/> 上传
                  </Button>
                </Upload>
              </FormItem>
            </Col>
            <Col span={8}>

            </Col>
            <Col span={8}>
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

export default OrderForm = Form.create({})(OrderForm)
