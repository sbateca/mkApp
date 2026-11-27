import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Criteria} from "../../../../entities/criteria";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_CRITERIA_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type CriteriaDetailButtonsProps = {
  isNotValidForm: boolean;
  criteria: Criteria | null;
  handleReadOnlyModeChange: () => void;
  handleCreateCriteria: () => void;
  handleEditCriteria: () => void;
};

export const CriteriaDetailButtons = ({
  isNotValidForm,
  criteria,
  handleReadOnlyModeChange,
  handleCreateCriteria,
  handleEditCriteria,
}: CriteriaDetailButtonsProps) => {
  const {can} = useWorkspacePermissions();
  const canCreate = can(BaseRoutes.CRITERIAS, "create");
  const canUpdate = can(BaseRoutes.CRITERIAS, "update");
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && criteria && canUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_CRITERIA_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && criteria && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={handleEditCriteria}
          />
          <Button
            label={SharedButtonCommonLabels.CANCEL}
            icon={IconNames.CLOSE}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.ERROR}
            onClick={handleReadOnlyModeChange}
          />
        </>
      ) : null}
      {!isReadOnlyMode && !criteria && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateCriteria}
        />
      ) : null}
    </Box>
  );
};
