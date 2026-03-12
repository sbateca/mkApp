export interface ButtonConfig {
  sx?: Record<string, unknown>;
  label: string;
  disabled?: boolean;
  variant: "text" | "outlined" | "contained";
  size: "small" | "medium" | "large";
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit"
    | "default";
  icon?: string;
  onClick?: () => void;
}
