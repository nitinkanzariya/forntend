import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Custom from "./Modal";

const App = () => {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState({ open: false, type: '' });
  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get("http://localhost:8000/", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          });
      } catch (error) {
        console.log("Try Again");
      }
    }
    fetchData();
  }, [modal]);

  const columns = [
    { field: "userId", headerName: "ID", width: 40 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "last Name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    { field: "gender", headerName: "Gender", width: 80 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    { field: "jobTitle", headerName: "Job Title", width: 150 },
    { field: "joinDate", headerName: "Join Date", width: 150 },
    { field: "salary", headerName: "Salary", width: 100 },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ height: "20%", width: "100%" }}>
        <Button
          onClick={() => {
            setModal({
              open: true,
              type: "insert",
            });
          }}
        >
          Insert
        </Button>
        <Button
          onClick={() => {
            setModal({
              open: true,
              type: "update",
            });
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            setModal({
              open: true,
              type: "delete",
            });
          }}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ height: "80%", width: "100%" }}>
        {data && (
          <DataGrid
            rows={data}
            getRowId={(row) => row.userId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        )}
      </Box>

      <Custom
        modal={modal}
        handleClose={() => setModal({ open: false, type: '' })}
      />
    </Box>
  );
};

export default App;
