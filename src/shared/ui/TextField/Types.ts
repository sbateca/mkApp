export interface TexFieldProps {
  name?: string;
  label: string;
  variant: "standard" | "outlined" | "filled";
  type: "text" | "password";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  hasError: boolean;
}
