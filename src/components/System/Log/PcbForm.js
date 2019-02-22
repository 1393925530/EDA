import React, {Component} from 'react';
import {Button, Col, DatePicker, Form, Row, Select, Input} from 'antd';
import axios from "axios";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
let uuid = 0;

class  PcbForm  extends Component {
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


  handleSubmitPcb = (e)=>{
    e.preventDefault();
    let quasiDate = this.props.form.getFieldValue("quasiDate").format("YYYY-MM-DD");
    let auditDate = this.props.form.getFieldValue("auditDate").format("YYYY-MM-DD");
    let countersigneDate = this.props.form.getFieldValue("countersigneDate").format("YYYY-MM-DD");
    let quantitysignDate = this.props.form.getFieldValue("quantitysignDate").format("YYYY-MM-DD");
    let approveDate = this.props.form.getFieldValue("approveDate").format("YYYY-MM-DD");
    this.props.form.validateFields((err,values)=>{
      if (err) {
        return;
      }
      else {
          let userInfo = {...values,quasiDate,auditDate,countersigneDate,quantitysignDate,approveDate};
          console.log(userInfo);
      }
    });


    // const { form } = this.props;
    // form.validateFields((err, fieldsValue,features) => {
    //   if (err)
    //     return;
    //   let sub = [];
    //   Object.keys(fieldsValue).map(key =>
    //     key !== 'name' && sub.push({ feature: fieldsValue[key] }));
    //   console.log(sub);
    //   let A={features:sub};
    //   console.log(A);
    //   this.setState({ loading: true });
    // });
  };
// //
//   getParamByCode=()=>{
//     axios.get("/user.json").then((res)=>{
//       console.log(res.data)
//     })
//   };

  // handleSavePcb=()=>{
  //   localStorage.setItem('pcb',JSON.stringify(this.props.form.getFieldsValue()))
  // };

  componentDidMount() {
    let pcb=JSON.parse(localStorage.getItem('pcb'));
    this.props.form.setFieldsValue(pcb);
    // const paramList=["DTMS_0033","TB_PCB_TECHNOLOGY","DTMS_0018","DTMS_1122","DTMS_1127","DTMS_1131","DTMS_1133","DTMS_1157"]
    //   axios.post('http://localhost:8080/dtms/api/parameter/getData', {
    //     code:12
    //   })
    //     .then( (res)=> {
    //       let data=res.data.data;
    //       switch(res.data.data.code)
    //       {
    //         case "DTMS_0033":
    //           this.setState({designList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "TB_PCB_TECHNOLOGY":
    //           this.setState({technologyList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_0018":
    //           this.setState({boardList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1122":
    //           this.setState({craftList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1127":
    //           this.setState({qualityList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1131":
    //           this.setState({checkList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1133":
    //           this.setState({approveList:data.parameterChilds});
    //           console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1157":
    //           this.setState({pcbList:data.parameterChilds});
    //           break;
    //         default:
    //
    //       }
    //       console.log(res);
    //     })
    //     .catch( (err)=> {
    //       console.log(err);
    //     });
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
    return (
      <div>
        <Form onSubmit={this.handleSubmitPcb} autoComplete="off">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="流水号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('streamNo', {
                  rules: [{ required: true, message: '请输入流水号!' }],
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="版本号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('revision', {
                  rules: [{ required: true, message: '请输入版本号!' }],
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="文件编号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('documentNum', {
                  rules: [{ required: true, message: '请输入编号!' }],
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              一、产品信息
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="单号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode')(
                  <Input placeholder="请输入" disabled/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="文件名" {...formItemLayout}>
                {getFieldDecorator('fileName')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="顾客单位" {...formItemLayout}>
                {getFieldDecorator('customerUnit')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="工艺" {...formItemLayout}>
                {getFieldDecorator('technology')(
                  <Select showSearch placeholder="请选择">
                    {this.state.technologyList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              二、技术指标
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="温湿度" {...formItemLayout}>
                {getFieldDecorator('humiture')(
                  <Input placeholder="请输入" addonAfter="度"/>
                )}
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="阻焊图形" {...formItemLayout}>
                {getFieldDecorator('solderingFigure')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="人员能力" {...formItemLayout}>
                {getFieldDecorator('personnelAbility')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="物料使用" {...formItemLayout}>
                {getFieldDecorator('materialUse')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="技术分析" {...formItemLayout3}>
                {getFieldDecorator('describe')(
                  <TextArea placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="设计分析" {...formItemLayout3}>
                {getFieldDecorator('title')(
                  <TextArea placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              三、确定关键特性、重要特性
            </Col>
          </Row>
          <Row gutter={24}>
            {subParams.map((subParam, index) => (
              <Row gutter={24} key={`subf_${subParam}`}>
                <Col span={8}>
                  <FormItem label="特性名称" {...formItemLayout}>
                    {getFieldDecorator('name')(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem  label="特性分类" {...formItemLayout}>
                    {getFieldDecorator(`subName${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入特性分类！' }],
                    } : {})(
                      <span>
                        <Input/>
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={7}>
                  <FormItem  label="特性值" {...formItemLayout} style={{paddingLeft:'36px'}}>
                    {getFieldDecorator(`subName${subParam}`, visible ? {
                      initialValue: subParam,
                      rules: [{ required: true, message: '请输入特性值！' }],
                    } : {})(
                      <span>
                        <Input/>
                      </span>
                    )}
                  </FormItem>
                </Col>
                <Col span={1} style={{height:'32px',display:'flex',alignItems:'center'}}>
                {index === subParams.length - 1 ?
                  <Button shape="circle" size="small" icon="plus"  type="primary" onClick={this.handleNewControl} /> :
                  <Button shape="circle" size="small" icon="minus" type="danger" onClick={this.handleRemoveControl.bind(this, subParam)} />}
              </Col>
              </Row>))}
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              四、结论
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="特性结论" {...formItemLayout3}>
                {getFieldDecorator('title')(
                  <TextArea placeholder="请输入" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{marginLeft: '0', fontWeight: 'bold', color: 'black', marginBottom: '21px'}}>
              五、相关人员
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="拟制人员" {...formItemLayout}>
                {getFieldDecorator('quasiPerson')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="拟制日期" {...formItemLayout}>
                {getFieldDecorator('quasiDate')(
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
                  <Input placeholder="请输入" />
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
              <FormItem label="工艺会签" {...formItemLayout}>
                {getFieldDecorator('countersigner')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.craftList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="工艺会签日期" {...formItemLayout}>
                {getFieldDecorator('countersigneDate')(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="质量会签" {...formItemLayout}>
                {getFieldDecorator('quantitysigner')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.qualityList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="质量会签日期" {...formItemLayout}>
                {getFieldDecorator('quantitysignDate')(
                  <DatePicker style={{width:"100%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label="批准人员" {...formItemLayout}>
                {getFieldDecorator('approver')(
                  <Select showSearch placeholder="请选择" style={{ width: '100%' }}>
                    {this.state.approveList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="批准日期" {...formItemLayout}>
                {getFieldDecorator('approveDate')(
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
                  <Button style={{ marginLeft: 8 }} onClick={this.handleSavePcb}>
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

export default PcbForm=Form.create({})(PcbForm)
