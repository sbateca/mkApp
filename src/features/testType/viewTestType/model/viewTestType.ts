import {
  selectGetTestTypeById,
  selectSetSelectedTestType,
  useTestTypeStore,
} from "../../../../entities/testType";
import {TEST_TYPE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewTestType = () => {
  const setSelectedTestType = useTestTypeStore(selectSetSelectedTestType);
  const getTestTypeById = useTestTypeStore(selectGetTestTypeById);

  const {onOpenSideSection} = useSideSection();

  const viewTestType = async (testTypeId: string) => {
    const testType = await getTestTypeById(testTypeId);
    if (testType) {
      setSelectedTestType(testType);
      onOpenSideSection(TEST_TYPE_DETAILS_TITLE_TEXT, true);
    }
  };

  return {viewTestType};
};
