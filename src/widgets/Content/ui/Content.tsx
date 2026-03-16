import {Box} from "@mui/material";

import {ContentStyle} from "./ContentStyle";
import {SharedMenuItems} from "../../../utils/enums";
import {useMenuStore} from "../../../features/menu/model/store";
import {selectSelectedMenuItem} from "../../../features/menu/model/selectors";
import {SamplesContent, ReportsContent} from "../../../components/organisms";
import {SnackBarContainer} from "../../../components/molecules";

export const Content = (): React.ReactElement => {
  const selectedMenuItem = useMenuStore(selectSelectedMenuItem);

  let contentComponent;
  switch (selectedMenuItem) {
    case SharedMenuItems.SAMPLES:
      contentComponent = <SamplesContent />;
      break;
    case SharedMenuItems.REPORTS:
      contentComponent = <ReportsContent />;
      break;
    default:
      contentComponent = <SamplesContent />;
  }
  return (
    <Box>
      <Box sx={ContentStyle} data-testid="contentContainer">
        {contentComponent}
      </Box>
      <SnackBarContainer />
    </Box>
  );
};
