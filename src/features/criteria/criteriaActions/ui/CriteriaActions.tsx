import {useWorkspacePermissions} from "../../../../entities/auth/model/workspacePermissions";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {
  selectIsLoadingCriterias,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {DeleteCriteriaButton, useDeleteCriteria} from "../../deleteCriteria";
import {useViewCriteria, ViewCriteriaButton} from "../../viewCriteria";
import {useCriteriaActionsErrorNotifier} from "../model/useCriteriaActionsErrorNotifier";

type CriteriaTableActionButtonsProps = {
  criteriaId: string;
};

export const CriteriaTableActionButtons = ({
  criteriaId,
}: CriteriaTableActionButtonsProps): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const canDelete = can(BaseRoutes.CRITERIAS, "delete");
  const isLoading = useCriteriaStore(selectIsLoadingCriterias);

  const {viewCriteria} = useViewCriteria();
  const {handleDelete} = useDeleteCriteria();
  useCriteriaActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewCriteriaButton onClick={() => viewCriteria(criteriaId)} />
          {canDelete && (
            <DeleteCriteriaButton onClick={() => handleDelete(criteriaId)} />
          )}
        </>
      )}
    </Box>
  );
};
