import React, {Component} from 'react';
import {Table, Popconfirm, Button, Col, DatePicker, Form, Row, Select, Input, InputNumber} from 'antd';
import axios from "axios";
import EditableTable from './TableRisk';
import EditableTableTwo from './TableProperty';
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;
const { TextArea } = Input;
const columns = [{
  title: '阶段划分',
  dataIndex: 'name',
}, {
  title: '责任人',
  dataIndex: 'person',
}, {
  title: '责任部门',
  dataIndex: 'department',
}, {
  title: '完成时间',
  dataIndex: 'endDate',
}
];

const data = [
  {
  name: '设计策划',
  age: '',
  address: '',
}, {
  name: '设计输入',
  age: '',
  address: '',
}, {
  name: '设计建库',
  age: '',
  address: '',
}, {
  name: '建库评审',
  age: '',
  address: '',
}, {
  name: '建库确认',
  age: '',
  address: '',
}, {
  name: '设计布局',
  age: '',
  address: '',
}, {
  name: '布局评审',
  age: '',
  address: '',
}, {
  name: '布局确认',
  age: '',
  address: '',
}, {
  name: '设计布线',
  age: '',
  address: '',
}, {
  name: '布线评审',
  age: '',
  address: '',
}, {
  name: '布线确认',
  age: '',
  address: '',
}, {
  name: '设计输出',
  age: '',
  address: '',
}, {
  name: '设计验证',
  age: '',
  address: '',
}, {
  name: '设计确认',
  age: '',
  address: '',
}, {
  name: '设计投产',
  age: '',
  address: '',
}, {
  name: '产品验证',
  age: '',
  address: '',
}, {
  name: '产品交付',
  age: '',
  address: '',
}, {
  name: '产品确认',
  age: '',
  address: '',
}
];
let uuid = 0;

