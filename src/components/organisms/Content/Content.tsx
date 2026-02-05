import {Box} from "@mui/material";

import {ContentStyle} from "./ContentStyle";
import {ReportsContent} from "../ReportsContent";
import {SnackBarContainer} from "../../molecules";
import {SamplesContent} from "../SamplesContent";
import {SharedMenuItems} from "../../../utils/enums";
import {useMenuStore} from "../../../features/menu/model/store";
import {selectSelectedMenuItem} from "../../../features/menu/model/selectors";

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
