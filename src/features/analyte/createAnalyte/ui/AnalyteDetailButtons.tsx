import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Analyte} from "../../../../entities/analyte";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_ANALYTE_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type AnalyteDetailButtonsProps = {
  isNotValidForm: boolean;
  analyte: Analyte | null;
  handleReadOnlyModeChange: () => void;
  handleCreateAnalyte: () => void;
  handleEditAnalyte: () => void;
};

export const AnalyteDetailButtons = ({
  isNotValidForm,
  analyte,
  handleReadOnlyModeChange,
  handleCreateAnalyte,
  handleEditAnalyte,
}: AnalyteDetailButtonsProps) => {
  const {can} = useWorkspacePermissions();
  const canCreate = can(BaseRoutes.ANALYTES, "create");
  const canUpdate = can(BaseRoutes.ANALYTES, "update");
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && analyte && canUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_ANALYTE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && analyte && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={handleEditAnalyte}
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
      {!isReadOnlyMode && !analyte && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateAnalyte}
        />
      ) : null}
    </Box>
  );
};
