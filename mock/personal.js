import PagingData from './paging.js';

// 业绩明细
export let scoreDataSource = [];
for (let i = 1; i < 31; i += 1) {
    let id = i < 10 ? '0' + i : '' + i;
    scoreDataSource.push({
        key: 'KCAD180800' + id,
        pin: Math.floor(Math.random() * 10000 + 1000),
        ratio: Math.floor(Math.random() * 100) + '%',
        score: Math.floor(Math.random() * 6000)
    });
}

export function getScoreDetail(req, res, u) {
    return PagingData(req, res, u, scoreDataSource);
}

// 加班统计
export const getFightCount = [{
    x: '周日',
    y: Math.floor(Math.random() * 10),
}, {
    x: '节假日',
    y: Math.floor(Math.random() * 40),
}, {
    x: '夜班',
    y: Math.floor(Math.random() * 60),
}];

// 加班明细
export const getFightDetail = [
    {
        id: '6CAD1803034',
        type: '周末加班',
        days: 0.5,
        date: '2018-04-22',
        assignedBy: 'CAD部安排',
        location: '无锡'
    },
    {
        id: '6CAD1804009',
        type: '周末加班',
        days: 1,
        date: '2018-04-15',
        assignedBy: 'CAD部安排',
        location: '无锡'
    },
    {
        id: '6CAD1801059',
        type: '夜班',
        days: 1,
        date: '2018-03-08',
        assignedBy: 'CAD部安排',
        location: '上门设计'
    },
    {
        id: '6CAD1802039',
        type: '周末加班',
        days: 1,
        date: '2018-03-05',
        assignedBy: 'CAD部安排',
        location: '上海'
    },
    {
        id: '6CAD1801011',
        type: '周末加班',
        days: 1,
        date: '2018-03-01',
        assignedBy: 'CAD部安排',
        location: '上门设计'
    },
    {
        id: '6CAD1801123',
        type: '夜班',
        days: 1,
        date: '2018-02-28',
        assignedBy: 'CAD部安排',
        location: '上海'
    },
    {
        id: '6CAD1803034',
        type: '周末加班',
        days: 0.5,
        date: '2018-04-22',
        assignedBy: 'CAD部安排',
        location: '无锡'
    },
    {
        id: '6CAD1804001',
        type: '周末加班',
        days: 1,
        date: '2018-04-15',
        assignedBy: 'CAD部安排',
        location: '无锡'
    },
    {
        id: '6CAD1801034',
        type: '周末加班',
        days: 1,
        date: '2018-03-08',
        assignedBy: 'CAD部安排',
        location: '上门设计'
    },
    {
        id: '6CAD1803022',
        type: '周末加班',
        days: 1,
        date: '2018-03-05',
        assignedBy: 'CAD部安排',
        location: '上海'
    },
    {
        id: '6CAD1801011',
        type: '周末加班',
        days: 1,
        date: '2018-03-01',
        assignedBy: 'CAD部安排',
        location: '无锡'
    },
    {
        id: '6CAD1801123',
        type: '夜班',
        days: 1,
        date: '2018-02-28',
        assignedBy: 'CAD部安排',
        location: '上门设计'
    },
];

// 个人能力模拟
const avatarSoft = [
    '/cad.jpg', // Autocad
    '/mentor.jpg', // mentor graphics
    '/cadence.png', // Cadence
    '/pads-logo.png', // mentor pads
    '/protel.png', // protel
    '/altium.jpeg', // altium
];

export const getPersonAbility = {
    software: [
        {
            id: 'soft1',
            title: 'AutoCAD',
            logo: avatarSoft[0],
            buju: 1,
            buxian: 1.2,
            acquired: true
        },
        {
            id: 'soft2',
            title: 'Mentor Xpedition',
            logo: avatarSoft[1],
            buju: 0,
            buxian: 0,
            acquired: false
        },
        {
            id: 'soft3',
            title: 'Cadence Allegro',
            logo: avatarSoft[2],
            buju: 0,
            buxian: 0,
            acquired: false
        },
        {
            id: 'soft4',
            title: 'Mentor PADS',
            logo: avatarSoft[3],
            buju: 0,
            buxian: 0,
            acquired: false
        },
        {
            id: 'soft5',
            title: 'Protel',
            logo: avatarSoft[4],
            buju: 1,
            buxian: 1.2,
            acquired: true
        },
        {
            id: 'soft6',
            title: 'Altium Designer',
            logo: avatarSoft[5],
            buju: 1,
            buxian: 1.2,
            acquired: true
        }
    ],
};

// 请假统计
export const getFightOffWork = [
    {
        id: 1,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 2,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 3,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 4,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 5,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 6,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 7,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '病假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 8,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 9,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '年假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 10,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 11,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 6,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
    {
        id: 12,
        begin: '2018-9-20 10:33:00',
        end: '2018-9-20 11:33:00',
        interval: 3,
        type: '临时假',
        logTime: '2018-9-20 12:33:00',
    },
];


export default {
    getPersonAbility,  // 个人能力
    getScoreDetail,  // 业绩明细
    getFightCount,  // 加班统计
    getFightDetail, // 加班明细
    getFightOffWork,  // 请假统计
};