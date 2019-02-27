import React, { Component, Fragment } from 'react';
import { Card, Divider, Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import axios from 'axios';
// import AddForm from './AddForm';
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
    }

    // 初始化数据
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/fetch',
        });
        axios.post('/api/test')
        .then((res) => {
            let list = res.data;
            console.log(typeof(list));
            this.setState({
                data: list
            });
            console.log(res);
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

    render() {
        console.log(this.state.data);
        const { fetchLoading, addLoading, editLoading, role } = this.props;
        const { addVisible, editVisible, setLoading, setVisible, currentRecord } = this.state;
        const { roles } = role;

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
                <Table columns={columns} loading={fetchLoading} dataSource={roles} pagination={false} keyWord={this.props.searchkeyword}/>
            </Card>

            <Modal
                visible={addVisible}
                title="添加角色"
                onOk={this.handleAddOk}
                onCancel={this.handleAddCancel}
                footer={[
                    <Button key="back" type="danger">取消</Button>,
                    <Button key="submit" type="primary" loading={addLoading}>
                        提交
            </Button>,
                ]}
            >
                {/* <AddForm ref={this.addFormRef}></AddForm> */}
            </Modal>
        </Fragment>);
    }
}

export default PendingDispatchList;