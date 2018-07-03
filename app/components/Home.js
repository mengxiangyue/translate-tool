// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {
  from: string,
  target: string,
  sourceText: string,
  googleResult: string,
  youdaoResult: string,
  baiduResult: string,
  tencentResult: string,
  bingResult: string,
  exchangeLanguage: () => void,
  translateLanguage: () => void,
  sourceTextUpdate: (string) => void
};

export default class Home extends Component<Props> {
  props: Props;
  render() {
    const { from, target, sourceText, googleResult, youdaoResult, baiduResult, tencentResult, bingResult, exchangeLanguage, translateLanguage, sourceTextUpdate } = this.props;
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.input_container}>
            <textarea
              className={styles.input_textarea}
              placeholder="请输入要翻译的内容"
              value={sourceText}
              onChange={(event) => sourceTextUpdate(event.target.value)}
              rows={5}
            />
          </div>
          <div className={styles.control_container}>
            <div className={styles.language_control_container}>
              <span className={styles.language_label}>{from}</span>
              <button className={styles.exchange_language_button} onClick={exchangeLanguage}>交换</button>
              <span className={styles.language_label}>{target}</span>
            </div>
            <div className={styles.translate_button_container}>
              <button className={styles.translate_language_button} onClick={translateLanguage}>翻译</button>
            </div>
            <Link to="/config">
              <button className={styles.translate_language_button}>配置</button>
            </Link>
          </div>
          <div>
            <div>
              <span>谷歌: {googleResult}</span>
            </div>
            <div>
              <span>有道: {youdaoResult}</span>
            </div>
            <div>
              <span>百度: {baiduResult}</span>
            </div>
            <div>
              <span>腾讯: {tencentResult}</span>
            </div>
            <div>
              <span>Bing: {bingResult}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
