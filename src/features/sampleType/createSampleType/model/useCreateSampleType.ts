import {
  selectCreateSampleType,
  selectGetSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {
  FormProps,
  SAMPLE_TYPE_SUCCESSFULLY_CREATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToSampleType} from "../../lib/sampleTypeMappers";

export const useCreateSampleType = (form: FormProps) => {
  const createSampleType = useSampleTypeStore(selectCreateSampleType);
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateSampleType = async () => {
    const newSampleType = await createSampleType(formToSampleType(form));
    if (newSampleType !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        SAMPLE_TYPE_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getSampleTypes,
      );
    }
    return newSampleType;
  };

  return {handleCreateSampleType};
};
