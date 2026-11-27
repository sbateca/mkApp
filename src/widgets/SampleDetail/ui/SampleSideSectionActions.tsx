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
import {EDIT_SAMPLE_BUTTON_LABEL} from "../../../utils/constants";
import {SampleSideSectionActionsProps} from "./Types";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

function SampleSideSectionButtons({
  isNotValidForm,
  sample,
  handleCreateSample,
  handleEdit,
}: SampleSideSectionActionsProps): React.ReactElement {
  const {can, canCreateSample} = useWorkspacePermissions();
  const canCreate = canCreateSample;
  const canUpdate = can(BaseRoutes.SAMPLES, "update");
  const {isReadOnlyMode, handleSwitchReadOnlyMode} = useReadOnlyMode();

  return (
    <Box>
      {isReadOnlyMode && sample && canUpdate ? (
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
      {!isReadOnlyMode && sample && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
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
      {!isReadOnlyMode && !sample && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateSample}
        />
      ) : null}
    </Box>
  );
}

export default SampleSideSectionButtons;
