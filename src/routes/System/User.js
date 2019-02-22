import React from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/BasicLayout';
import User from '../../components/System/User/User';

function UserManager() {

    const user = <User />;
    return (
        <BasicLayout open='sub3' select='3' content={user} />
    );
}

UserManager.propTypes = {
};

export default connect()(UserManager);
