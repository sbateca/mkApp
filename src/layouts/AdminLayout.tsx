import React from "react";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

import {Header} from "../widgets/Header";
import {COMPANY_NAME, MENU_ITEMS} from "../utils/constants";
import {Menu, selectMenuOpen, useMenuStore} from "../features/menu";
import {SnackBarContainer} from "../features/snackbar";
import {StyledMainContent} from "./StyledMainContent";
import {ContentStyle, mainTemplayeStyle} from "./MainTemplateStyle";

export const AdminLayout = (): React.ReactElement => {
  const menuOpen = useMenuStore(selectMenuOpen);

  return (
    <Box sx={{...mainTemplayeStyle}}>
      <Box component="header">
        <Header companyName={COMPANY_NAME} />
      </Box>

      <Menu menuItems={MENU_ITEMS} />

      <StyledMainContent open={menuOpen}>
        <Box sx={ContentStyle} data-testid="contentContainer">
          <Outlet />
        </Box>
        <SnackBarContainer />
      </StyledMainContent>
    </Box>
  );
};
