import {  useState, useEffect } from "react";


import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { editCurrentUser } from "../../redux/slices/authSlices";


export default function PopUpEditUser({
  openModal,
  handleClose,
  currentUser,
  getAllUsers,
}) {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");


  /*AllertPopUp */
  const [showPopUpAlert, setShowPopUpAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name || "");
      setLastName(currentUser?.lastName || "");
      setEmail(currentUser?.email || "");
      setRole(currentUser?.role || "");
    }
  }, [currentUser]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUpAlert(false);
      setTitle("");
      setStatus("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [showPopUpAlert]);

  const editUser = async () => {
    const response = await editCurrentUser({
      "name":name,
  "lastName":lastName,
  "email":email,
  "password":password,
   "confPassword":confPass,
   "role":role

    },currentUser.uuid);

    if (response.status === 200 || 204) {
      handleClose();
      getAllUsers();
      /*Alert */
      setShowPopUpAlert(true);
      setTitle("Дані користувача змінено!");
      setStatus("success");
      handleClose();
    } else {
      /*Alert */
      setShowPopUpAlert(true);
      setTitle("Сталася помилка!");
      setStatus("error");
      handleClose();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: { xs: "15px", sm: "32px" },
    overflow: { xs: "auto", sm: "hidden" },

    maxWidth: "700px",
    height: { xs: "90vh", sm: "auto" },
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
      >
        <Box component="form" sx={style}>
          <Box
            sx={{
              display: { xs: "flex", sm: "flex" },
              marginTop: { xs: "13px", sm: "10px" },
              justifyContent: { xs: "center", sm: "space-between" },
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 20px",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Інформація про користувача
              </Typography>
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Ім'я користувача"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Прізвище користувача"
                variant="filled"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Пошта користувача"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Роль"
                variant="filled"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Пароль"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                sx={{ margin: "5px 0" }}
                id="filled-basic"
                label="Підтвердіть пароль"
                variant="filled"
                value={confPass}
                onChange={(e) => setConfPass(e.target.value)}
              />
            </Box>

          </Box>
          <Box sx={{ display: "flex",justifyContent:"center", padding: { xs: "8px 5px", sm: "0px" } }}>
            <Button
              className="editSubBtn"
              onClick={editUser}
              sx={{ width: "50%", margin: { xs: "0px 3px", sm: "0px 0px" } }}
              variant="outlined"
            >
              Зберегети
            </Button>
            <Button
              className="editSubBtn"
              onClick={handleClose}
              color="error"
              sx={{
                width: "50%  ",
                display: { xs: "block", sm: "none" },
                margin: { xs: "0px 3px", sm: "0px 0px" },
              }}
              variant="outlined"
            >
              Закрити
            </Button>
          </Box>
        </Box>
      </Modal>
      {/*Alert PopUp */}
      {showPopUpAlert && (
        <Alert
          sx={{
            position: "fixed",
            top: "8px",
            right: "18px",
            zIndex: 99,
          }}
          variant="filled"
          severity={status ? status : "success"}
        >
          {title}
        </Alert>
      )}
    </>
  );
}