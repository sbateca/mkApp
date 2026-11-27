import {useWorkspacePermissions} from "../entities/auth/model/workspacePermissions";
import React, {useEffect} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";

import {Header} from "../widgets/Header";
import {COMPANY_NAME, MENU_ITEMS} from "../utils/constants";
import {
  Menu,
  selectCloseMenu,
  selectOpenMenu,
  useMenuStore,
} from "../features/menu";
import {SnackBarContainer} from "../features/snackbar";
import {StyledMainContent} from "./StyledMainContent";
import {ContentStyle, mainTemplateStyle} from "./MainTemplateStyle";

export const AdminLayout = (): React.ReactElement => {
  const {can} = useWorkspacePermissions();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const openMenu = useMenuStore(selectOpenMenu);
  const closeMenu = useMenuStore(selectCloseMenu);

  useEffect(() => {
    if (isDesktop) openMenu();
    else closeMenu();
  }, [isDesktop, openMenu, closeMenu]);

  return (
    <Box sx={mainTemplateStyle}>
      <Box component="header">
        <Header companyName={COMPANY_NAME} />
      </Box>

      <Menu menuItems={MENU_ITEMS.filter(({actionPath}) => can(actionPath))} />

      <StyledMainContent>
        <Box sx={ContentStyle} data-testid="contentContainer">
          <Outlet />
        </Box>
        <SnackBarContainer />
      </StyledMainContent>
    </Box>
  );
};
