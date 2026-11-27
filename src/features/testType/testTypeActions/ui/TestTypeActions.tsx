import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {
  selectIsLoadingTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {DeleteTestTypeButton, useDeleteTestType} from "../../deleteTestType";
import {useViewTestType, ViewTestTypeButton} from "../../viewTestType";
import {useTestTypeActionsErrorNotifier} from "../model/useTestTypeActionsErrorNotifier";

type TestTypeTableActionButtonsProps = {
  testTypeId: string;
};

export const TestTypeTableActionButtons = ({
  testTypeId,
}: TestTypeTableActionButtonsProps): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const canDelete = can(BaseRoutes.TEST_TYPES, "delete");
  const isLoading = useTestTypeStore(selectIsLoadingTestTypes);

  const {viewTestType} = useViewTestType();
  const {handleDelete} = useDeleteTestType();
  useTestTypeActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewTestTypeButton onClick={() => viewTestType(testTypeId)} />
          {canDelete && (
            <DeleteTestTypeButton onClick={() => handleDelete(testTypeId)} />
          )}
        </>
      )}
    </Box>
  );
};
