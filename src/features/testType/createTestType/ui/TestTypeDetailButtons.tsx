import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {TestType} from "../../../../entities/testType";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_TEST_TYPE_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type TestTypeDetailButtonsProps = {
  isNotValidForm: boolean;
  testType: TestType | null;
  handleReadOnlyModeChange: () => void;
  handleCreateTestType: () => void;
  handleEditTestType: () => void;
};

export const TestTypeDetailButtons = ({
  isNotValidForm,
  testType,
  handleReadOnlyModeChange,
  handleCreateTestType,
  handleEditTestType,
}: TestTypeDetailButtonsProps) => {
  const {can} = useWorkspacePermissions();
  const canCreate = can(BaseRoutes.TEST_TYPES, "create");
  const canUpdate = can(BaseRoutes.TEST_TYPES, "update");
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && testType && canUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_TEST_TYPE_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && testType && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={handleEditTestType}
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
      {!isReadOnlyMode && !testType && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateTestType}
        />
      ) : null}
    </Box>
  );
};
