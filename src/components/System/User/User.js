import React, { Component, Fragment } from 'react';
import { Card, Tabs, Button, Form, Row, Col, Input, DatePicker,Radio,InputNumber,Select ,Cascader ,message} from 'antd';
import styles from './User.less';
import OrderFrom from './OrderForm';
import PlanForm from './PlanForm';
import TeamForm from './TeamForm';
@Form.create()
export default class LogManager extends Component {
  state = {
    formValues: {}
  }


//
  // 查询Form
  // handleSearch = e => {
  //   e.preventDefault();
  //   const { form,dispatch } = this.props;
  //
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;
  //
  //     const values = {
  //       ...fieldsValue,
  //     };
  //     if (values.beginTime)
  //       values.beginTime = moment(values.beginTime).format('YYYY-MM-DD')+ ' 00:00:00';
  //     if (values.endTime)
  //       values.endTime = moment(values.endTime).format('YYYY-MM-DD')+ ' 23:59:59';
  //     this.setState({
  //       formValues: values,
  //     });
  //
  //     dispatch({
  //       type: 'log/fetch',
  //       payload: values
  //     });
  //   });
  // };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'log/fetch',
    });
  };

  state = {
    value: 1,
  }


  renderForm() {
    function onChange(value) {
      console.log('changed', value);
    }

    const TabPane = Tabs.TabPane;


    return (
      <Tabs defaultActiveKey="1" >
        <TabPane tab="下单信息" key="1" >
          <OrderFrom/>
        </TabPane>
        <TabPane tab="项目计划" key="2">
          <PlanForm/>
        </TabPane>
        <TabPane tab="团队信息" key="3">
          <TeamForm/>
        </TabPane>
      </Tabs>
    );
  }


  render() {
    return (<Fragment>
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>

        </div>

      </Card>
    </Fragment>);
  }

}
