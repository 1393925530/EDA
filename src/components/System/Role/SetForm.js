import React, { Component, Fragment } from 'react';
import { Input, Divider, Table, Button, Icon, Modal, Form, Radio, Select, Collapse, Tabs, Checkbox, Row, Col } from 'antd';
import CheckItem from './CheckItem.js';
const { TabPane } = Tabs;

// 权限模板
const rights = [{
    title: '订单管理',
    rights: [{
        title: '下单管理',
        rights: ['新建', '编辑', '查看', '终止', '导入', '作废']
    }, {
        title: '我的报价',
        rights: ['新建', '编辑', '查看', '导入', '导出', '作废']
    }, {
        title: '我的投产',
        rights: ['新建投产通知单', '编辑', '查看']
    }]
}, {
    title: '我的任务',
    rights: [{
        title: '我的设计',
        rights: ['状态操作', '打开路径', '日常/阶段校对', '编辑设计日志', '查看设计日志', '编辑设计要求',
            '查看设计要求', '编辑建库要求', '查看建库要求', '编辑阻抗需求', '查看阻抗需求', '投产通知',
            '编辑设计投产单', '查看设计投产单']
    }, {
        title: '我的重点关注',
        rights: ['状态操作', '打开路径', '日常/阶段校对', '编辑设计日志', '查看设计日志', '编辑设计要求',
            '查看设计要求', '编辑建库要求', '查看建库要求', '编辑阻抗需求', '查看阻抗需求', '投产通知',
            '编辑设计投产单', '查看设计投产单']
    }, {
        title: '小组任务管理',
        rights: ['状态操作', '打开路径', '日常/阶段校对', '编辑设计日志', '查看设计日志', '编辑设计要求',
            '查看设计要求', '编辑建库要求', '查看建库要求', '编辑阻抗需求', '查看阻抗需求', '投产通知',
            '编辑设计投产单', '查看设计投产单']
    }, {
        title: '部门任务管理',
        rights: ['状态操作', '打开路径', '日常/阶段校对', '编辑设计日志', '查看设计日志', '编辑设计要求',
            '查看设计要求', '编辑建库要求', '查看建库要求', '编辑阻抗需求', '查看阻抗需求', '投产通知',
            '编辑设计投产单', '查看设计投产单']
    }]
}, {
    title: '归档设计管理',
    rights: [{
        title: '已归档设计',
        rights: ['查看文件', '业绩分配', '在线更改']
    }]
}, {
    title: '质量管理',
    rights: [{
        title: '我的质检',
        rights: ['新建', '编辑', '查看', '终止', '导入', '作废']
    }, {
        title: '阻抗管理',
        rights: ['新建', '编辑', '查看', '导入', '导出', '作废']
    }, {
        title: '错误记录',
        rights: ['新建投产通知单', '编辑', '查看']
    }, {
        title: '质量记录',
        rights: ['新建', '编辑', '查看', '导入', '导出', '作废']
    }]
}, {
    title: '个人中心',
    rights: [{
        title: '个人能力中心',
        rights: ['查看', '导入']
    }, {
        title: '我的奋斗',
        rights: ['查看']
    }]
}, {
    title: '系统管理',
    rights: [{
        title: '用户管理',
        rights: ['查看', '编辑', '禁用/启用']
    }, {
        title: '日志管理',
        rights: ['查看']
    }, {
        title: '参数配置',
        rights: ['查看', '编辑']
    }, {
        title: '角色管理',
        rights: ['查看', '编辑', '角色配置']
    }]
}]


export default class SetFrom extends Component {

    state = {
        rights: [],
    };

    componentWillReceiveProps(nextProps) {
        this.setState({rights:[...nextProps.data.rights]});
    }

    componentDidMount() {
        this.setState({rights:[...this.props.data.rights]});
    }

    getRightIdx = (data, title) => {
        if (data === undefined)
            return -1;
        return data.findIndex(right => { return right.title === title });
    }

    getCheckedData = (title1, title2) => {
        const rightsTobeSet = this.state.rights;

        const dataIdx1 = this.getRightIdx(rightsTobeSet, title1);
        if (dataIdx1 == -1)
            return [];

        const dataIdx2 = this.getRightIdx(rightsTobeSet[dataIdx1].rights, title2);
        if (dataIdx2 == -1)
            return [];

        return rightsTobeSet[dataIdx1].rights[dataIdx2].rights;
    }

    // 比较长度
    getCheckedCount = (title1, title2, idx1, idx2) => {
        const rightSetted = this.getCheckedData(title1, title2);
        const rightsAll = rights[idx1].rights[idx2].rights;
        if (rightSetted.length == 0)
            return 0;
        if (rightSetted.length < rightsAll.length)
            return 1;
        if (rightSetted.length == rightsAll.length)
            return 2;
    }

    onCheckAllChange = (title1, title2, idx1, idx2) => {

        const rightsTobeSet = this.state.rights;

        if (this.getCheckedCount(title1, title2, idx1, idx2) <= 2) {
            //全选 
            const index1 = this.getRightIdx(rightsTobeSet, title1);
            if (index1 == -1) {
                let rightItem = { title: title1, rights: [] };
                rightItem.rights.push({ title: title2, rights: rights[idx1].rights[idx2].rights });
                rightsTobeSet.push(rightItem);
                this.setState({ rights: rightsTobeSet });
                this.updateCheckStatus();
                return;
            }
        }

    }

    onCheckChange = (params, checkList) => {
        const rightsTobeSet = this.state.rights;
    
        // 首先检查rightsTobeSet中是否存在该数据
        const index1 = this.getRightIdx(rightsTobeSet, params.title1);
        // 不存在，直接添加 
        if (index1 === -1) {
            if (checkList.length > 0) {
                let item = { title: params.title1, rights: [] };
                item.rights.push({ title: params.title2, rights: checkList });
                rightsTobeSet.push(item);
            }
        } else {
            // 存在，查看子级是否存在
            const index2 = this.getRightIdx(rightsTobeSet[index1].rights, params.title2);
            const rights2 = { title: params.title2, rights: checkList };
            if (index2 == -1) {
                rightsTobeSet[index1].rights.push(rights2);
            } else {
                rightsTobeSet[index1].rights[index2] = rights2;
            }
        }
        this.setState({ rights: rightsTobeSet });
    }


    render() {
        const { data } = this.props;
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

        const { form } = this.props;
        const { checkInter, checkAll } = this.state;
        return (
            <Form>
                <Tabs tabBarGutter={0}>
                    {
                        rights.map((right1, idx1) => (
                            <TabPane tab={right1.title} key={`tab_${idx1}`}>
                                <div style={{marginTop:'-16px'}}>
                                {
                                    right1.rights.map((right2, idx2) => (
                                        <CheckItem key={`ci_${idx1}_${idx2}`} extra={{ title1: right1.title, title2: right2.title, idx1: idx1, idx2: idx2 }}
                                            options={right2.rights} value={this.getCheckedData(right1.title, right2.title)}
                                            onChange={this.onCheckChange} />
                                    ))
                                }
                                </div>
                            </TabPane>
                        ))
                    }
                </Tabs>
            </Form>
        )
    };
}

