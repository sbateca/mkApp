import {
  sampleFormToSample,
  selectEditSample,
  selectGetSamples,
  selectSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {
  FormProps,
  SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection/model/useSideSection";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useEditSample = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const selectedSample = useSampleStore(selectSelectedSample);
  const editSample = useSampleStore(selectEditSample);
  const getSamples = useSampleStore(selectGetSamples);

  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleEditSample = async (form: FormProps) => {
    const parsedSample = sampleFormToSample(form, selectedSample?.id ?? "");
    const updatedSample = await editSample(selectedSample?.id, parsedSample);
    if (updatedSample !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSamples,
      );
    }
  };

  return {
    handleEditSample,
  };
};
