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
  disabled?: boolean;
};

export const ViewReportButton = ({
  onClick,
  disabled,
}: ViewReportButtonProps) => {
  return (
    <Button
      icon={IconNames.SEARCH}
      label={SharedButtonCommonLabels.VIEW}
      variant={SharedButtonVariants.OUTLINED}
      size={SharedButtonSizes.SMALL}
      color={SharedButtonColors.PRIMARY}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
