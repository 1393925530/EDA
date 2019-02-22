import React, { Component, Fragment } from 'react';
import { Card, message, Button, Form, Row, Col, Input, DatePicker, Tabs, Select, Radio, Checkbox } from 'antd';
import styles from './Log.less';
import DesignAndDevelopInputForm from './DesignAndDevelopInputForm';
import PcbForm from './PcbForm';
import DesignAndDevelopPlanForm from './DesignAndDevelopPlanForm';
//
@Form.create()
export default class LogManager extends Component {
    state = {
        formValues: {}
    };

    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     dispatch({
    //         type: 'log/fetch',
    //     });
    //
    // }


    onChange = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    }

    renderForm() {
        function onChange(value) {
          console.log('changed', value);
        }
        const TabPane = Tabs.TabPane;

        return (
          <Tabs defaultActiveKey="1" >
            <TabPane tab="设计和开发输入清单" key="1" >
              <DesignAndDevelopInputForm/>
            </TabPane>
            <TabPane tab="PCB特性分析报告" key="2">
              <PcbForm/>
            </TabPane>
            <TabPane tab="设计和开发计划书" key="3">
              <DesignAndDevelopPlanForm/>
            </TabPane>
          </Tabs>
        );
    }


    render() {
        return (<Fragment>
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>{this.renderForm()}</div>
                    {/*<Table loading={loading} columns={columns} dataSource={logs.list} rowKey="id" pagination={{ pageSize: 25 }} />*/}
                </div>
            </Card>
        </Fragment>);
    }

}
