import {
  selectEditSampleType,
  selectGetSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {
  FormProps,
  SAMPLE_TYPE_SUCCESSFULLY_UPDATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToSampleType} from "../../lib/sampleTypeMappers";

export const useEditSampleType = (
  form: FormProps,
  sampleTypeId: string,
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const editSampleType = useSampleTypeStore(selectEditSampleType);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);

  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditSampleType = () => {
    const sampleType = formToSampleType(form, sampleTypeId);
    const updatedSampleType = editSampleType(sampleType, sampleTypeId);
    if (updatedSampleType !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        SAMPLE_TYPE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSampleTypes,
      );
    }
    return updatedSampleType;
  };

  return {handleEditSampleType};
};
