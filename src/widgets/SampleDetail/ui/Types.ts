import {Sample} from "../../../entities/sample/model/Sample";

export interface SampleDetailProps {
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SampleSideSectionActionsProps {
  isNotValidForm: boolean;
  sample: Sample | null;
  handleCreateSample: () => void;
  handleEdit: () => void;
}
