import {AnalysisMethod} from "../../../../entities/analysisMethod";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const analysisMethodToTableRows = (
  analysisMethods: AnalysisMethod[],
): TableRowProps[] => {
  return analysisMethods.map((analysisMethod) => ({
    id: analysisMethod.id,
    cells: [
      {
        children: analysisMethod.id,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: analysisMethod.name,
        align: SharedTypographyAlign.LEFT,
      },
    ],
  }));
};
