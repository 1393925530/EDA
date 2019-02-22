import request from '../utils/request';
import { stringify } from 'qs';



export async function queryRole() {
  return request('/api/system/roles');
}

//POST 方法
// export async function addRole(params) {
//   console.log(params.payload);
//   return request('/api/system/addRole', {
//     method: 'POST',
//     body: params.payload,
//   });
// }

// 测试完整性，用GET方法，实际使用时，换成POST方法即可
export async function addRole(params) {
  return request(`/api/system/addRole?${stringify(params.payload)}`);
}

//POST 方法
// export async function editRole(params) {
//   console.log(params.payload);
//   return request('/api/system/editRole', {
//     method: 'POST',
//     body: params.payload,
//   });
// }

// 测试完整性，用GET方法，实际使用时，换成POST方法即可
export async function editRole(params) {
  return request(`/api/system/editRole?${stringify(params.payload)}`);
}

export async function querUser(params) {
  return request(`/api/system/users?${stringify(params.payload)}`);
}

export async function editUser(params) {
  
  return request(`/api/system/editUser?${stringify(params.payload)}`);
}


export async function queryLog(params) {
  
  return request(`/api/system/logs?${stringify(params.payload)}`);
}

