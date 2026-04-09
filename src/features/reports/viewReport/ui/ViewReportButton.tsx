import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type ViewReportButtonProps = {
  onClick: () => void;
};

export const ViewReportButton = ({onClick}: ViewReportButtonProps) => {
  return (
    <Button
      icon={IconNames.SEARCH}
      label={SharedButtonCommonLabels.VIEW}
      variant={SharedButtonVariants.OUTLINED}
      size={SharedButtonSizes.SMALL}
      color={SharedButtonColors.PRIMARY}
      onClick={onClick}
    />
  );
};
