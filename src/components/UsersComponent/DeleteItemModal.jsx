import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function PopUpDeleteItem({
  title,
  firstButtonTitle,
  secondButtonTitle,
  handleClose,
  openModal,
  deleteItemFunc,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: { xs: "18px", sm: "32px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: { xs: "85%", sm: "300px" },

  };
  return (
    <>
      {/*Modal "EXIT" */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "15px", fontWeight: "bolder", textAlign: "center" }}
          >
            {title}
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              marginTop: { xs: "13px", sm: "26px" }
            }}
          >
            <Button
              sx={{ width: 150, mr: { xs: "0px", sm: "8px" } }}
              variant="contained"
              onClick={handleClose}
            >
              {firstButtonTitle}
            </Button>
            <Button
              sx={{ width: 150, ml: { xs: "0px", sm: "8px" }, mt: { xs: "10px", sm: "0px" } }}
              variant="contained"
              color="error"
              onClick={deleteItemFunc}
            >
              {secondButtonTitle}
            </Button>
          </Grid>
        </Box>
      </Modal>
      {/*END Modal "EXIT" */}
    </>
  );
}