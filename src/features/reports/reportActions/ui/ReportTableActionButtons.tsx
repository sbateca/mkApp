import {Box} from "@mui/material";

import {Spinner} from "../../../../shared/ui";
import {DeleteReportButton} from "../../deleteReport/ui/DeleteReportButton";
import {ViewReportButton} from "../../viewReport/ui/ViewReportButton";

import {useReportStore} from "../../../../entities/report/model/store";
import {selectIsLoadingReport} from "../../../../entities/report/model/selector";
import {ReportTableActionButtonsProps} from "../../../sample/TableActionButtons/Types";
import {useDeleteReport} from "../../deleteReport/model/useDeleteReport";
import {useViewReport} from "../../viewReport/model/useViewReport";
import {useReportActionsErrorNotifier} from "../model/useReportActionsErrorNotifier";

export const ReportTableActionButtons = ({
  reportId,
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
          <ViewReportButton onClick={() => handleViewReport(reportId)} />
          <DeleteReportButton onClick={() => handleDelete(reportId)} />
        </>
      )}
    </Box>
  );
};
