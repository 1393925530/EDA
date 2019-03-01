import React, { Component } from 'react';
import { Input, Form, Radio, Select, Col, Row, Button, Card, Table} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

class DispatchLeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeList: ['无锡', '西安', '上海', '北京'],
            searchKeyword: {},
            data: [],
            loading: false,
            selectedRowKeys: [], // Check here to configure the default column
        };
        this.DispatchLeaderSearch = this.DispatchLeaderSearch.bind(this);
    }

    start = () => {
      this.setState({ loading: true });
      // ajax request after empty completing
      setTimeout(() => {
        this.setState({
          selectedRowKeys: [],
          loading: false,
        });
      }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    }


    // 初始化数据
    componentDidMount() {
      axios.post('/api/projectManager')
      .then((res) => {
          this.setState({
              data: res.data.rows
          });
      })
      .catch(() => {alert('error')})
  }

  //当列表组件属性发生变化时，调用
  // componentWillReceiveProps() {
  //     axios.post('/api/projectManager',
  //     this.props.searchkeyword
  //     )
  //     .then((res) => {
  //         console.log(res);
  //         this.setState({
  //             data: res.data.rows
  //         });
  //     })
  //     .catch(() => {alert('error')})
  // }

    // checkRole = (rule, value, callback) => {
    //     if (value != '角色组') {
    //       callback();
    //       return;
    //     }
    //     callback('请选择角色!');
    //   }

    DispatchLeaderSearch(e) {
      e.preventDefault();
      let keyword = this.props.form.getFieldsValue();
      axios.post('/api/projectManager',
      keyword
      )
      .then((res) => {
          console.log(res);
          this.setState({
              data: res.data.rows
          });
      })
      .catch(() => {alert('error')})
    }

    handlePendingDispatchReset = (e) => {
        this.props.form.setFields({"area":""})
        this.props.form.setFields({"department":""})
        this.props.form.setFields({"serviceMode":""})
        this.props.form.setFields({"company":""})
        this.setState({
          searchKeyword: {}
        })
    }

    render() {
      const { form } = this.props;
      const { getFieldDecorator } = form;
      const { loading, selectedRowKeys } = this.state;
      const rowRadioSelection={
        type:'radio',
        columnTitle:"选择",
        onSelect: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows)
        },
      }
      const hasSelected = selectedRowKeys.length > 0;
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

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'id'
        }, {
            title: '级别',
            dataIndex: 'level',
        }, {
            title: '软件能力系数',
            dataIndex: 'software',
        }, {
            title: '部门',
            dataIndex: 'department',
        }, {
            title: '压力值',
            dataIndex: 'load',
        }, {
            title: '负责项目数量',
            dataIndex: 'project',
        }, ];
        return (
            <div>
            <Form onSubmit={this.DispatchLeaderSearch} autoComplete="off">
                <Row gutter={24}>
                 <Col span={10}>
                  <FormItem label="服务地区" {...formItemLayout}>
                    {getFieldDecorator('area')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                      {this.state.placeList.map((value,index)=>{
                      return (<Option value={value} key={index}>{value}</Option>)
                    })}
                    </Select>
                    )}
                  </FormItem>
                 </Col>
                 <Col span={10}>
                  <FormItem label="设计部门" {...formItemLayout}>
                    {getFieldDecorator('department')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                      {this.state.placeList.map((value,index)=>{
                      return (<Option value={value} key={index}>{value}</Option>)
                    })}
                    </Select>
                    )}
                  </FormItem>
                 </Col>
                 <Col span={4}>
                 <div style={{ marginTop: '5px' }}>
                  <Button type="danger" style={{ }} onClick={this.handlePendingDispatchReset}>
                    重置
                  </Button>
                 </div>
                 </Col>
                </Row>
                <Row gutter={24}>
                 <Col span={10}>
                  <FormItem label="服务模式" {...formItemLayout}>
                    {getFieldDecorator('serviceMode')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                      {this.state.placeList.map((value,index)=>{
                      return (<Option value={value} key={index}>{value}</Option>)
                    })}
                    </Select>
                    )}
                  </FormItem>
                 </Col>
                 <Col span={10}>
                  <FormItem label="外协单位" {...formItemLayout}>
                    {getFieldDecorator('company')(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                      {this.state.placeList.map((value,index)=>{
                      return (<Option value={value} key={index}>{value}</Option>)
                    })}
                    </Select>
                    )}
                  </FormItem>
                 </Col>
                 <Col span={4}>
                  <div style={{ marginTop: '5px' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                 </div>
                 </Col>
                </Row>
            </Form>
            <hr />
            <span>项目负责人推荐表 (推荐建议：4级)</span>
            <hr />
            <Card bordered={false}>
                <Table rowSelection={rowRadioSelection} columns={columns} dataSource={this.state.data} pagination={false}/>
            </Card>
            </div>
        )
    };
}

export default DispatchLeader = Form.create()(DispatchLeader);
