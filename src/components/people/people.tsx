import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { isEqual } from "lodash";
import { showAlertSuccess } from "../alert/alert";

const People = (props: any) => {
  const [peopleList, setPeopleList] = useState<any[]>([]);
  const [oldPeople, setOldPeople] = useState<any[]>([]);
  const [newPeople, setNewPeople] = useState<any[]>([]);
  useEffect(() => {
    setPeopleList(props?.groupPeople);
    var oldp: string[] = [];
    props?.groupPeople.forEach((v: any, i: any) => {
      if (v?.active === true) {
        oldp.push(v?.id);
      }
    });
    setOldPeople(oldp);
    setNewPeople(oldp);
  }, [props]);

  const handlePeopleEdit = () => {
    var data;
    if (oldPeople.length === 0) {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: ["empty"],
        newValues: newPeople,
      });
    } else if (newPeople.length === 0) {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: oldPeople,
        newValues: ["empty"],
      });
    } else {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: oldPeople,
        newValues: newPeople,
      });
    }

    console.log(data);
    axios({
      method: "post",
      url: `https://demo-api-work-test.herokuapp.com/group/manage-members`,
      headers: {
        authorization: props?.token,
      },
      data: data,
    })
      .then(function (response) {
        console.log(response.data);
        showAlertSuccess("Edited", "the people were edited succesfully");
        props.updateGroups();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <List>
        {peopleList?.map((item, i) => (
          <ListItem
            sx={{ pl: 4 }}
            key={item?.id}
            secondaryAction={
              <>
                <Checkbox
                  edge="end"
                  checked={item.active}
                  onChange={() => {
                    const pCopy = [...peopleList];
                    pCopy[i].active = !pCopy[i].active;
                    setPeopleList(pCopy);
                    var npCopy = [...newPeople];
                    if (pCopy[i].active === true) {
                      npCopy.push(peopleList[i].id);
                      setNewPeople(npCopy);
                    } else {
                      npCopy = npCopy.filter((e) => e !== peopleList[i].id);
                      setNewPeople(npCopy);
                    }
                  }}
                />
              </>
            }
          >
            {peopleList[i].active ? (
              <ListItemText primary={item?.name} sx={{ color: "primary.main" }} />
            ) : (
              <ListItemText primary={item?.name} sx={{ color: "#b4e0e2" }} />
            )}
          </ListItem>
        ))}
      </List>
      {!isEqual(oldPeople, newPeople) && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2,mb:3 }}>
          <Button variant="contained" onClick={handlePeopleEdit}>
            Confirm Changes
          </Button>
        </Box>
      )}
    </>
  );
};

export default People;
