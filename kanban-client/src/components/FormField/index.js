import React from 'react';

const FormField = ({ formData, change, id }) => {
  const showError = () => {
    let errorMessage = null;
    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="text-danger">{formData.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;
    if (formData.element === ('input')) {
      formTemplate = (
        <>
          {formData.label && <h6>{formData.label}</h6>}
          <div className="form-group">
            <input
              {...formData.config}
              value={formData.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        </>
      );
    } else if (formData.element === ('textarea')) {
      formTemplate = (
        <div className="form-group">
          <textarea
            {...formData.config}
            value={formData.value}
            onBlur={(event) => change({ event, id, blur: true })}
            onChange={(event) => change({ event, id })}
          />
          {showError()}
        </div>
      );
    } else if (formData.element === ('select')) {
      formTemplate = (
        <div className="form-group">
          <select
            className={formData.config.className}
            name={formData.config.name}
            onChange={(event) => change({ event, id })}
            value={formData.value}
          >
            {Object.keys(formData.config.options).map((key) => (
              <option
                key={key}
                value={key}
              >
                {formData.config.options[key]}
              </option>
            ))}
          </select>
          {showError()}
        </div>
      );
    } else {
      formTemplate = null;
    }

    return formTemplate;
  };
  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default FormField;
