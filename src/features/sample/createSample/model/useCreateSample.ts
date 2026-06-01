import {Client} from "../../../../entities/client";
import {
  sampleFormToSample,
  selectCreateSample,
  selectGetSamples,
  selectSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {SampleType} from "../../../../entities/sampleType";
import {
  FormProps,
  SAMPLE_SUCCESSFULLY_CREATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection/model/useSideSection";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useCreateSample = () => {
  const selectedSample = useSampleStore(selectSelectedSample);
  const createSample = useSampleStore(selectCreateSample);
  const getSamples = useSampleStore(selectGetSamples);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const {onCloseSideSection} = useSideSection();

  const handleCreateSample = async (
    form: FormProps,
    clients: Client[] | null,
    sampleTypes: SampleType[] | null,
  ) => {
    const newSample = await createSample(
      sampleFormToSample(form, selectedSample?.id ?? "", clients, sampleTypes),
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
