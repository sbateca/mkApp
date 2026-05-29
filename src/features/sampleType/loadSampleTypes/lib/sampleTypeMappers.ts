import {SampleType} from "../../../../entities/sampleType";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const sampleTypeToTableRows = (
  sampleTypes: SampleType[],
): TableRowProps[] => {
  return sampleTypes.map((sampleType) => {
    return {
      id: sampleType.id,
      cells: [
        {
          children: sampleType.id,
          align: SharedTypographyAlign.LEFT,
        },
        {
          children: sampleType.name,
          align: SharedTypographyAlign.LEFT,
        },
      ],
    };
  });
};
