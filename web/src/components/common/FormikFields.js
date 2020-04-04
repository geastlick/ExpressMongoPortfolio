import React, { Fragment } from 'react';
import { useField } from 'formik';
import { Label, Input, Col } from 'reactstrap';

/*
                    <Label for="line1" sm={1}>Line 1</Label>
                    <Col sm={11}>
                        <Input id="line1" type="text" readOnly={mode === "read"} value={customer.address.line1} />
                    </Col>
*/
export const TextInput = ({ label, inputwidth, labelwidth, nolabel, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  if(nolabel) {
    return (
      <Fragment>
        <Input type="text" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </Fragment>
   );
  }
  return (
    <Fragment>
      <Label htmlFor={props.id || props.name} sm={labelwidth}>{label}</Label>
      <Col sm={inputwidth}>
        <Input type="text" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </Col>
    </Fragment>
  );
};

export const Checkbox = ({ children, inputwidth, labelwidth, nolabel, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  if(nolabel) {
    return (
      <Fragment>
          <Input type="checkbox" {...field} {...props} disabled={props.readOnly} />
          {children}
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Label className="checkbox" sm={props.labelwidth}>
        <Col sm={props.inputwidth}>
          <Input type="checkbox" {...field} {...props} disabled={props.readOnly} />
          {children}
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </Col>
      </Label>
    </Fragment>
  );
};

export const Select = ({ label, inputwidth, labelwidth, nolabel, ...props }) => {
  const [field, meta] = useField(props);
  if(nolabel) {
    return (
      <Fragment>
        <Input type="select" {...field} {...props} disabled={props.readOnly} />
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Label htmlFor={props.id || props.name} sm={props.labelwidth}>{label}</Label>
      <Col sm={props.inputwidth}>
      <Input type="select" {...field} {...props} disabled={props.readOnly} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </Col>
    </Fragment>
  );
};
