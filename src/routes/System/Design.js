import React from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/BasicLayout';
import OnlineDesign from '../../components/System/Design/Design';

function OnlineDesignForm() {
    
    const design = <OnlineDesign />;
    return (
        <BasicLayout open='sub2' select='7' content={design} />
    );
}

OnlineDesignForm.propTypes = {
};

export default connect()(OnlineDesignForm);
