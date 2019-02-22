import React from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/BasicLayout';
import Param from '../../components/System/Param/Param';

function ParamSetting() {
    const param = <Param />;
    return (
        <BasicLayout open='sub2' select='5' content={param} />
    );
}

ParamSetting.propTypes = {
};

export default connect()(ParamSetting);
