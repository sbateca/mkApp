import {
  selectEditAnalyte,
  selectGetAnalytes,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {
  ANALYTE_SUCCESSFULLY_UPDATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToAnalyte} from "../../lib/analyteMappers";
import {TestType} from "../../../../entities/testType";

export const useEditAnalyte = (
  form: FormProps,
  testTypes: TestType[] | null,
  analyteId: string,
) => {
  const editAnalyte = useAnalyteStore(selectEditAnalyte);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditAnalyte = async () => {
    const analyte = formToAnalyte(form, testTypes, analyteId);
    const updatedAnalyte = await editAnalyte(analyte, analyteId);
    if (updatedAnalyte !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        ANALYTE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getAnalytes,
      );
    }
    return updatedAnalyte;
  };

  return {handleEditAnalyte};
};
