import React, { Component, Fragment } from 'react';
import { Card, message, Button, Form, Row, Col, Input, DatePicker, Tabs, Select, Radio, Checkbox } from 'antd';
// import styles from './Log.less';
// import DesignAndDevelopInputForm from './DesignAndDevelopInputForm';
import PendingDispatch from './PendingDispatch';
// import DesignAndDevelopPlanForm from './DesignAndDevelopPlanForm';
//
@Form.create()
export default class OnlineDesign extends Component {
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


    // onChange = (e) => {
    //   console.log('radio checked', e.target.value);
    //   this.setState({
    //     value: e.target.value,
    //   });
    // }

    renderDesignForm() {
        // function onChange(value) {
        //   console.log('changed', value);
        // }
        const TabPane = Tabs.TabPane;

        return (
          <Tabs defaultActiveKey="1" >
            <TabPane tab="待评估" key="1" >
              {/* <DesignAndDevelopInputForm/> */}
            </TabPane>
            <TabPane tab="待调度" key="2">
             <PendingDispatch/>
            </TabPane>
            <TabPane tab="已调度" key="3">
              23333
            </TabPane>
          </Tabs>
        );
    }


    render() {
        return (<Fragment>
            <Card bordered={false}>
                <div>
                    <div>{this.renderDesignForm()}</div>
                    {/*<Table loading={loading} columns={columns} dataSource={logs.list} rowKey="id" pagination={{ pageSize: 25 }} />*/}
                </div>
            </Card>
        </Fragment>);
    }

}
