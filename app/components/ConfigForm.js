import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let ConfigForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>youdaoAppId</label>
        <div>
          <Field
            name="youdaoAppId"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>youdaoKey</label>
        <div>
          <Field
            name="youdaoKey"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>baiduKey</label>
        <div>
          <Field
            name="baiduKey"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>tencentProjectId</label>
        <div>
          <Field
            name="tencentProjectId"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>tencentSecretId</label>
        <div>
          <Field
            name="tencentSecretId"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <label>bingSubscriptionKey</label>
        <div>
          <Field
            name="bingSubscriptionKey"
            component="input"
            type="text"
            placeholder=""
          />
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button> */}
      </div>
    </form>
  );
};

ConfigForm = reduxForm({
  form: 'config'
})(ConfigForm);

ConfigForm = connect(
  state => ({
    initialValues: state.config
  })
)(ConfigForm);

export default ConfigForm;
