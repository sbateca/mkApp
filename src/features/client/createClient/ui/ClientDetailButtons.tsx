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
  const {isReadOnlyMode} = useReadOnlyMode();
  return (
    <Box>
      {isReadOnlyMode && client ? (
        <Button
          icon={IconNames.EDIT}
          label={EDIT_CLIENT_BUTTON_LABEL}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.PRIMARY}
          onClick={handleReadOnlyModeChange}
        />
      ) : null}
      {!isReadOnlyMode && client ? (
        <>
          <Button
            icon={IconNames.SAVE}
            label={SharedButtonCommonLabels.SAVE}
            disabled={isNotValidForm}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.SUCCESS}
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
      {!isReadOnlyMode && !client ? (
        <Button
          icon={IconNames.SAVE}
          label={SharedButtonCommonLabels.SAVE}
          disabled={isNotValidForm}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.SUCCESS}
          onClick={handleCreateClient}
        />
      ) : null}
    </Box>
  );
};
