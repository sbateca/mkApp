import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";

type ViewSampleButtonProps = {
  onClick: () => void;
};

export const ViewSampleButton = ({
  onClick,
}: ViewSampleButtonProps): React.ReactElement => {
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
