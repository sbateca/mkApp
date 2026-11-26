import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {AppBrand} from "../../../shared/ui/AppBrand/AppBrand";
import {Box, IconButton} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type StyledHeaderMenuProps = {
  onClick: () => void;
  open: boolean;
};

const StyledHeaderMenu = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  minHeight: 80,
  justifyContent: "space-between",
}));

export const HeaderMenu = ({
  onClick,
  open,
}: StyledHeaderMenuProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const theme = useTheme();

  return (
    <StyledHeaderMenu>
      {open && (
        <Box sx={{pl: 0.5, minWidth: 0, whiteSpace: "normal"}}>
          <AppBrand />
        </Box>
      )}
      <IconButton
        onClick={onClick}
        size="small"
        aria-label={t("Collapse menu")}
        sx={{flexShrink: 0, visibility: open ? "visible" : "hidden"}}
      >
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </StyledHeaderMenu>
  );
};
