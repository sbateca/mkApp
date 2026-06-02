import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type DeleteTestTypeButtonProps = {
  onClick: () => void;
};

export const DeleteTestTypeButton = ({onClick}: DeleteTestTypeButtonProps) => {
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
