// @flow
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import { actionType, TranslateProvider, SOURCETEXT_UPDATE, EXCHANGE_LANGUAGE, TRANSLATE_LANGUAGE, TRANSLATE_RESULT_UPDATE } from '../actions/home';

export type homeStateType = {
    +from: string,
    +target: string,
    +sourceText: string
};

const defaultState = {
  from: '中文',
  target: '英文',
  sourceText: '欢迎使用翻译助手！',
  googleResult: '',
  youdaoResult: '',
  baiduResult: '',
  tencentResult: '',
  bingResult: ''
};
export default function home(state: homeStateType = defaultState, action: actionType) {
  switch (action.type) {
    case SOURCETEXT_UPDATE:
      return { ...state, sourceText: action.value };
    case EXCHANGE_LANGUAGE:
      console.log(action.payload)
      const from = state.from;
      const target = state.target;
      return { ...state,
        from: target,
        target: from
      }
    case TRANSLATE_RESULT_UPDATE:
      console.log('mxy->', action);
      switch (action.provider) {
        case TranslateProvider.GOOGLE:
        return { ...state, googleResult: action.value };
        case TranslateProvider.YOUDAO:
        return { ...state, youdaoResult: action.value };
        case TranslateProvider.BAIDU:
        return { ...state, baiduResult: action.value };
        case TranslateProvider.TENCENT:
        return { ...state, tencentResult: action.value };
        case TranslateProvider.BING:
        return { ...state, bingResult: action.value };
        default:
        return state;
      }

    case TRANSLATE_LANGUAGE:
      return { ...state, sourceText: `${new Date()}` };
    default:
      return state;
  }
}

// export default function counter(state: number = 0, action: actionType) {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return state + 1;
//     case DECREMENT_COUNTER:
//       return state - 1;
//     default:
//       return state;
//   }
// }
