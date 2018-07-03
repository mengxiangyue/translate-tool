// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Config.css';
import ConfigForm from './ConfigForm';

type Props = {
  saveConfig: (value) => void
};

export default class Counter extends Component<Props> {
  props: Props;
  submit = (values) => {
    // print the form values to the console
    console.log('mxyxxxxxxx---->', values);
  }

  render() {
    const {
      youdaoAppId, youdaoKey, baiduAppId, baiduKey, tencentProjectId, tencentSecretId, bingSubscriptionKey,
      saveConfig
    } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <h2>配置相关翻译Key</h2>
        <ConfigForm onSubmit={(value) => saveConfig(value)} />
      </div>
    );
  }
}
