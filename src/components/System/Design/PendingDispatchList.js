import React, { Component, Fragment } from 'react';
import { Card, Divider, Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import axios from 'axios';
import DispatchLeader from './DispatchLeader';
// import EditForm from './EditForm';
// import SetForm from './SetForm';

@connect(({ role, loading }) => ({
    role,
    fetchLoading: loading.effects['role/fetch'],
    // addLoading: loading.effects['role/add'],
    // editLoading: loading.effects['role/edit'],
}))
class PendingDispatchList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        addVisible: false,
        searchKeyword: {},
        currentRecord: {},
        data: [],
        pagination: {},
        loading: false,
      };
      this.submitDispatchLeader = this.submitDispatchLeader.bind(this);
    }

    // 初始化数据
    componentDidMount() {
        // const { dispatch } = this.props;
        // dispatch({
        //     type: 'role/fetch',
        // });
        axios.post('/api/test')
        .then((res) => {
            this.setState({
                data: res.data.rows
            });
        })
        .catch(() => {alert('error')})
    }

    //当列表组件属性发生变化时，调用
    componentWillReceiveProps() {
        axios.post('/api/test',
        this.props.searchkeyword
        )
        .then((res) => {
            console.log(res);
            this.setState({
                data: res.data.rows
            });
        })
        .catch(() => {alert('error')})
    }

    // 添加对话框begin
    showAddModel = () => {
        this.setState({
            addVisible: true,
        })
    }

    // addFormRef = (form) => {
    //     this.addForm = form;
    // }

    handleAddOk = () => {
        this.addForm.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue);

            this.props.dispatch({
                type: 'role/add',
                payload: fieldsValue
            }).then(() => {
                this.addForm.resetFields();
                this.setState({ addVisible: false });
            });
        });
    }

    handleAddCancel = () => {
        this.setState({ addVisible: false });
    }

    submitDispatchLeader = () => {
        
    }

    render() {
        const { fetchLoading, addLoading, editLoading, role,} = this.props;
        const { addVisible, editVisible, setLoading, setVisible, currentRecord, } = this.state;
        const columns = [{
            title: 'EDA设计单号',
            dataIndex: 'designOrder',
            key: 'name'
        }, {
            title: '文件名',
            dataIndex: 'fileName',
        }, {
            title: '客户单位简称',
            dataIndex: 'customBbr',
        }, {
            title: '客户联系人',
            dataIndex: 'customContact',
        }, {
            title: '设计联系销售',
            dataIndex: 'sale',
        }, {
            title: 'PCB设计软件',
            dataIndex: 'PCBSoftware',
        }, {
            title: '设计类型',
            dataIndex: 'designType',
        }, {
            title: '要求完成日期',
            dataIndex: 'requestFinishDate',
        }, {
            title: '评估调度',
            dataIndex: 'assess',
        }, {
            title: '当前状态',
            dataIndex: 'nowProgress',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.showAddModel.bind(this, record)}>添加</a>
                    <Divider type="vertical" />
                </span>
            ),
        }];



        return (<Fragment>
            <Card bordered={false}>
                <Table columns={columns} loading={fetchLoading} dataSource={this.state.data} pagination={false}/>
            </Card>

            <Modal width = {'750px'}
                visible={addVisible}
                title="负责人调度"
                onOk={this.handleAddOk}
                onCancel={this.handleAddCancel}
                footer={[
                    <Button key="submit" type="" loading={addLoading} onClick={this.submitDispatchLeader}>负责人调度完成</Button>,
                    <Button key="back" type="">布局调度</Button>,
                ]}
            >
                <DispatchLeader></DispatchLeader>
            </Modal>
        </Fragment>);
    }
}

export default PendingDispatchList;