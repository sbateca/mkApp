import {Box} from "@mui/material";

import {Spinner} from "../../../../shared/ui";
import {SampleTableActionButtonsProps} from "../../TableActionButtons/Types";
import {useSampleStore} from "../../../../entities/sample/model/store";
import {selectIsLoading} from "../../../../entities/sample/model/selectors";
import {ViewSampleButton} from "../../viewSample/ui/ViewSampleButton";
import {useViewSample} from "../../viewSample/model/useViewSample";
import {useDeleteSample} from "../../deleteSample/model/useDeleteSample";
import {DeleteSampleButton} from "../../deleteSample/ui/DeleteSampleButton";
import {useSampleActionsErrorNotifier} from "../model/useSampleActionsErrorNotifier";

export const SampleTableActionButtons = ({
  sampleId,
}: SampleTableActionButtonsProps): React.ReactElement => {
  const isLoading = useSampleStore(selectIsLoading);

  const {handleViewSample} = useViewSample();
  const {handleDelete} = useDeleteSample();
  useSampleActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewSampleButton onClick={() => handleViewSample(sampleId)} />
          <DeleteSampleButton onClick={() => handleDelete(sampleId)} />
        </>
      )}
    </Box>
  );
};
