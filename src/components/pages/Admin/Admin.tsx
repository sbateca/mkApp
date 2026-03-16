import {Box} from "@mui/material";

import {MainTemplate} from "../../templates";
import {COMPANY_NAME, MENU_ITEMS} from "../../../utils/constants";
import {AdminStyle} from "./AdminStyle";
import {Menu} from "../../../features/menu/ui/Menu";
import {Header} from "../../../widgets/Header";
import {Content} from "../../../widgets/Content";

export const Admin = (): React.ReactElement => {
  return (
    <Box sx={AdminStyle}>
      <MainTemplate
        header={<Header companyName={COMPANY_NAME} />}
        menu={<Menu menuItems={MENU_ITEMS} />}
        mainContent={<Content />}
      />
    </Box>
  );
};
