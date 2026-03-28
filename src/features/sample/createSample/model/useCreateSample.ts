import {
  sampleFormToSample,
  selectCreateSample,
  selectGetSamples,
  selectSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {
  FormProps,
  SAMPLE_SUCCESSFULLY_CREATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection/model/useSideSection";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useCreateSample = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const selectedSample = useSampleStore(selectSelectedSample);
  const createSample = useSampleStore(selectCreateSample);
  const getSamples = useSampleStore(selectGetSamples);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);

  const handleCreateSample = async (form: FormProps) => {
    const newSample = await createSample(
      sampleFormToSample(form, selectedSample?.id ?? ""),
    );
    if (newSample !== null) {
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSamples,
      );
      onCloseSideSection();
    }
  };

  return {
    handleCreateSample,
  };
};
