import {
  Search,
  Close,
  Edit,
  Add,
  Save,
  Delete,
  Check,
  People,
  Category,
  Science,
  Build,
  Rule,
  FactCheck,
  Inventory2,
  Assessment,
} from "@mui/icons-material";
import {IconNames, SharedMenuItemIcons} from "./enums";

export const getIcon = (icon: string) => {
  switch (icon) {
    case IconNames.SEARCH:
      return <Search />;
    case IconNames.EDIT:
      return <Edit />;
    case IconNames.CREATE:
      return <Add />;
    case IconNames.SAVE:
      return <Save />;
    case IconNames.DELETE:
      return <Delete />;
    case IconNames.CLOSE:
      return <Close />;
    case IconNames.APPROVED:
      return <Check />;
    default:
      return "";
  }
};

export const getMenuIcon = (icon?: SharedMenuItemIcons) => {
  switch (icon) {
    case SharedMenuItemIcons.CLIENTS:
      return <People />;
    case SharedMenuItemIcons.SAMPLE_TYPES:
      return <Category />;
    case SharedMenuItemIcons.ANALYTES:
      return <Science />;
    case SharedMenuItemIcons.ANALYSIS_METHODS:
      return <Build />;
    case SharedMenuItemIcons.CRITERIA:
      return <Rule />;
    case SharedMenuItemIcons.TEST_TYPES:
      return <FactCheck />;
    case SharedMenuItemIcons.SAMPLES:
      return <Inventory2 />;
    case SharedMenuItemIcons.REPORTS:
      return <Assessment />;
    default:
      return null;
  }
};
