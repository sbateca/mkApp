import {Box} from "@mui/material";

import {Button} from "../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {ReportSideSectionActionsProps} from "../Types";
import {EDIT_REPORTS_BUTTON_LABEL} from "../../../utils/constants";

export const ReportSideSectionButtons = ({
  isNotValidForm,
  report,
  isReadOnlyMode,
  setIsReadOnlyMode,
  handleCreateReport,
  handleEdit,
}: ReportSideSectionActionsProps): React.ReactElement => {
  const handleSwitchReadOnlyMode = () => {
    setIsReadOnlyMode(!isReadOnlyMode);
  };

  return (
    <Box>
      {isReadOnlyMode && report ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_REPORTS_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleSwitchReadOnlyMode}
        />
      ) : null}
      {!isReadOnlyMode && report ? (
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
      {!isReadOnlyMode && !report ? (
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
};
