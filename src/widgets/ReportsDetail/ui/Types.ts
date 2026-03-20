import {Report} from "../../../model";

export interface SampleDetailProps {
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ReportDetailProps {
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CommonTextFieldProps {
  variant: "standard" | "outlined" | "filled";
  fullWidth: boolean;
  InputProps: {
    readOnly: boolean;
  };
}

export interface StackRowDirectionSpacingPropsProps {
  gap: string;
  direction: "row" | "column";
  spacing: number;
}

export interface StackContainerProps {
  spacing: number;
  marginTop: string;
  padding: string;
  height: string;
}

export interface StackFieldProps {
  width: string;
}

export interface BoxContainerProps {
  display: string;
  flexDirection: string;
  padding: string;
  width: string;
  height: string;
}

export interface ReportSideSectionActionsProps {
  isNotValidForm: boolean;
  report: Report | null;
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateReport: () => void;
  handleEdit: () => void;
}
