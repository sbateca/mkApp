import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {useViewSampleType, ViewSampleTypeButton} from "../../viewSampleType";
import {
  selectIsLoadingSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {useSampleTypeActionsErrorNotifier} from "../model/useSampleTypeErrorNotifier";
import {
  DeleteSampleTypeButton,
  useDeleteSampleType,
} from "../../deleteSampleType";

type SampleTypeTableActionButtonsProps = {
  sampleTypeId: string;
};

export const SampleTypeTableActionButtons = ({
  sampleTypeId,
}: SampleTypeTableActionButtonsProps): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const canDelete = can(BaseRoutes.SAMPLE_TYPES, "delete");
  const isLoading = useSampleTypeStore(selectIsLoadingSampleTypes);

  const {viewSampleType} = useViewSampleType();
  const {handleDelete} = useDeleteSampleType();
  useSampleTypeActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewSampleTypeButton onClick={() => viewSampleType(sampleTypeId)} />
          {canDelete && (
            <DeleteSampleTypeButton
              onClick={() => handleDelete(sampleTypeId)}
            />
          )}
        </>
      )}
    </Box>
  );
};
