import {TestType} from "../../../../entities/testType";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const testTypeToTableRows = (testTypes: TestType[]): TableRowProps[] => {
  return testTypes.map((testType) => ({
    id: testType.id,
    cells: [
      {
        children: testType.id,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: testType.name,
        align: SharedTypographyAlign.LEFT,
      },
    ],
  }));
};
