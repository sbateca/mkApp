import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type DeleteClientButtonProps = {
  onClick: () => void;
};

export const DeleteClientButton = ({onClick}: DeleteClientButtonProps) => {
  return (
    <Button
      icon={IconNames.DELETE}
      label={SharedButtonCommonLabels.DELETE}
      variant={SharedButtonVariants.OUTLINED}
      size={SharedButtonSizes.SMALL}
      color={SharedButtonColors.ERROR}
      onClick={onClick}
    />
  );
};
