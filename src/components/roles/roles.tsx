import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";

const Roles = (props: any) => {
  const [rolesList, setRolesList] = useState<any[]>([]);
  useEffect(() => {
    setRolesList(props?.groupRoles);
  }, [props, rolesList]);

  return (
    <List>
      {rolesList.map((item, i) => (
        <ListItem sx={{pl:4}}
          key={item?.id}
          secondaryAction={
            <>
              <Checkbox edge="end" checked={item.active} />
            </>
          }
        >
          <ListItemText primary={item?.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Roles;
