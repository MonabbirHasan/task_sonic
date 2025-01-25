import { FormControl, TextField } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";

const InputFeild = ({
  onChange,
  value,
  placeholder,
  type,
  className,
  fullWidth,
  label,
  as,
  rows,
  error,
}) => {
  return (
    <div>
      <FormControl fullWidth={fullWidth} sx={{ marginTop: 5 }}>
        <Form.Label>{label}</Form.Label>
        <TextField
          onChange={onChange}
          value={value}
          className={className}
          type={type}
          placeholder={placeholder}
          // as={as}
          // rows={rows}
          variant="filled"
          size="small"
        />
        {/* <Form.Control
        
        /> */}
        <span className="text-danger text-capitalize">{error}</span>
      </FormControl>
    </div>
  );
};

export default InputFeild;
