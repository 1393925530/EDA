import { queryRole,addRole,editRole} from '../services/system';

export default {
  namespace: 'role',
  state: {
    roles: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRole);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add(payload, { call, put }) {
      const response = yield call(addRole, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *edit(payload, { call, put }) {
      const response = yield call(editRole, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        roles: action.payload,
      };
    },
  },
};
