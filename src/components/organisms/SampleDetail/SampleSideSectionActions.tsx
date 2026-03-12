import {Box} from "@mui/material";

import {Button} from "../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {EDIT_SAMPLE_BUTTON_LABEL} from "../../../utils/constants";
import {SampleSideSectionActionsProps} from "./Types";

function SampleSideSectionButtons({
  isNotValidForm,
  sample,
  isReadOnlyMode,
  setIsReadOnlyMode,
  handleCreateReport,
  handleEdit,
}: SampleSideSectionActionsProps): React.ReactElement {
  const handleSwitchReadOnlyMode = () => {
    setIsReadOnlyMode(!isReadOnlyMode);
  };

  return (
    <Box>
      {isReadOnlyMode && sample ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_SAMPLE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleSwitchReadOnlyMode}
        />
      ) : null}
      {!isReadOnlyMode && sample ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
            onClick={handleEdit}
          />
          <Button
            label={SharedButtonCommonLabels.CANCEL}
            icon={IconNames.CLOSE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleSwitchReadOnlyMode}
          />
        </>
      ) : null}
      {!isReadOnlyMode && !sample ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateReport}
        />
      ) : null}
    </Box>
  );
}

export default SampleSideSectionButtons;
