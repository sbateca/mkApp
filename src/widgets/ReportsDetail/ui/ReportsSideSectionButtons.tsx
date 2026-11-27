import {useWorkspacePermissions} from "../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
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

export const ReportSideSectionButtons = (
  props: ReportSideSectionActionsProps,
): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const {setIsReadOnlyMode} = useReadOnlyMode();
  const {mode, report} = props;

  const canRequestUpdate = can(BaseRoutes.REPORTS, "update");
  const canUpdate =
    canRequestUpdate && report?.actions?.update?.allowed === true;

  return (
    <Box>
      {mode === "read" && canRequestUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_REPORTS_BUTTON_LABEL}
          disabled={!canUpdate}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={() => setIsReadOnlyMode(false)}
        />
      ) : null}
      {mode === "edit" && report ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={props.isNotValidForm || !canUpdate}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={props.handleEdit}
          />
          <Button
            label={SharedButtonCommonLabels.CANCEL}
            icon={IconNames.CLOSE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={() => setIsReadOnlyMode(true)}
          />
        </>
      ) : null}
      {mode === "edit" && !report ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={props.isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={props.handleCreateReport}
        />
      ) : null}
      {mode === "read" && can(BaseRoutes.REPORTS, "approve") ? (
        <Button
          icon={IconNames.APPROVED}
          label={SharedButtonCommonLabels.APPROVE}
          disabled={report.actions?.approve?.allowed !== true}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={() => props.handleApprove(report.id)}
        />
      ) : null}
      {mode === "read" && can(BaseRoutes.REPORTS, "download") ? (
        <Button
          icon={IconNames.DOWNLOAD}
          label={SharedButtonCommonLabels.DOWNLOAD}
          disabled={report.actions?.download?.allowed !== true}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={() => props.handleDownload(report.id)}
        />
      ) : null}
    </Box>
  );
};
