import {Criteria} from "../../../../entities/criteria";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const criteriaToTableRows = (criterias: Criteria[]): TableRowProps[] => {
  return criterias.map((criteria) => ({
    id: criteria.id,
    cells: [
      {
        children: criteria.id,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: criteria.name,
        align: SharedTypographyAlign.LEFT,
      },
    ],
  }));
};
