import {Box} from "@mui/material";

import {Spinner} from "../../../../shared/ui";
import {DeleteReportButton} from "../../deleteReport/ui/DeleteReportButton";
import {ViewReportButton} from "../../viewReport/ui/ViewReportButton";

import {useReportStore} from "../../../../entities/report/model/store";
import {selectIsLoadingReport} from "../../../../entities/report/model/selector";
import {ReportActions} from "../../../../entities/report/model/Report";
import {useDeleteReport} from "../../deleteReport/model/useDeleteReport";
import {useViewReport} from "../../viewReport/model/useViewReport";
import {useReportActionsErrorNotifier} from "../model/useReportActionsErrorNotifier";

type ReportTableActionButtonsProps = {
  reportId: string;
  actions?: ReportActions;
};

export const ReportTableActionButtons = ({
  reportId,
  actions,
}: ReportTableActionButtonsProps): React.ReactElement => {
  const isLoading = useReportStore(selectIsLoadingReport);

  const {handleDelete} = useDeleteReport();
  const {handleViewReport} = useViewReport();
  useReportActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewReportButton
            disabled={actions?.read?.allowed !== true}
            onClick={() => handleViewReport(reportId)}
          />
          <DeleteReportButton
            disabled={actions?.delete?.allowed !== true}
            onClick={() => handleDelete(reportId)}
          />
        </>
      )}
    </Box>
  );
};
