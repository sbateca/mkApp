import {TextField as MuiTextField} from "@mui/material";

import {TexFieldProps} from "./Types";

export const TextField = ({
  name,
  label,
  variant,
  type,
  value,
  onChange,
  onBlur,
  isRequired,
  hasError,
}: TexFieldProps): React.ReactElement => {
  return (
    <MuiTextField
      name={name}
      label={label}
      variant={variant}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      required={isRequired}
    />
  );
};
