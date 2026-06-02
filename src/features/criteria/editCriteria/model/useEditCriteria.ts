import {
  selectEditCriteria,
  selectGetCriterias,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {
  CRITERIA_SUCCESSFULLY_UPDATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToCriteria} from "../../lib/criteriaMappers";

export const useEditCriteria = (form: FormProps, criteriaId: string) => {
  const editCriteria = useCriteriaStore(selectEditCriteria);
  const getCriterias = useCriteriaStore(selectGetCriterias);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditCriteria = async () => {
    const criteria = formToCriteria(form, criteriaId);
    const updatedCriteria = await editCriteria(criteria, criteriaId);
    if (updatedCriteria !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        CRITERIA_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getCriterias,
      );
    }
    return updatedCriteria;
  };

  return {handleEditCriteria};
};
