import {Box} from "@mui/material";

import {MainTemplate} from "../../templates";
import {Header} from "../../molecules";
import {Content} from "../../organisms";
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants";
import {AdminStyle} from "./AdminStyle";
import {AdminProviders} from "../../../app/providers/adminProviders";
import {MenuDrawer} from "../../../features/menu/ui/MenuDrawer";

export const Admin = (): React.ReactElement => {
  return (
    <AdminProviders>
      <Box sx={AdminStyle}>
        <MainTemplate
          header={<Header companyName={COMPANY_NAME} />}
          menu={<MenuDrawer menuItems={MENU_ITEMS} />}
          mainContent={<Content />}
        />
      </Box>
    </AdminProviders>
  );
};
