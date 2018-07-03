// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as HomeActions from '../actions/home';

function mapStateToProps(state) {
  return {
    from: state.home.from,
    target: state.home.target,
    sourceText: state.home.sourceText,
    googleResult: state.home.googleResult,
    youdaoResult: state.home.youdaoResult,
    baiduResult: state.home.baiduResult,
    tencentResult: state.home.tencentResult,
    bingResult: state.home.bingResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
