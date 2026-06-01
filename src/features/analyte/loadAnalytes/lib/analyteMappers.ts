import {Analyte} from "../../../../entities/analyte";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const analyteToTableRows = (analytes: Analyte[]): TableRowProps[] => {
  return analytes.map((analyte) => ({
    id: analyte.id,
    cells: [
      {
        children: analyte.id,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: analyte.name,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: analyte.testType?.name ?? "",
        align: SharedTypographyAlign.LEFT,
      },
    ],
  }));
};
