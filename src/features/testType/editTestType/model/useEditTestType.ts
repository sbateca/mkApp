import {
  selectEditTestType,
  selectGetTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {
  FormProps,
  TEST_TYPE_SUCCESSFULLY_UPDATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToTestType} from "../../lib/testTypeMappers";

export const useEditTestType = (form: FormProps, testTypeId: string) => {
  const editTestType = useTestTypeStore(selectEditTestType);
  const getTestTypes = useTestTypeStore(selectGetTestTypes);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditTestType = async () => {
    const testType = formToTestType(form, testTypeId);
    const updatedTestType = await editTestType(testType, testTypeId);
    if (updatedTestType !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        TEST_TYPE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getTestTypes,
      );
    }
    return updatedTestType;
  };

  return {handleEditTestType};
};
