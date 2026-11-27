import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {AnalysisMethod} from "../../../../entities/analysisMethod";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_ANALYSIS_METHOD_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type AnalysisMethodDetailButtonsProps = {
  isNotValidForm: boolean;
  analysisMethod: AnalysisMethod | null;
  handleReadOnlyModeChange: () => void;
  handleCreateAnalysisMethod: () => void;
  handleEditAnalysisMethod: () => void;
};

export const AnalysisMethodDetailButtons = ({
  isNotValidForm,
  analysisMethod,
  handleReadOnlyModeChange,
  handleCreateAnalysisMethod,
  handleEditAnalysisMethod,
}: AnalysisMethodDetailButtonsProps) => {
  const {can} = useWorkspacePermissions();
  const canCreate = can(BaseRoutes.ANALYSIS_METHODS, "create");
  const canUpdate = can(BaseRoutes.ANALYSIS_METHODS, "update");
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && analysisMethod && canUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_ANALYSIS_METHOD_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && analysisMethod && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={handleEditAnalysisMethod}
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
      {!isReadOnlyMode && !analysisMethod && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateAnalysisMethod}
        />
      ) : null}
    </Box>
  );
};
