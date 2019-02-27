import { parse } from 'url';

// 角色、权限相关
let roleDataSource = [
    { key: '1', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '2', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '3', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '4', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '5', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '6', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '7', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '8', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '9', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '10', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '11', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '12', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '13', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '14', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
    { key: '15', designOrder: 'KCAD190225001', fileName: 'wjm001', customBbr: '14所三部', customContact: '侯天赐', sale: '王海超', PCBSoftware: 'CAD', designType: '新设计', requestFinishDate: '2019-02-25', assess: '王海超', nowProgress: '90%', area: '西安'},
];

export function getRoles(req, res, u, b) {
    if (res && res.json) {
        res.json(roleDataSource);
    } else {
        return roleDataSource;
    }
}

export function deleteRole(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const body = (b && b.body) || req.body;
    const { key } = body;
    roleDataSource = roleDataSource.filter(item => key.indexOf(item.key) === -1);
    if (res && res.json) {
        res.json(roleDataSource);
    } else {
        return roleDataSource;
    }
}

export function addRole(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    console.log(params);

    const { name, status, group, note } = params;

    const i = new Date().getTime();//Math.ceil(Math.random() * 10000);
    roleDataSource.unshift({
        key: i + '',
        name: name,
        status: status,
        group: group,
        note: note,
        rights: []
    });


    if (res && res.json) {
        res.json(roleDataSource);
    } else {
        return roleDataSource;
    }
}

export function editRole(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    //const body = (b && b.body) || req.body;
    //const { key, name, status, group, note } = body;

    const params = parse(url, true).query;
    console.log(params);
    let { key, name, status, group, note } = params;

    const index = roleDataSource.findIndex(dat => { return dat.key === key });

    if (name) {
        roleDataSource[index].name = name;
    }
    if (status) {
        roleDataSource[index].status = status;
    }
    if (group) {
        roleDataSource[index].group = group;
    }
    if (note) {
        roleDataSource[index].note = note;
    }
    
    if (res && res.json) {
        res.json(roleDataSource);
    } else {
        return roleDataSource;
    }
}

// 用户相关
let userDataSource = [
    { user: 'gao_yan0154', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'gao_yan0153', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'he_yun0153', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ping_fang0211', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'he_tong', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'uzi_jzh', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ming_ssm', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'lol_leng', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'zhang_zansf', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'wu_wenzhu', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ping_yeling', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ling_qiliang', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'zou_yunxian', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'lala_ddd', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'feng_jizhong', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'shuang_shuang', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'wei_jueye', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'feng_xifan', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'lu_wenzxu', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ku_ye', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'fang_yi', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'dianx_xx', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'nihao_dd', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'luo_wush', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'papa_da', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'tie_gem', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'namei_ddd', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
    { user: 'ping_last', name: '高艳', dept: '系统设计部', group: '调度组', position: '调度员', roles: ['调度员'], area: '无锡', createTime: '2018-02-25 09:00:00', lastLoginTime: '2018-02-26 10:00:00', status: true },
];

export function getUsers(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = [...userDataSource];

    if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend') {
                return next[s[0]] - prev[s[0]];
            }
            return prev[s[0]] - next[s[0]];
        });
    }

    console.log(params);

    if (params.status) {
        dataSource = dataSource.filter(data => data.status === eval(params.status));
    }

    if (params.user) {
        dataSource = dataSource.filter(data => data.user.indexOf(params.user) > -1);
    }

    if (params.dept) {
        dataSource = dataSource.filter(data => data.dept === params.dept);
    }

    if (params.role) {
        dataSource = dataSource.filter(data => data.role.findIndex(roleItem => (roleItem === role)) > -1);
    }
    if (params.area) {
        dataSource = dataSource.filter(data => data.area === params.area);
    }


    let pageSize = 25;
    if (params.pageSize) {
        pageSize = params.pageSize * 1;
    }

    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        },
    };

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}


