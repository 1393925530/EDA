import {queryLog} from '../services/system';

export default {
  namespace: 'log',
  state: {
    logs: []
  },

  effects: {
    *fetch(payload, { call, put }) {
      const response = yield call(queryLog, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        logs: action.payload,
      };
    },
  },
};
