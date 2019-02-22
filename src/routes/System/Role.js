import React from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/BasicLayout';
import Role from '../../components/System/Role/Role';

function RoleManager() {
    
    const role = <Role />;
    return (
        <BasicLayout open='sub2' select='6' content={role} />
    );
}

RoleManager.propTypes = {
};

export default connect()(RoleManager);
