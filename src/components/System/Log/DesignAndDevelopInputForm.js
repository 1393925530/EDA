import React, {Component} from 'react';
import {Button, Cascader, Col, DatePicker, Form, Radio, Row, Select, Input, Checkbox} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const RadioGroup =Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
let uuid = 0;
const options = [{
  value: '',
  label: '',
  children: [{
    value: '',
    label: '',
  }],
}];
function onChange(value) {
  console.log(value);
}
class  DesignAndDevelopInputForm  extends Component {
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

  handleSubmitList = (e)=>{
    e.preventDefault();
    let endDate = this.props.form.getFieldValue("endDate").format("YYYY-MM-DD");
    let compactDate=this.props.form.getFieldValue("compactDate").format("YYYY-MM-DD");
    let receiptDate=this.props.form.getFieldValue("receiptDate").format("YYYY-MM-DD");
    let auditDate=this.props.form.getFieldValue("auditDate").format("YYYY-MM-DD");
    let examineDate=this.props.form.getFieldValue("examineDate").format("YYYY-MM-DD");
    let approveDate=this.props.form.getFieldValue("approveDate").format("YYYY-MM-DD");
    this.props.form.validateFields((err,values)=>{
      if (err) {
        return;
      }
      else {
        let userInfo = {...values,endDate,compactDate,receiptDate,auditDate,examineDate,approveDate};
        console.log(userInfo)
      }
    })
  };

  getParamByCode=()=>{
    axios.get("/user.json").then((res)=>{
      console.log(res.data)
    })
  };

  handleSaveDesignAndDevelopInput=()=>{
    let userInfo=this.props.form.getFieldsValue();
    let endDate = this.props.form.getFieldValue("endDate").format("YYYY-MM-DD");
    let compactDate=this.props.form.getFieldValue("compactDate").format("YYYY-MM-DD");
    let receiptDate=this.props.form.getFieldValue("receiptDate").format("YYYY-MM-DD");
    let auditDate=this.props.form.getFieldValue("auditDate").format("YYYY-MM-DD");
    let examineDate=this.props.form.getFieldValue("examineDate").format("YYYY-MM-DD");
    let approveDate=this.props.form.getFieldValue("approveDate").format("YYYY-MM-DD");
    let info={...userInfo,endDate,compactDate,receiptDate,auditDate,examineDate,approveDate}
    localStorage.setItem('input',JSON.stringify(info))
  };