class  DesignAndDevelopPlanForm  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      designList:[],
      technologyList:[],
      craftList:[],
      qualityList:[],
      checkList:[],
      approveList:[],
      pcbList:[],
      boardList:[],
      subParams: ['' + uuid]
    };

  }
  controlpoint = e => {
    const reg = /^(-)*(\d+)\.(\d\d).*$/;
    e.target.value = e.target.value.replace(reg, "$1$2.$3");
    this.props.form.setFieldsValue({
      qualityScoreStart: e.target.value
    });

  };
  handleNewControl = () => {
    let { subParams } = this.state;
    let params = [...subParams];
    uuid++;
    params.push('' + uuid);
    this.setState(
      { subParams: params }
    );
  };

  handleRemoveControl = (index) => {
    let { subParams } = this.state;
    console.log(subParams.filter(key => key !== index));
    this.setState({ subParams: subParams.filter(key => key !== index) });
  };

  handleSubmitPlan = (e)=>{
    e.preventDefault();
    let compactDate = this.props.form.getFieldValue("compactDate").format("YYYY-MM-DD");
    let auditDate = this.props.form.getFieldValue("auditDate").format("YYYY-MM-DD");
    let countersigneDate = this.props.form.getFieldValue("countersigneDate").format("YYYY-MM-DD");
    let examineDate = this.props.form.getFieldValue("examineDate").format("YYYY-MM-DD");
    let approveDate = this.props.form.getFieldValue("approveDate").format("YYYY-MM-DD");
    this.props.form.validateFields((err,values)=>{
      if (err) {
        return;
      }
      else {
          let userInfo = {...values,compactDate,auditDate,countersigneDate,examineDate,approveDate};
          console.log(userInfo);
      }
    })
  };

  getParamByCode=()=>{
    axios.get("/user.json").then((res)=>{
      console.log(res.data)
    })
  };

  // handleSaveDesignAndDevelopPlan=()=>{
  //   localStorage.setItem('plan',JSON.stringify(this.props.form.getFieldsValue()))
  // };

  componentDidMount() {
    let plan=JSON.parse(localStorage.getItem('plan'))
    this.props.form.setFieldsValue(plan)
    const paramList=["DTMS_0033","TB_PCB_TECHNOLOGY","DTMS_1122","DTMS_0018","DTMS_1127","DTMS_1131","DTMS_1133","DTMS_1157"]
      axios.post('http://localhost:8080/dtms/api/parameter/getData', {
        code:12
      })
        .then((res)=> {
          let data=res.data.data;
          switch(res.data.data.code)
          {
            case "DTMS_0033":
              this.setState({designList:data.parameterChilds,technologyList:data.parameterChilds,
                boardList:data.parameterChilds, craftList:data.parameterChilds,qualityList:data.parameterChilds,
                checkList:data.parameterChilds,approveList:data.parameterChilds,pcbList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "TB_PCB_TECHNOLOGY":
              this.setState({technologyList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_0018":
              this.setState({boardList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_1122":
              this.setState({craftList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_1127":
              this.setState({qualityList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_1131":
              this.setState({checkList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_1133":
              this.setState({approveList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            case "DTMS_1157":
              this.setState({pcbList:data.parameterChilds});
              console.log(data.parameterChilds);
              break;
            default:

          }
        })
        .catch( (err)=> {
        });
  }

  render() {

    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { visible } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };const formItemLayout3 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const { loading, param, subParams } = this.state;
    const reg = /^(-)*(\d+)\.(\d\d).*$/;
    return (
      <div>
        <Form onSubmit={this.handleSubmitPlan} autoComplete="off">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="流水号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('streamNo', {
                  rules: [{ required: true, message: '请输入流水号!' }],
                })(
                  <Input placeholder="请输入流水号" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="版本号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('revision', {
                  rules: [{ required: true, message: '请输入版本号!' }],
                })(
                  <Input placeholder="请输入版本号" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="文件编号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('documentNum', {
                  rules: [{ required: true, message: '请输入编号!' }],
                })(
                  <Input placeholder="请输入编号" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              基础信息
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="单号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode')(
                  <Input placeholder="请输入设计单号" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="顾客单位" {...formItemLayout}>
                {getFieldDecorator('customerUnit')(
                  <Input placeholder="请输入顾客单位"/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="开发周期" {...formItemLayout}>
                {getFieldDecorator('developRound')(
                  <RangePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="项目负责人" {...formItemLayout}>
                {getFieldDecorator('projectManager')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value=""></Option>
                    <Option value=""></Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="设计PIN" {...formItemLayout}>
                {getFieldDecorator('pin')(
                  <InputNumber placeholder="请输入设计PIN" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="工艺类型" {...formItemLayout}>
                {getFieldDecorator('technology')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    <Option value=""></Option>
                    <Option value=""></Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计类型" {...formItemLayout}>
                {getFieldDecorator('designType')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.designList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="设计软件" {...formItemLayout}>
                {getFieldDecorator('software')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.pcbList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              项目组成员
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem label="姓名" {...formItemLayout}>
                    <Select
                    >
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  label="职位" {...formItemLayout}>
                    {getFieldDecorator(`subName${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入成员职位！' }],
                    } : {})(
                      <span>
                        <Input/>
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={8} style={{height:'32px',display:'flex',alignItems:'center'}}>
                  {index === subParams.length - 1 ?
                    <Button shape="circle" size="small" icon="plus"  type="primary" onClick={this.handleNewControl} /> :
                    <Button shape="circle" size="small" icon="minus" type="danger" onClick={this.handleRemoveControl.bind(this, subParam)} />}
                </Col>
              </Row>))}
          </Row>

          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              风险管理
            </Col>
          </Row>
          <Row gutter={24}>
            <EditableTable />
          </Row>
          <Row gutter={24}>&ensp;</Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              六性管理
            </Col>
          </Row>
          <Row gutter={24}>
            <EditableTableTwo />

          </Row><Row gutter={24}>&ensp;</Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              资源配置
            </Col>
          </Row>
          <Row gutter={24}>
            <div>
              <Table columns={columns} dataSource={data} pagination={ false } size="large" />
            </div>

          </Row>
          <Row gutter={24}>&ensp;</Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="产品改进意见" {...formItemLayout3}>
                {getFieldDecorator('title')(
                  <TextArea placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              相关人员
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="编制人员" {...formItemLayout}>
                {getFieldDecorator('compactor')(
                  <Input placeholder="请输入编制人员" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="编制日期" {...formItemLayout}>
                {getFieldDecorator('compactDate')(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="审核人员" {...formItemLayout}>
                {getFieldDecorator('auditor')(
                  <Input placeholder="请输入评审人员" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="审核日期" {...formItemLayout}>
                {getFieldDecorator('auditDate')(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="工艺会签" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('countersigner', {
                  rules: [{ required: true, message: '请选择!' }],
                })(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.craftList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="会签日期" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('countersigneDate', {
                  rules: [{ required: true, message: '请选择会签日期!' }],
                })(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="标准化审查人员" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('examiner', {
                  rules: [{ required: true, message: '请选择!' }],
                })(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.checkList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="标准化审查日期" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('examineDate', {
                  rules: [{ required: true, message: '请选择审查日期!' }],
                })(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="批准人员" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('approver', {
                  rules: [{ required: true, message: '请选择!' }],
                })(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.approveList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="批准日期" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('approveDate', {
                  rules: [{ required: true, message: '请选择批准日期!' }],
                })(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>


          <Row gutter={24}>
            <Col span={4}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ float: 'right', marginBottom: 24 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleSaveDesignAndDevelopPlan}>
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

export default DesignAndDevelopPlanForm=Form.create({})(DesignAndDevelopPlanForm)
