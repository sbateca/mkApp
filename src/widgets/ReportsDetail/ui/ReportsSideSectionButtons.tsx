import {Box} from "@mui/material";

import {Button} from "../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {ReportSideSectionActionsProps} from "./Types";
import {EDIT_REPORTS_BUTTON_LABEL} from "../../../utils/constants";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

export const ReportSideSectionButtons = ({
  isNotValidForm,
  report,
  handleCreateReport,
  handleEdit,
  handleApprove,
  handleDownload,
}: ReportSideSectionActionsProps): React.ReactElement => {
  const {isReadOnlyMode, handleSwitchReadOnlyMode} = useReadOnlyMode();

  const canUpdate = report?.actions?.update?.allowed === true;

  return (
    <Box>
      {isReadOnlyMode && report ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_REPORTS_BUTTON_LABEL}
          disabled={!canUpdate}
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
            disabled={isNotValidForm || !canUpdate}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
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
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateReport}
        />
      ) : null}
      {report && isReadOnlyMode ? (
        <Button
          icon={IconNames.APPROVED}
          label={SharedButtonCommonLabels.APPROVE}
          disabled={report.actions?.approve?.allowed !== true}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={() => handleApprove(report.id)}
        />
      ) : null}
      {report && isReadOnlyMode ? (
        <Button
          icon={IconNames.DOWNLOAD}
          label={SharedButtonCommonLabels.DOWNLOAD}
          disabled={report.actions?.download?.allowed !== true}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={() => handleDownload(report.id)}
        />
      ) : null}
    </Box>
  );
};
