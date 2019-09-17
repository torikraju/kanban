// eslint-disable-next-line import/prefer-default-export
export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const HOST = 'http://localhost:8080';

export const generateToken = (token) => `JWT ${token}`;


export const convertDate = (date) => {
  const _date = new Date(date);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${monthNames[_date.getMonth()]} ${_date.getDate()} ${_date.getFullYear()}`;
};


export const validate = (element, formData = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'Passwords do not match' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.minLength) {
    const valid = !(element.value.trim().length < element.validation.minLength);
    const message = `${!valid ? 'Provide at least 4 character' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.maxLength) {
    const valid = !(element.value.trim().length > element.validation.maxLength);
    const message = `${!valid ? 'Maximum Allowed character is 5' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }


  return error;
};

export const update = (element, formData) => {
  const updatedFormData = { ...formData };
  const updatedElement = { ...updatedFormData[element.id] };

  updatedElement.value = element.event.target.value;

  if (element.blur) {
    [updatedElement.valid, updatedElement.validationMessage] = validate(updatedElement, formData);
  }

  updatedElement.touched = element.blur;
  updatedFormData[element.id] = updatedElement;

  return updatedFormData;
};

export const prepareFormData = (props) => {
  const data = {};
  let formIsValid = true;

  // eslint-disable-next-line no-unused-vars,no-restricted-syntax
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      data[key] = props[key].value;
      formIsValid = props[key].valid && formIsValid;
    }
  }
  return { data, formIsValid };
};

export const resetForm = (formData) => {
  const updatedFormData = { ...formData };

  // eslint-disable-next-line no-unused-vars,no-restricted-syntax
  for (const key in updatedFormData) {
    if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
      const updatedElement = { ...updatedFormData[key] };
      updatedElement.value = '';
      updatedElement.valid = false;
      updatedElement.validationMessage = '';
      updatedFormData[key] = updatedElement;
    }
  }
  return updatedFormData;
};
