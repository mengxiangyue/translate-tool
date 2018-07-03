// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Config from '../components/Config';
import * as ConfigActions from '../actions/config';

function mapStateToProps(state) {
  return {
    youdaoAppId: state.config.youdaoAppId,
    youdaoKey: state.config.youdaoKey,
    baiduAppId: state.config.baiduAppId,
    baiduKey: state.config.baiduKey,
    tencentProjectId: state.config.tencentProjectId,
    tencentSecretId: state.config.tencentSecretId,
    bingSubscriptionKey: state.config.bingSubscriptionKey,
    initialValues: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConfigActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
