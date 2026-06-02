import {
  selectCreateTestType,
  selectGetTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {
  FormProps,
  TEST_TYPE_SUCCESSFULLY_CREATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToTestType} from "../../lib/testTypeMappers";

export const useCreateTestType = (form: FormProps) => {
  const createTestType = useTestTypeStore(selectCreateTestType);
  const getTestTypes = useTestTypeStore(selectGetTestTypes);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateTestType = async () => {
    const newTestType = await createTestType(formToTestType(form));
    if (newTestType !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        TEST_TYPE_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getTestTypes,
      );
    }
    return newTestType;
  };

  return {handleCreateTestType};
};