export function editUser(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    //const body = (b && b.body) || req.body;
    //const { key, name, status, group, note } = body;

    const params = parse(url, true).query;
    console.log(params);
    if (params.user === undefined)
        return;

    const index = userDataSource.findIndex(user => { return user.user === params.user });

    if (params.status) {
        userDataSource[index].status = eval(params.status);
    }
    if (params.roles) {
        userDataSource[index].roles = params.roles.split(',');
    }

    if (params.area) {
        userDataSource[index].area = params.area;
    }

    if (res && res.json) {
        res.json(roleDataSource[index]);
    } else {
        return roleDataSource[index];
    }
}

const logDataSource = [
    { id: '1', operator: '高艳', orderNo: 'KCAD18080001', event: '开始布局', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '2', operator: '高艳', orderNo: 'KCAD18080032', event: '布局完成', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '3', operator: '高艳', orderNo: 'KCAD18080011', event: '添加设计日志', target: '设计日志', opTime: '2018-02-25 09:00:00' },
    { id: '4', operator: '高艳', orderNo: 'KCAD18080032', event: '添加建库要求', target: '建库要求', opTime: '2018-02-25 09:00:00' },
    { id: '5', operator: '高艳', orderNo: 'KCAD18080032', event: '添加设计要求', target: '设计要求', opTime: '2018-02-25 09:00:00' },
    { id: '6', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: '阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '7', operator: '高艳', orderNo: 'KCAD12080032', event: '编辑EDA设计投产单', target: 'EDA设计投产单', opTime: '2018-02-25 09:00:00' },
    { id: '8', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计要求', opTime: '2018-02-25 09:00:00' },
    { id: '9', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: 'EDA设计投产单', opTime: '2018-02-25 09:00:00' },
    { id: '10', operator: '高艳', orderNo: 'KCAD12080032', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '11', operator: '高艳', orderNo: 'KCAD18080032', event: '添加设计要求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '12', operator: '高艳', orderNo: 'KCAD18080032', event: '添加设计日志', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '13', operator: '高艳', orderNo: 'KCAD18080032', event: '编辑EDA设计投产单', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '14', operator: '高艳', orderNo: 'KCAD18080032', event: '添加设计要求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '15', operator: '高艳', orderNo: 'KCAD18080032', event: '添加设计日志', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '16', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '17', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '18', operator: '高艳', orderNo: 'KCAD18080011', event: '编辑EDA设计投产单', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '19', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '20', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '21', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '22', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '23', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '24', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '设计号', opTime: '2018-02-25 09:00:00' },
    { id: '25', operator: '高艳', orderNo: 'KCAD18080032', event: '添加阻抗需求', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '26', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '27', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '28', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '29', operator: '高艳', orderNo: 'KCAD18080011', event: '添加阻抗需求', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
    { id: '30', operator: '高艳', orderNo: 'KCAD18080011', event: '编辑EDA设计投产单', target: '添加阻抗需求', opTime: '2018-02-25 09:00:00' },
];

export function getLogs(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = [...logDataSource];

    if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend') {
                return next[s[0]] - prev[s[0]];
            }
            return prev[s[0]] - next[s[0]];
        });
    }

    console.log(params);

    if (params.operator) {
        dataSource = dataSource.filter(data => data.operator.indexOf(params.operator) > -1);
    }

    if (params.orderNo) {
        dataSource = dataSource.filter(data => data.orderNo.indexOf(params.orderNo) > -1);
    }

    if (params.event) {
        dataSource = dataSource.filter(data => data.event.indexOf(params.event) > -1);
    }

    if (params.target) {
        dataSource = dataSource.filter(data => data.target.indexOf(params.target) > -1);
    }

    if (params.beginTime) {
        dataSource = dataSource.filter(data => new Date(data.opTime) >= new Date(params.beginTime) );
    }

    if (params.endTime) {
        dataSource = dataSource.filter(data => new Date(data.opTime) <= new Date(params.endTime) );
    }

    let pageSize = 25;
    if (params.pageSize) {
        pageSize = params.pageSize * 1;
    }

    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        },
    };

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}



export default {
    getRoles,  // 角色列表
    addRole, // 添加角色
    editRole, // 编辑角色
    getUsers, // 用户列表   
    editUser, // 编辑用户
    getLogs, // 日志信息
};
