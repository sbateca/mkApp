import {useState} from "react";

import {Box} from "@mui/material";

import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {
  REPORTS_TITLE_CONFIG,
  REPORTS_TABLE_HEADER_LABELS,
  REPORT_CREATE_BUTTON_LABEL,
} from "../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {ReportDetail} from "../../ReportsDetail";
import {ReportsContentStyles} from "./ReportsContentStyles";
import {useOpenSideSection} from "../model/useOpenSideSection";
import {useSamplesContentErrorNotifier} from "../model/useReportsContentErrorNotifier";
import {useLoadRepostsContentData} from "../model/useLoadReportsContentData";

export const ReportsContent = (): React.ReactElement => {
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);

  const {rows, isLoading} = useLoadRepostsContentData();
  const {isSideSectionOpen, handleOpenSideSection} = useOpenSideSection();
  const {error} = useSamplesContentErrorNotifier();

  const openSideSection = () => {
    setIsReadOnlyMode(false);
    handleOpenSideSection();
  };

  if (error) return <Typography text={error} variant="h6" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={ReportsContentStyles.titleContentContainer}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={ReportsContentStyles.titleContentActions}>
          <Button
            label={REPORT_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table headerLabels={REPORTS_TABLE_HEADER_LABELS} rows={rows} />
      <SideSection isOpen={isSideSectionOpen}>
        <ReportDetail
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      </SideSection>
    </Box>
  );
};
