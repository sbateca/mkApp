import {Drawer} from "@mui/material";

import {DetailProps} from "./Types";

export const SideSection = ({isOpen, children}: DetailProps) => {
  return (
    <Drawer
      open={isOpen}
      anchor="right"
      sx={{
        zIndex: (theme) => theme.zIndex.modal,
      }}
    >
      {children}
    </Drawer>
  );
};
