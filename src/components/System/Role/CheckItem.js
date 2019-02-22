import React, { Component, Fragment } from 'react';
import { Checkbox,Row,Col } from 'antd';

const CheckboxGroup = Checkbox.Group;



export default class CheckItem extends React.Component {
    state = {
        indeterminate: true,
        checkAll: false,
        value: [],
    };

    componentDidMount() {
        this.update(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps);
    }

    update = (props) => {
        const { options, value } = props;
        const indeterminate = !!value.length && (value.length < options.length);
        const checkAll = value.length === options.length;
        this.setState({
            indeterminate: indeterminate,
            checkAll: checkAll
        });
    }


    render() {
        
        const {title1, title2, idx1, idx2} = this.props.extra;
        return (
            <div style={{marginTop: '16px'}}>
                <div >
                    <Checkbox key={`cb_${idx1}_${idx2}`}
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        <span style={{fontWeight:'bold'}}>{this.props.extra.title2}</span>
                    </Checkbox>
                </div>
                {/*<CheckboxGroup style={{ marginBottom: '12px' }} key={`gp_${idx1}_${idx2}`} options={this.props.options} value={this.props.value} onChange={this.onChange} />*/}
                <CheckboxGroup style={{ width:'100%' }} key={`gp_${idx1}_${idx2}`} value={this.props.value} onChange={this.onChange}>
                    <Row gutter={24}>
                        {this.props.options.map(option => (
                            <Col style={{lineHeight:1.8}} span={8}><Checkbox value={option}>{option}</Checkbox></Col>
                        ))}
                    </Row>
                </CheckboxGroup>
            </div>
        );
    }

    onChange = (checkedList) => {
        this.props.onChange(this.props.extra, checkedList);
    }

    onCheckAllChange = (e) => {
        const checkedList = e.target.checked ? this.props.options : [];
        this.props.onChange(this.props.extra, checkedList);
    }
}
