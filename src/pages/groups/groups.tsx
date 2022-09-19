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
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Roles from "../../components/roles/roles";
import People from "../../components/people/people";
import Divider from "@mui/material/Divider";
import { teal } from "@mui/material/colors";
import { styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { showAlertError, showAlertSuccess } from "../../components/alert/alert";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "primary.main",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const Groups = () => {
  const location = useLocation();
  const [token, setToken] = useState<string>("");
  const [groups, setGroups] = useState<any[]>([]);
  const [detailsDrop, setDetailsDrop] = useState("none");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>();
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
  });
  const [idDeleteGroup, setIdDeleteGroup] = useState<string>("");
  const navigate = useNavigate();

  const getGroups = () => {
    axios({
      method: "get",
      url: "https://demo-api-work-test.herokuapp.com/group/",
      headers: {
        authorization: token,
      },
    })
      .then(function (response) {
        setGroups(response.data.groups);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    setToken(location.state.token);
    getGroups();
  }, [location, token]);

  const showDetails = (groupName: string) => {
    if (detailsDrop === groupName) {
      setDetailsDrop("none");
    } else {
      setDetailsDrop(groupName);
    }
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setEditData({ id: "", name: "", description: "" });
  };
  const openEditModal = (data: any) => {
    setEditModal(true);
    setDetailsDrop("none")
    setEditData(data);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
    setIdDeleteGroup("");
  };
  const openDeleteModal = (id: any) => {
    setDetailsDrop("none")
    setDeleteModal(true);
    setIdDeleteGroup(id);
  };
  const closeCreateModal = () => {
    setDetailsDrop("none")
    setCreateModal(false);
  };
  const openCreateModal = () => {
    setCreateModal(true);
  };
  /**
    Handle edit submition
  */
  const handleEditSubmit = () => {
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
        getGroups();
        showAlertSuccess("Edited", "the group was edited succesfully");
        handleCloseEditModal();
      })
      .catch(function (error) {
        console.log(error);
        showAlertError("Error")
        handleCloseEditModal();
      });
  };

  /**
    Handle create submition
  */
  const handleCreateSubmit = () => {
    //console.log(editData);

    var data = qs.stringify({
      name: createData.name,
      description: createData.description,
    });
    axios({
      method: "post",
      url: `https://demo-api-work-test.herokuapp.com/group/create`,
      headers: {
        authorization: token,
      },
      data: data,
    })
      .then(function (response) {
        getGroups();
        showAlertSuccess("Created", "the group was created succesfully");
        closeCreateModal();
      })
      .catch(function (error) {
        console.log(error);
        showAlertError("Error")
        closeCreateModal();
      });
  };

  const handleDeleteGroup = () => {
    axios({
      method: "delete",
      url: `https://demo-api-work-test.herokuapp.com/group/delete/?id=${idDeleteGroup}`,
      headers: {
        authorization: token,
      },
      data: {},
    })
      .then(function (response) {
        getGroups();
        showAlertSuccess("Deleted", "the group was deleted succesfully");
        handleCloseDeleteModal();
      })
      .catch(function (error) {
        console.log(error);
        showAlertError("Error")
        handleCloseDeleteModal();
      });
  };

  const GroupList = styled(List)<{ component?: React.ElementType }>({
    "& .MuiTypography-root": {
      width: "90%",
    },
  });

  const handleLogOut = () => {
    setToken("");
    console.log(token);
    navigate("/login");
  };

  return (
    <>
      {token !== "none" ? (
        <>
          {groups.length > 0 ? (
            <Box
              sx={{
                width: "80%",
                m: "auto",
                paddingTop: 8,
                mb: 10,
              }}
            >
              <Typography variant="h1" color={"primary"}>
                Groups
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{ mr: 3 }}
                  variant="contained"
                  endIcon={<AddIcon />}
                  color="secondary"
                  onClick={openCreateModal}
                >
                  New Group
                </Button>
                <Button
                  variant="contained"
                  endIcon={<LogoutIcon />}
                  color="primary"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  width: "100%",
                  marginTop: 2,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "primary.main",
                }}
                color="primary"
              >
                <GroupList>
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
                              {editData?.id === item?.id ? (
                                <EditRounded sx={{ color: teal[50] }} />
                              ) : (
                                <EditRounded />
                              )}
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="details"
                              onClick={() => {
                                showDetails(item.name);
                              }}
                            >
                              {detailsDrop === item?.name ? (
                                <ZoomInRounded sx={{ color: teal[50] }} />
                              ) : (
                                <ZoomInRounded />
                              )}
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                openDeleteModal(item.id);
                              }}
                            >
                              {idDeleteGroup === item?.id ? (
                                <DeleteRounded sx={{ color: teal[50] }} />
                              ) : (
                                <DeleteRounded />
                              )}
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText
                          sx={{ color: "text.primary" }}
                          primary={item?.name}
                          secondary={item?.description}
                        />
                      </ListItem>
                      <Collapse
                        in={detailsDrop === item.name}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Divider variant="middle" sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ pl: 3 }}
                                color={"text.primary"}
                              >
                                Roles
                              </Typography>
                              <Roles
                                groupRoles={item.roles}
                                groupId={item.id}
                                token={token}
                                updateGroups={getGroups}
                              />
                            </Box>
                          </Grid>
                          <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                          />
                          <Grid item xs={5.8}>
                            <Typography
                              variant="h5"
                              sx={{ pl: 3 }}
                              color={"text.primary"}
                            >
                              People
                            </Typography>
                            <People
                              groupPeople={item.people}
                              groupId={item.id}
                              token={token}
                              updateGroups={getGroups}
                            />
                          </Grid>
                        </Grid>
                      </Collapse>
                      {i !== groups.length - 1 && <Divider />}
                    </>
                  ))}
                </GroupList>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "50%",
                m: "auto",
                display: "flex",
                justifyContent: "center",
                mt: 50,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
        </>
      ) : (
        <>No TOKEN</>
      )}

      {/** Modal for editing groups */}
      <Modal
        open={editModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
          >
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
      {/** Modal for deleting  groups */}
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
            border: "2px solid ",
            borderColor: "primary.main",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
          >
            Are you sure you want to delete this group?
          </Typography>
          <Box sx={{ position: "relative", left: "60%" }}>
            <Button
              variant="outlined"
              sx={{ mt: 5 }}
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 5, ml: 3 }}
              onClick={handleDeleteGroup}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      {/** Modal for creating  groups */}
      <Modal
        open={createModal}
        onClose={closeCreateModal}
        aria-labelledby="create-modal-title"
        aria-describedby="create-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="create-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
          >
            Create Group
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            sx={{ width: "100%", mt: 3 }}
            multiline
            maxRows={4}
            value={createData?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
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
            value={createData?.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <Box sx={{ position: "relative", left: "60%" }}>
            <Button
              variant="outlined"
              sx={{ mt: 5 }}
              onClick={closeCreateModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 5, ml: 3 }}
              onClick={handleCreateSubmit}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Groups;
