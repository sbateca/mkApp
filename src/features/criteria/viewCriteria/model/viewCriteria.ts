import {
  selectGetCriteriaById,
  selectSetSelectedCriteria,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {CRITERIA_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewCriteria = () => {
  const setSelectedCriteria = useCriteriaStore(selectSetSelectedCriteria);
  const getCriteriaById = useCriteriaStore(selectGetCriteriaById);

  const {onOpenSideSection} = useSideSection();

  const viewCriteria = async (criteriaId: string) => {
    const criteria = await getCriteriaById(criteriaId);
    if (criteria) {
      setSelectedCriteria(criteria);
      onOpenSideSection(CRITERIA_DETAILS_TITLE_TEXT, true);
    }
  };

  return {viewCriteria};
};
