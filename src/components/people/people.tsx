import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Checkbox } from "@mui/material";

const People = (props: any) => {
  const [peopleList, setPeopleList] = useState<any[]>([]);
  useEffect(() => {
    setPeopleList(props?.groupPeople);
  }, [props, peopleList]);
  return (
    <List>
      {peopleList?.map((item, i) => (
        <ListItem
          sx={{ pl: 4 }}
          key={item?.id}
        >
          <ListItemText primary={item?.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default People;
