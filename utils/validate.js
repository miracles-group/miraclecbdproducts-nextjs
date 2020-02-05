// import a  from 'react-validation/build/';
import validator from "validator";

const required = value => {
  if (validator.isEmpty(value) || value === '') {
    return <span>This field is required</span>;
  }
};

const email = value => {
  // validator.i
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

export { required, email };
