import {Client} from "../../../../entities/client";
import {TableRowProps} from "../../../../shared/ui";
import {SharedTypographyAlign} from "../../../../utils/enums";

export const clientToTableRows = (clients: Client[]): TableRowProps[] => {
  return clients.map((client) => ({
    id: client.id,
    cells: [
      {
        children: client.id,
        align: SharedTypographyAlign.LEFT,
      },
      {
        children: client.name,
        align: SharedTypographyAlign.LEFT,
      },
    ],
  }));
};
