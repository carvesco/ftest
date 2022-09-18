import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
  Modal,
} from "@mui/material";
import { ZoomInRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import { Console } from "console";
import Roles from "../../components/roles/roles";
import People from "../../components/people/people";

const Groups = () => {
  const location = useLocation();
  const [token, setToken] = useState<string>("");
  const [groups, setGroups] = useState<any[]>([]);
  const [detailsDrop, setDetailsDrop] = useState("");
  const [editModal, setEditModal] = useState<boolean>(true);
  useEffect(() => {
    setToken(location.state.token);
    //console.log(token);
    axios({
      method: "get",
      url: "https://demo-api-work-test.herokuapp.com/group/",
      headers: {
        authorization: token,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setGroups(response.data.groups);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location, token]);

  const showDetails = (groupName: string) => {
    if (detailsDrop === groupName) {
      setDetailsDrop("");
    } else {
      setDetailsDrop(groupName);
    }
  };

  const handleCloseEditModal = ()=>{
    setEditModal(false)
  }
  return (
    <>
      <Box sx={{ width: "80%", m: "auto", paddingTop: 10 }}>
        <Typography variant="h2">Groups</Typography>
        <Box sx={{ bgcolor: "#ffffff", width: "100%", marginTop: 10 }}>
          <List>
            {groups.map((item, i) => (
              <>
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edti">
                        <EditRounded />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="details"
                        onClick={() => {
                          showDetails(item.name);
                        }}
                      >
                        <ZoomInRounded />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteRounded />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={item?.name}
                    secondary={item?.description}
                  />
                </ListItem>
                <Collapse
                  in={detailsDrop === item.name}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="h5" sx={{ pl: 3 }}>
                          Roles
                        </Typography>
                        <Roles groupRoles={item.roles} />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h5" sx={{ pl: 3 }}>
                        People
                      </Typography>
                      <People groupPeople={item.people} />
                    </Grid>
                  </Grid>
                </Collapse>
              </>
            ))}
          </List>
        </Box>
      </Box>
      <Modal
        open={editModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <p>Casa</p>
      </Modal>
    </>
  );
};

export default Groups;
