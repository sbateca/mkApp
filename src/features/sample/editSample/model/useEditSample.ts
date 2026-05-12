import {Client} from "../../../../entities/client";
import {
  sampleFormToSample,
  selectEditSample,
  selectGetSamples,
  selectSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {SampleType} from "../../../../entities/sampleType";
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

  const handleEditSample = async (
    form: FormProps,
    clients: Client[] | null,
    sampleTypes: SampleType[] | null,
  ) => {
    const parsedSample = sampleFormToSample(
      form,
      selectedSample?.id ?? "",
      clients,
      sampleTypes,
    );
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
