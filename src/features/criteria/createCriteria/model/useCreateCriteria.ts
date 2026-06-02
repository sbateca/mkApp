import {
  selectCreateCriteria,
  selectGetCriterias,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {
  CRITERIA_SUCCESSFULLY_CREATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToCriteria} from "../../lib/criteriaMappers";

export const useCreateCriteria = (form: FormProps) => {
  const createCriteria = useCriteriaStore(selectCreateCriteria);
  const getCriterias = useCriteriaStore(selectGetCriterias);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateCriteria = async () => {
    const newCriteria = await createCriteria(formToCriteria(form));
    if (newCriteria !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        CRITERIA_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getCriterias,
      );
    }
    return newCriteria;
  };

  return {handleCreateCriteria};
};
