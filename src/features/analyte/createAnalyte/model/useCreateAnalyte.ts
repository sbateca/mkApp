import {
  selectCreateAnalyte,
  selectGetAnalytes,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {
  ANALYTE_SUCCESSFULLY_CREATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToAnalyte} from "../../lib/analyteMappers";
import {TestType} from "../../../../entities/testType";

export const useCreateAnalyte = (
  form: FormProps,
  testTypes: TestType[] | null,
) => {
  const createAnalyte = useAnalyteStore(selectCreateAnalyte);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateAnalyte = async () => {
    const newAnalyte = await createAnalyte(formToAnalyte(form, testTypes));
    if (newAnalyte !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        ANALYTE_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getAnalytes,
      );
    }
    return newAnalyte;
  };

  return {handleCreateAnalyte};
};
