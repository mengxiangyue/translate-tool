import ElectronStore from 'electron-store';
import { actionType, SAVE_CONFIG } from '../actions/config';


const electronStore = new ElectronStore();

let defaultState = {
  youdaoAppId: '',
  youdaoKey: '',
  baiduAppId: '',
  baiduKey: '',
  tencentProjectId: '',
  tencentSecretId: '',
  bingSubscriptionKey: ''
};

const config = electronStore.get('config');
if (config) {
  defaultState = { ...defaultState, ...config };
}


export default function saveConfig(state = defaultState, action: actionType) {
  switch (action.type) {
    case SAVE_CONFIG: {
      const newConfig = { ...state, ...action.value };
      electronStore.set('config', newConfig);
      return newConfig;
    }
    default:
      return state;
  }
}

