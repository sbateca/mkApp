import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type DeleteReportButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const DeleteReportButton = ({
  onClick,
  disabled,
}: DeleteReportButtonProps) => {
  return (
    <Button
      icon={IconNames.DELETE}
      label={SharedButtonCommonLabels.DELETE}
      variant={SharedButtonVariants.OUTLINED}
      size={SharedButtonSizes.SMALL}
      color={SharedButtonColors.ERROR}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
