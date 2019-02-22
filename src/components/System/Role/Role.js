import React, { Component, Fragment } from 'react';
import { Card, Divider, Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import AddForm from './AddForm';
import EditForm from './EditForm';
import SetForm from './SetForm';

@connect(({ role, loading }) => ({
    role,
    fetchLoading: loading.effects['role/fetch'],
    addLoading: loading.effects['role/add'],
    editLoading: loading.effects['role/edit'],
}))
export default class Role extends Component {
    state = {
        addVisible: false,
        editVisible: false,
        setVisible: false,
        setLoading: false,
        currentRecord: {},
    }

    // 初始化数据
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/fetch',
        });
    }

    // 添加对话框begin
    showAddModel = () => {
        this.setState({
            addVisible: true,
        })
    }

    addFormRef = (form) => {
        this.addForm = form;
    }

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

    // 编辑对话框begin

    showEditModel = (record) => {
        this.setState({
            editVisible: true,
            currentRecord: record,
        });
    }

    editFormRef = (form) => {
        this.editForm = form;
    }

    handleEditOk = () => {
        const form = this.editForm;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue);
            let payload = { ...fieldsValue, key: form.props.data.key, name: form.props.data.name }
            this.props.dispatch({
                type: 'role/edit',
                payload: payload
            }).then(() => {
                form.resetFields();
                this.setState({ editVisible: false });
            });
        });
    }

    handleEditCancel = () => {
        this.setState({ editVisible: false });
    }

    onSelectChange = (value) => {
        console.log(`selected ${value}`);
    }
    // 编辑对话框end

    // 权限设置对话框begin
    showSetModel = (record) => {
        this.setState({
            setVisible: true,
            currentRecord: record,
        });
    }

    setFormRef = (form) => {
        this.setForm = form;
    }

    handleSetOk = () => {
        const { currentRecord } = this.state;
        currentRecord.rights = [...this.setForm.state.rights];
        
        // 实际POST
        // let payload = currentRecord;
        // this.props.dispatch({
        //     type: 'role/edit',
        //     payload: payload
        // }).then(() => {
        //     this.setState({ setLoading: false, setVisible: false });
        // });

        // 模拟POST
        this.setState({ setLoading: true });
        setTimeout(() => {
            this.setState({ setLoading: false, setVisible: false });
        }, 1000);
    }

    handleSetCancel = () => {
        this.setState({ setVisible: false });
    }
    // 设置对话框end

    render() {
        const { fetchLoading, addLoading, editLoading, role } = this.props;
        const { addVisible, editVisible, setLoading, setVisible, currentRecord } = this.state;
        const { roles } = role;

        const columns = [{
            title: '角色名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: '状态',
            dataIndex: 'status',

        }, {
            title: '所属组',
            dataIndex: 'group',

        }, {
            title: '备注',

            dataIndex: 'note',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.showEditModel.bind(this, record)}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={this.showSetModel.bind(this, record)}>权限配置</a>
                </span>
            ),
        }];



        return (<Fragment>
            <Card bordered={false}>
                <div>
                    <Button type="primary" style={{ marginBottom: 12 }} icon="plus" onClick={this.showAddModel}>
                        添加
                     </Button>
                </div>
                <Table columns={columns} loading={fetchLoading} dataSource={roles} pagination={false} />
            </Card>

            <Modal
                visible={addVisible}
                title="添加角色"
                onOk={this.handleAddOk}
                onCancel={this.handleAddCancel}
                footer={[
                    <Button key="back" onClick={this.handleAddCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={addLoading} onClick={this.handleAddOk.bind(this)}>
                        提交
            </Button>,
                ]}
            >
                <AddForm ref={this.addFormRef}></AddForm>
            </Modal>

            <Modal
                visible={editVisible}
                title="编辑角色"
                onOk={this.handleEditOk}
                onCancel={this.handleEditCancel}
                footer={[
                    <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={editLoading} onClick={this.handleEditOk}>
                        提交
            </Button>,
                ]}
            >
                <EditForm ref={this.editFormRef} data={currentRecord}></EditForm>
            </Modal>

            <Modal
                visible={setVisible}
                style={{ top: 12 }}
                title={`角色设置-${currentRecord.name}`}
                width={620}
                onOk={this.handleSetOk}
                onCancel={this.handleSetCancel}
                footer={[
                    <Button key="back" onClick={this.handleSetCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={setLoading} onClick={this.handleSetOk}>
                        提交
            </Button>,
                ]}
            >
                <SetForm key={currentRecord.key} ref={this.setFormRef} data={currentRecord}></SetForm>
            </Modal>
        </Fragment>);
    }
}

