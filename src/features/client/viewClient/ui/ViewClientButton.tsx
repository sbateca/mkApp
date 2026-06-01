import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type ViewClientButtonProps = {
  onClick: () => void;
};

export const ViewClientButton = ({
  onClick,
}: ViewClientButtonProps): React.ReactElement => {
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
