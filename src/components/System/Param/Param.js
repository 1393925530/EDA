import React, { Component, Fragment } from 'react';
import { Card, Tabs, Icon, Button, Form, Table } from 'antd';
import AddForm from './AddForm';
import AddSubForm from './AddSubForm';
const TabPane = Tabs.TabPane;

@Form.create()
export default class ParamSetting extends Component {
    state = {
        data: [],
        addVisible: false,
        addSubVisible: false,
        currentTab: '',
    }
    componentDidMount() {
        const data = [
            {
                name: '老版本底片处理方式',
                sub: [{ name: '老版本底片保留' }, { name: '老版本底片撤销' }, { name: '设计更改' }, { name: '客户自带版本' }]
            }, {
                name: '返工原因',
                sub: []
            }, {
                name: '板框覆铜与处理',
                sub: []
            }, {
                name: '压接孔径',
                sub: []
            }, {
                name: '特殊要求处理',
                sub: []
            }, {
                name: '粘接方式',
                sub: []
            }, {
                name: '粘贴分工',
                sub: []
            }, {
                name: '外部错误发现方',
                sub: []
            }, {
                name: '质量组内部错误类别',
                sub: []
            }, {
                name: '质量组内部错误项',
                sub: []
            }, {
                name: '质量组内部错误责任角色',
                sub: []
            }, {
                name: '错误人员类型',
                sub: []
            }
        ]
        this.setState({
            data: data,
            currentTab: data[0].name
        });
    }

    // tab
    handleDelete = (name) => {
        const { data } = this.state;
        const index = data.findIndex(item => { return item.name === this.state.currentTab })+1;
        let tab = this.state.currentTab;
        if (index !== data.length) 
            tab = data[index].name;
        let newData = data.filter(item => { return item.name !== name });
        
        
        this.setState({
            data: newData,
            currentTab : tab
        });
    };

    onTabChange = (key) => {
        this.setState({
            currentTab: key
        })
        console.log(key);
    }

    // end tab

    // 新增参数
    handleAdd = () => {
        console.log('ere');
        this.setState(
            { addVisible: true }
        );
    }
    onAdd = (item) => {
        item.sub = this.uniqueArr(item.sub);
        let data = [item,...this.state.data];
        this.setState({ data: data, addVisible: false, currentTab:item.name });
    }

    onCancel = () => {
        this.setState({ addVisible: false });
    }

    // 添加子参数
    handleAddSub = () => {
        this.setState(
            { addSubVisible: true }
        );
    }

    uniqueArr = (arr) =>{
        const res = new Map();
        return arr.filter((a) => !res.has(a.name) && res.set(a.name, 1))
    }

    onSubAdd = (sub) => {
        let data = [...this.state.data];
        const index = data.findIndex(item => { return item.name === this.state.currentTab });
        if (index === -1)
            return;
        let subSet = [];
        if (data[index].sub && data[index].sub.length > 0)
            subSet = [...data[index].sub, ...sub];
        else
            subSet = sub;
        data[index].sub = this.uniqueArr(subSet);

        this.setState(
            { data: data, addSubVisible: false }
        );
    }

    onSubCancel = () => {
        this.setState(
            { addSubVisible: false }
        );
    }


    // 删除子参数
    onDeleteSubItem = (record) => {
        const { currentTab, data } = this.state;
        console.log(currentTab);
        let idx1 = data.findIndex(item => { return item.name === currentTab });
        console.log(idx1);
        let idx2 = data[idx1].sub.findIndex(sub => { return sub.name === record.name });
        data[idx1].sub.splice(idx2, 1);
        this.setState({
            data: data
        })
    }



    render() {
        const { data, addVisible, addSubVisible,  currentTab } = this.state;
        const columns = [{
            title: '参数名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.onDeleteSubItem.bind(this, record)}>删除</a>

                </span>
            ),
        }];

        return (<Fragment>
            <Card bordered={false}>
                <div style={{ marginBottom: 24 }}><Button type="primary" icon="plus" onClick={this.handleAdd}>添加</Button></div>
                <Tabs tabPosition='left' style={{ height: 800 }} activeKey={currentTab} onChange={this.onTabChange}>
                    {data.map(item => (
                        <TabPane tab={<div>{item.name}&nbsp;<Icon style={{ color: 'red' }} onClick={this.handleDelete.bind(this, item.name)} type='close' /></div>} key={item.name}>
                            <div><Button type="primary" icon="plus" onClick={this.handleAddSub}>添加</Button></div>
                            <Table style={{ marginTop: 24 }} columns={columns} dataSource={item.sub} rowKey="name" pagination={false} />
                        </TabPane>
                    ))}
                </Tabs>

            </Card>
            <AddForm key={Math.random()} visible={addVisible} onAdd={this.onAdd} onCancel={this.onCancel} />
            <AddSubForm key={Math.random()} visible={addSubVisible} onAdd={this.onSubAdd} parent={currentTab} onCancel={this.onSubCancel} />


        </Fragment>);
    }

};