import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Client} from "../../../../entities/client";
import {Button} from "../../../../shared/ui";
import {
  IconNames,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {EDIT_CLIENT_BUTTON_LABEL} from "../../../../utils/constants";
import {useReadOnlyMode} from "../../../readOnlyMode";

type ClientDetailButtonsProps = {
  isNotValidForm: boolean;
  client: Client | null;
  handleReadOnlyModeChange: () => void;
  handleCreateClient: () => void;
  handleEditClient: () => void;
};

export const ClientDetailButtons = ({
  isNotValidForm,
  client,
  handleReadOnlyModeChange,
  handleCreateClient,
  handleEditClient,
}: ClientDetailButtonsProps) => {
  const {can} = useWorkspacePermissions();
  const canCreate = can(BaseRoutes.CLIENTS, "create");
  const canUpdate = can(BaseRoutes.CLIENTS, "update");
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && client && canUpdate ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_CLIENT_BUTTON_LABEL}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && client && canUpdate ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.CONTAINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            onClick={handleEditClient}
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
      {!isReadOnlyMode && !client && canCreate ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.CONTAINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleCreateClient}
        />
      ) : null}
    </Box>
  );
};
