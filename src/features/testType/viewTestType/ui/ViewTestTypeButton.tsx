import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type ViewTestTypeButtonProps = {
  onClick: () => void;
};

export const ViewTestTypeButton = ({
  onClick,
}: ViewTestTypeButtonProps): React.ReactElement => {
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
