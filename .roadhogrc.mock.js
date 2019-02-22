// import { getPersonAbility, getFightCount,getFightDetail, getScoreDetail, getFightOffWork } from './mock/personal';
import { getRoles, addRole, editRole, getUsers, editUser,getLogs } from './mock/system';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
    // 'GET /api/person/ability': getPersonAbility,
    // 'GET /api/person/scoreDetail': getScoreDetail,
    // 'GET /api/person/fightCount': getFightCount,
    // 'GET /api/person/fightDetail': getFightDetail,
    // 'GET /api/person/fightOffwork': getFightOffWork,
    'GET /api/system/roles': getRoles,
    'GET /api/system/addRole': addRole,
    'GET /api/system/editRole': editRole,
    'GET /api/system/users': getUsers,
    'GET /api/system/editUser': editUser,
    'GET /api/system/logs': getLogs,
    // POST测试用
    // 'POST /api/system/addRole': {
    //   $body: addRole,
    // },
    // 'POST /api/system/editRole': {
    //   $body: editRole,
    // },
  };

  export default (noProxy ? {} : delay(proxy, 1000));
