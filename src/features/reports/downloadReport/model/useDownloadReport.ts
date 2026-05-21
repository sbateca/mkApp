import {
  selectDownloadReport,
  useReportStore,
} from "../../../../entities/report";
import {
  REPORT_CONTENT_NOT_FOUND,
  REPORT_FAILED_DOWNLOAD_TEXT,
  REPORT_SUCCESSFULLY_DOWNLOAD_START_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useDownloadReport = () => {
  const downloadReport = useReportStore(selectDownloadReport);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDownloadReport = async (reportId: string) => {
    try {
      const attachedReport = await downloadReport(reportId);

      if (!attachedReport?.content) {
        throw new Error(REPORT_CONTENT_NOT_FOUND);
      }

      downloadBase64Pdf(attachedReport.content, `${reportId}.pdf`);

      showSnackBarMessage(
        REPORT_SUCCESSFULLY_DOWNLOAD_START_TEXT,
        SnackBarSeverity.SUCCESS,
      );
    } catch {
      showSnackBarMessage(REPORT_FAILED_DOWNLOAD_TEXT, SnackBarSeverity.ERROR);
    }
  };

  const downloadBase64Pdf = (base64: string, fileName: string): void => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, (char) =>
      char.charCodeAt(0),
    );

    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], {
      type: "application/pdf",
    });

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    URL.revokeObjectURL(blobUrl);
  };

  return {handleDownloadReport};
};
