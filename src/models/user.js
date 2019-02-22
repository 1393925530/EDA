import { querUser, editUser} from '../services/system';

export default {
  namespace: 'user',
  state: {
    users: [],
    user:{},
  },

  effects: {
    *fetch(payload, { call, put }) {
      const response = yield call(querUser, payload);
      yield put({
        type: 'saveUsers',
        payload: response.data,
      });
    },
  
    *edit(payload, { call, put }) {
      const response = yield call(editUser, payload);
      yield put({
        type: 'saveUser',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveUsers(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
};
