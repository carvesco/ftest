import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
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
  TextField,
  Button,
} from "@mui/material";
import { ZoomInRounded, DeleteRounded, EditRounded } from "@mui/icons-material";
import { Console } from "console";
import Roles from "../../components/roles/roles";
import People from "../../components/people/people";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Groups = () => {
  const location = useLocation();
  const [token, setToken] = useState<string>("");
  const [groups, setGroups] = useState<any[]>([]);
  const [detailsDrop, setDetailsDrop] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>();

  const getGroups = () => {
    axios({
      method: "get",
      url: "https://demo-api-work-test.herokuapp.com/group/",
      headers: {
        authorization: token,
      },
    })
      .then(function (response) {
        //console.log(response.data);
        setGroups(response.data.groups);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    setToken(location.state.token);
    //console.log(token);
    getGroups();
  }, [location, token]);

  const showDetails = (groupName: string) => {
    if (detailsDrop === groupName) {
      setDetailsDrop("");
    } else {
      setDetailsDrop(groupName);
    }
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
  };
  const openEditModal = (data: any) => {
    setEditModal(true);
    setEditData(data);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const openDeleteModal = (data: any) => {
    setDeleteModal(true);
  };

  /**
    Handle edit submition
  */
  const handleEditSubmit = () => {
    //console.log(editData);
    var data = qs.stringify({
      name: editData.name,
      description: editData.description,
    });
    axios({
      method: "patch",
      url: `https://demo-api-work-test.herokuapp.com/group/update/?id=${editData.id}`,
      headers: {
        authorization: token,
      },
      data: data,
    })
      .then(function (response) {
        console.log(response.data);
        getGroups();
        handleCloseEditModal();
      })
      .catch(function (error) {
        console.log(error);
        handleCloseEditModal();
      });
  };

  const handleDeleteGroup = ()=>{
    
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
                      <IconButton
                        edge="end"
                        aria-label="edtit"
                        onClick={() => {
                          openEditModal({
                            description: item.description,
                            name: item.name,
                            id: item.id,
                          });
                        }}
                      >
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
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={openDeleteModal}
                      >
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
      {/** Modal for editing groups */}
      <Modal
        open={editModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Group
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            sx={{ width: "100%", mt: 3 }}
            multiline
            maxRows={4}
            value={editData?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditData((prev: any) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            sx={{ width: "100%", mt: 3 }}
            multiline
            rows={8}
            value={editData?.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditData((prev: any) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <Box sx={{ position: "relative", left: "60%" }}>
            <Button
              variant="outlined"
              sx={{ mt: 5 }}
              onClick={handleCloseEditModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 5, ml: 3 }}
              onClick={handleEditSubmit}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      {/** Modal for editing groups */}
      <Modal
        open={deleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this group?
          </Typography>
          <Box sx={{ position: "relative", left: "60%" }}>
            <Button variant="outlined" sx={{ mt: 5 }} onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="contained" color="error" sx={{ mt: 5, ml: 3 }} onClick={handleDeleteGroup}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Groups;
