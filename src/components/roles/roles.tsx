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
import { isConstructorDeclaration } from "typescript";
import { json } from "stream/consumers";
import { showAlertError, showAlertSuccess } from "../alert/alert";

const Roles = (props: any) => {
  const [rolesList, setRolesList] = useState<any[]>([]);
  const [oldRoles, setOldRoles] = useState<any[]>([]);
  const [newRoles, setNewRoles] = useState<any[]>([]);
  useEffect(() => {
    setRolesList(props?.groupRoles);
    var oldr: string[] = [];
    props?.groupRoles.forEach((v: any, i: any) => {
      if (v?.active === true) {
        oldr.push(v?.id);
      }
    });
    setOldRoles(oldr);
    setNewRoles(oldr);
  }, [props]);

  const handleRolesEdit = () => {
    var data;
    if (oldRoles.length === 0) {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: ["empty"],
        newValues: newRoles,
      });
    } else if (newRoles.length === 0) {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: oldRoles,
        newValues: ["empty"],
      });
    } else {
      data = qs.stringify({
        groupId: props.groupId,
        oldValues: oldRoles,
        newValues: newRoles,
      });
    }

    console.log(data);
    axios({
      method: "post",
      url: `https://demo-api-work-test.herokuapp.com/group/manage-roles`,
      headers: {
        authorization: props?.token,
      },
      data: data,
    })
      .then(function (response) {
        console.log(response.data);
        showAlertSuccess("Edited", "the roles were edited succesfully");
        props.updateGroups();
      })
      .catch(function (error) {
        showAlertError("Error")
        console.log(error);
      });
  };
  return (
    <>
      <List>
        {rolesList.map((item, i) => (
          <ListItem
            sx={{ pl: 4 }}
            key={item?.id}
            secondaryAction={
              <>
                <Checkbox
                  edge="end"
                  checked={item.active}
                  onChange={() => {
                    const rlCopy = [...rolesList];
                    rlCopy[i].active = !rlCopy[i].active;
                    setRolesList(rlCopy);
                    var nrlCopy = [...newRoles];
                    if (rlCopy[i].active === true) {
                      nrlCopy.push(rolesList[i].id);
                      setNewRoles(nrlCopy);
                    } else {
                      nrlCopy = nrlCopy.filter((e) => e !== rolesList[i].id);
                      setNewRoles(nrlCopy);
                    }
                  }}
                />
              </>
            }
          >
            {rolesList[i].active ? (
              <ListItemText primary={item?.name} sx={{ color: "primary.main" }} />
            ) : (
              <ListItemText primary={item?.name} sx={{ color: "#b4e0e2" }} />
            )}
          </ListItem>
        ))}
      </List>

      {!isEqual(oldRoles, newRoles) && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
          <Button variant="contained" onClick={handleRolesEdit}>
            Confirm Changes
          </Button>
        </Box>
      )}
    </>
  );
};

export default Roles;
