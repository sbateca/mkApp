import {SyntheticEvent} from "react";

export interface AutoCompleteOption {
  id: string;
  optionLabel: string;
}

export interface AutoCompleteProps {
  value: string;
  options: AutoCompleteOption[];
  label: string;
  variant: "standard" | "outlined" | "filled";
  onChange: (
    event: SyntheticEvent,
    value: AutoCompleteOption | null,
    name: string,
  ) => void;
  name: string;
  readOnly: boolean;
  required: boolean;
  error: boolean;
  helperText: string;
}
