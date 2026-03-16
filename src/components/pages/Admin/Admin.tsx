import {Box} from "@mui/material";

import {MainTemplate} from "../../templates";
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants";
import {AdminStyle} from "./AdminStyle";
import {MenuDrawer} from "../../../features/menu/ui/MenuDrawer";
import {Header} from "../../../widgets/Header";
import {Content} from "../../../widgets/Content";

export const Admin = (): React.ReactElement => {
  return (
    <Box sx={AdminStyle}>
      <MainTemplate
        header={<Header companyName={COMPANY_NAME} />}
        menu={<MenuDrawer menuItems={MENU_ITEMS} />}
        mainContent={<Content />}
      />
    </Box>
  );
};
