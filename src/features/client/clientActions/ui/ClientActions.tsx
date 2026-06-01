import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {useViewClient, ViewClientButton} from "../../viewClient";
import {
  selectIsLoadingClient,
  useClientStore,
} from "../../../../entities/client";
import {DeleteClientButton, useDeleteClient} from "../../deleteClient";
import {useClientActionsErrorNotifier} from "../model/useClientActionsErrorNotifier";

type ClientTableActionButtonsProps = {
  clientId: string;
};

export const ClientTableActionButtons = ({
  clientId,
}: ClientTableActionButtonsProps): React.ReactElement => {
  const isLoading = useClientStore(selectIsLoadingClient);

  const {viewClient} = useViewClient();
  const {handleDelete} = useDeleteClient();
  useClientActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewClientButton onClick={() => viewClient(clientId)} />
          <DeleteClientButton onClick={() => handleDelete(clientId)} />
        </>
      )}
    </Box>
  );
};
