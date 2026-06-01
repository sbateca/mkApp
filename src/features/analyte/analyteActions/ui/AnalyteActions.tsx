import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {
  selectIsLoadingAnalytes,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {DeleteAnalyteButton, useDeleteAnalyte} from "../../deleteAnalyte";
import {useViewAnalyte, ViewAnalyteButton} from "../../viewAnalyte";
import {useAnalyteActionsErrorNotifier} from "../model/useAnalyteActionsErrorNotifier";

type AnalyteTableActionButtonsProps = {
  analyteId: string;
};

export const AnalyteTableActionButtons = ({
  analyteId,
}: AnalyteTableActionButtonsProps): React.ReactElement => {
  const isLoading = useAnalyteStore(selectIsLoadingAnalytes);

  const {viewAnalyte} = useViewAnalyte();
  const {handleDelete} = useDeleteAnalyte();
  useAnalyteActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewAnalyteButton onClick={() => viewAnalyte(analyteId)} />
          <DeleteAnalyteButton onClick={() => handleDelete(analyteId)} />
        </>
      )}
    </Box>
  );
};
