import React from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/BasicLayout';
import Log from '../../components/System/Log/Log';

function LogManager() {
    
    const log = <Log />;
    return (
        <BasicLayout open='sub2' select='4' content={log} />
    );
}

LogManager.propTypes = {
};

export default connect()(LogManager);