  componentDidMount() {
    let input=JSON.parse(localStorage.getItem('input'))
    // TEST
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
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_0018":
    //           this.setState({boardList:data.parameterChilds});
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1122":
    //           this.setState({craftList:data.parameterChilds});
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1127":
    //           this.setState({qualityList:data.parameterChilds});
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1131":
    //           this.setState({checkList:data.parameterChilds});
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1133":
    //           this.setState({approveList:data.parameterChilds});
    //         console.log(data.parameterChilds);
    //           break;
    //         case "DTMS_1157":
    //           this.setState({pcbList:data.parameterChilds});
    //         console.log(data.parameterChilds);
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
            <Col span={11}>
              <FormItem label="单号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('designCode', {
                  rules: [{ required: true, message: '请输入单号!' }],
                })(
                  <Input style={{width:"80%"}} placeholder="请输入单号" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="流水号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('streamNo', {
                  rules: [{ required: true, message: '请输入流水号!' }],

                })(
                  <Input style={{width:"80%"}} placeholder="请输入流水号"  />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="版本号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('revision', {
                  rules: [{ required: true, message: '请输入版本号!' }],
                })(
                  <Input style={{width:"80%"}} placeholder="请输入版本号" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="文件编号" style={{fontWeight:'bolder'}} {...formItemLayout}>
                {getFieldDecorator('documentNum', {
                  rules: [{ required: true, message: '请输入编号!' }],
                })(
                  <Input style={{width:"80%"}} placeholder="请输入编号" />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="顾客单位" {...formItemLayout}>
                {getFieldDecorator('customerUnit')(
                  <Input style={{width:"80%"}} placeholder="请输入顾客单位"/>
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="顾客联系人" {...formItemLayout}>
                {getFieldDecorator('contactCode')(
                  <Input style={{width:"80%"}} placeholder="请输入顾客联系人"/>
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="接单形式" {...formItemLayout}>
                {getFieldDecorator('receiptForm')(
                  <Input style={{width:"80%"}} placeholder="请输入接单形式" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="接单日期" {...formItemLayout}>
                {getFieldDecorator('receiptDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="要求交期" {...formItemLayout}>
                {getFieldDecorator('endDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="存放路径" {...formItemLayout}>
                {getFieldDecorator('saveDataPath')(
                  <Input style={{width:"80%"}} placeholder="请输入存放路径" />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="满足条件" {...formItemLayout2}>
                {getFieldDecorator('conditions')(
                  <CheckboxGroup>
                    <Checkbox value={1}>有设计要求，满足要求，见《设计要求》</Checkbox>
                    <Checkbox value={2}>存在顾客潜在的要求，需遵循TB/GF-CA-03 《印刷电路板通用设计规范》</Checkbox>
                    <Checkbox value={3}>存在接单评审信息，见《顾客要求评审图》</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="明示的法律法规" {...formItemLayout2}>
                {getFieldDecorator('legalRequire')(
                  <CheckboxGroup>
                    <Checkbox value={4}>《印制电路板设计要求》</Checkbox>
                    <Checkbox value={5}>《印制板的设计和使用》</Checkbox>
                    <Checkbox value={6}>《电子元器件表面安装要求》</Checkbox>
                    <Checkbox value={7}>《航天用多层印制电路板通用规范》</Checkbox>
                    <Checkbox value={8}>《军用电子设备印制电路板设计要求》</Checkbox>
                    <Checkbox value={9}>《航天用刚性单双面印制电路板规范》</Checkbox>
                    <Checkbox value={10}>《电子设备机箱（柜）附件的通用技术要求》</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="以前设计要求" {...formItemLayout2}>
                {getFieldDecorator('designRequire')(
                  <RadioGroup>
                    <Radio value={11}>改板，有以前的设计要求</Radio>
                    <Radio value={12}>新板，无以前的设计信息</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计类型" {...formItemLayout2}>
                {getFieldDecorator('designType')(
                  <RadioGroup>
                    <Radio value={13}>改版</Radio>
                    <Radio value={14}>新板</Radio>
                    <Radio value={15}>抄板</Radio>
                    <Radio value={16}>复制底片</Radio>
                    <Radio value={17}>设计更改</Radio>
                    <Radio value={18}>其他</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="PCB设计软件" {...formItemLayout}>
                {getFieldDecorator('pcbSoftware')(
                  <Cascader options={options} onChange={onChange} placeholder="请选择PCB软件类型" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="网络关系" {...formItemLayout2}>
                {getFieldDecorator('netRelation')(
                  <CheckboxGroup>
                    <Checkbox value={19}>原理图</Checkbox>
                    <Checkbox value={20}>网络表</Checkbox>
                    <Checkbox value={21}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="封装库" {...formItemLayout2}>
                {getFieldDecorator('wrapper')(
                  <CheckboxGroup>
                    <Checkbox value={22}>封装</Checkbox>
                    <Checkbox value={23}>封装资料</Checkbox>
                    <Checkbox value={24}>实物</Checkbox>
                    <Checkbox value={25}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="机械尺寸图" {...formItemLayout2}>
                {getFieldDecorator('mechDimensionDraw')(
                  <CheckboxGroup>
                    <Checkbox value={26}>PCB</Checkbox>
                    <Checkbox value={27}>纸质</Checkbox>
                    <Checkbox value={28}>AutoCAD</Checkbox>
                    <Checkbox value={29}>PDF</Checkbox>
                    <Checkbox value={30}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计资料" {...formItemLayout2}>
                {getFieldDecorator('designData')(
                  <CheckboxGroup>
                    <span>电脑/软件及版本</span>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设备资料" {...formItemLayout2}>
                {getFieldDecorator('equipData')(
                  <CheckboxGroup>
                    <Checkbox value={31}>封装库资料</Checkbox>
                    <Checkbox value={32}>电话/打印机/传真机/游标卡尺/扫描仪</Checkbox>
                    <Checkbox value={33}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="适用工艺规范" {...formItemLayout2}>
                {getFieldDecorator('applicableProcess')(
                  <CheckboxGroup>
                    <Checkbox>《无锡江南计算机技术研究所工艺能力汇总表》</Checkbox>
                    <Checkbox value={34}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="要求及资料" {...formItemLayout2}>
                {getFieldDecorator('requireData')(
                  <CheckboxGroup>
                    <Checkbox value={35}>工艺结构图</Checkbox>
                    <Checkbox value={36}>大体布局图</Checkbox>
                    <Checkbox value={37}>信号导向图</Checkbox>
                    <Checkbox value={38}>参考版PCB数据</Checkbox>
                    <Checkbox value={39}>参考电路设计的datasheet（芯片手册）</Checkbox>
                    <Checkbox value={40}>各单位印制板设计规范</Checkbox>
                    <Checkbox value={41}>其他</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计和开发的策划内容" {...formItemLayout2}>
                {getFieldDecorator('planningContent')(
                  <CheckboxGroup>
                    <Checkbox value={42}>已对产品的设计和开发进行策划和控制，是完整的、适宜的，见《设计和开发计划书》</Checkbox>
                    <Checkbox value={43}>已对一站式产品进行策划和控制，是完整的、适宜的，见《一站式服务产品策划书》</Checkbox>
                    <Checkbox value={44}>已对产品的设计和开发识别了关键过程并予以确认，见《关键过程明细表》</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计输入评审" {...formItemLayout2}>
                {getFieldDecorator('designReview')(
                  <CheckboxGroup>
                    <Checkbox value={45}>充分</Checkbox>
                    <Checkbox value={46}>适宜</Checkbox>
                    <Checkbox value={47}>完整</Checkbox>
                    <Checkbox value={48}>清楚且不自相矛盾</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="特殊订单设计要求" {...formItemLayout}>
                {getFieldDecorator('specialOrderRequire')(
                  <div>
                    <span>无</span>
                  </div>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计输入评审结论" {...formItemLayout2}>
                {getFieldDecorator('designReviewConclusion')(
                  <CheckboxGroup>
                    <Checkbox value={49}>此单的设计和开发策划是完整的、适宜的、且满足设计和开发的输入要求，已具备功能和
                      性能要求、法律法规要求、类似以前设计信息、其他必须要求和工艺要求，是适宜的、有效的，输入评审已通过，
                      可以启动设计。
                    </Checkbox>
                    <Checkbox value={50}>设计和开发输入不完整，缺少功能和性能要求，输入评审未通过，不可启动设计。</Checkbox>
                    <Checkbox value={51}>设计和开发输入不完整，缺少法律法规要求，输入评审未通过，不可启动设计。</Checkbox>
                    <Checkbox value={52}>设计和开发输入不完整，缺少类似以前设计信息，输入评审未通过，不可启动设计。</Checkbox>
                    <Checkbox value={53}>设计和开发输入不完整，缺少其他必要要求，输入评审未通过，不可启动设计。</Checkbox>
                    <Checkbox value={54}>设计和开发输入不完整，缺少工艺要求，输入评审未通过，不可启动设计。</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="设计输入评审建议改进" {...formItemLayout2}>
                {getFieldDecorator('designReviewAdvise')(
                  <CheckboxGroup>
                    <Checkbox value={55}>客户资料不齐，建议联系客户，要求客户补充资料。</Checkbox>
                    <Checkbox value={56}>客户资料有疑问，建议联系客户，确定清楚。</Checkbox>
                  </CheckboxGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="编制人员" {...formItemLayout}>
                {getFieldDecorator('compactor')(
                  <Input style={{width:"80%"}} placeholder="请输入编制人员" />
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="编制日期" {...formItemLayout}>
                {getFieldDecorator('compactDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="评审人员" {...formItemLayout}>
                {getFieldDecorator('auditor')(
                  <Select placeholder="请选择" style={{ width: '80%' }}>
                    <Option value=""></Option>
                    <Option value=""></Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="评审日期" {...formItemLayout}>
                {getFieldDecorator('auditDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="标准化审查人员" {...formItemLayout}>
                {getFieldDecorator('examiner')(
                  <Select showSearch placeholder="请选择" style={{ width: '80%' }}>
                    {this.state.checkList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="标准化审查日期" {...formItemLayout}>
                {getFieldDecorator('examineDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={11}>
              <FormItem label="批准人员" {...formItemLayout}>
                {getFieldDecorator('approver')(
                  <Select showSearch placeholder="请选择" style={{ width: '80%' }}>
                    {this.state.approveList.map((value,index)=>{
                      return (<Option value={value.parameterName} key={index}>{value.parameterName}</Option>)
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={11}>
              <FormItem label="批准日期" {...formItemLayout}>
                {getFieldDecorator('approveDate')(
                  <DatePicker style={{width:"80%"}} />
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
          </Row>


          <Row gutter={24}>
            <Col span={5}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ float: 'right', marginBottom: 24 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleSaveDesignAndDevelopInput}>
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

export default DesignAndDevelopInputForm=Form.create({})(DesignAndDevelopInputForm)
