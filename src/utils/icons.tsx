import {
  Search,
  Close,
  Edit,
  Add,
  Save,
  Delete,
  Check,
} from "@mui/icons-material";
import {IconNames} from "./enums";

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
