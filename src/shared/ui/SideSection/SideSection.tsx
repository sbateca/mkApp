import {Drawer} from "@mui/material";

import {DetailProps} from "./Types";

export const SideSection = ({isOpen, children}: DetailProps) => {
  return (
    <Drawer open={isOpen} anchor="right">
      {children}
    </Drawer>
  );
};
