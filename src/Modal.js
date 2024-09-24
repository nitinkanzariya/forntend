import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import Insert from "./Insert";
import Update from "./Update";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Custom = ({ modal, handleClose }) => {
  const [id, setId] = useState(null);

  const del = async () => {
    const con = window.confirm("Are you want to delete");
    console.log(con);

    if (con) {
      await axios
        .post(`http://localhost:8000/delete/`, { userId: id })
        .then((res) => console.log(res));
        setId(null);
      handleClose();
    }
  };
  return (
    <Modal
      open={modal.open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        {modal.type === "insert" ? (
          <Insert handleClose={handleClose} />
        ) : modal.type === "delete" ? (
          <>
            <TextField
              label="User Id"
              variant="outlined"
              type="number"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <Button sx={{ m: 2 }} variant="contained" onClick={del}>
              Delete
            </Button>
          </>
        ) : modal.type === "update" ? (
          <Update handleClose={handleClose} />
        ) : (
          <Box>hello</Box>
        )}
      </Box>
    </Modal>
  );
};

export default Custom;
