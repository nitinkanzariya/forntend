import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Update = ({ handleClose }) => {
  const [data, setData] = useState({
    userId: null,
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    joinDate: "",
    jobTitle: "",
    salary: null,
  });
  const [error, setError] = useState({});

  const handleDOB = (e) => {
    const date = new Date(e.target.value);
    const today = new Date();

    const age = today.getFullYear() - date.getFullYear();

    if (age > 18) {
      setData({ ...data, dateOfBirth: e.target.value });
    } else {
      setError({ ...error, dateOfBirth: true });
    }
  };
  const input = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    let temp = false;
    if (data.userId === null && data.userId === "") {
      setError({ ...error, userId: true });
      temp = true;
    }
    if (data.firstName === null && data.firstName === "") {
      setError({ ...error, firstName: true });
      temp = true;
    }
    if (data.lastName === null && data.lastName === "") {
      setError({ ...error, lastName: true });
      temp = true;
    }
    if (data.email === null && data.email === "") {
      setError({ ...error, email: true });
      temp = true;
    }
    if (data.dateOfBirth === null && data.dateOfBirth === "") {
      setError({ ...error, dateOfBirth: true });
      temp = true;
    }
    if (data.joinDate === null && data.joinDate === "") {
      setError({ ...error, joinDate: true });
      temp = true;
    }
    if (data.jobTitle === null && data.jobTitle === "") {
      setError({ ...error, jobTitle: true });
      temp = true;
    }
    if (data.salary === null && data.salary === "") {
      setError({ ...error, salary: true });
      temp = true;
    }
    if (data.gender === null && data.gender === "") {
      setError({ ...error, gender: true });
      temp = true;
    }

    if (!temp) {
      try {
        console.log(data);

        await axios
          .put(`http://localhost:8000/updateUser/${data.userId}`, data)
          .then((res) => {
            console.log(res.status, res.headers);
          });
        handleClose();
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  function convertDateFormat(dateString) {
    const parts = dateString.split("-");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/getUser/${data.userId}`
      );
      console.log(res.data);

      setData(res.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { m: 0.5 },
      }}
    >
      <Box>
        <TextField
          label="id"
          name="userId"
          variant="outlined"
          type="number"
          required
          onChange={input}
          value={data.userId}
          error={error.userId}
        />
        <Button variant="contained" onClick={search}>
          Search
        </Button>
      </Box>
      <TextField
        value={data.firstName}
        name="firstName"
        label="first name"
        variant="outlined"
        required
        onChange={input}
        error={error.firstName}
      />
      <TextField
        value={data.lastName}
        name="lastName"
        label="last Name"
        variant="outlined"
        required
        onChange={input}
        error={error.lastName}
      />
      <TextField
        name="email"
        value={data.email}
        required
        label="Email"
        variant="outlined"
        type="email"
        onChange={input}
        error={error.email}
      />
      {/* gender box */}
      <FormControl required>
        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender"
          name="gender"
          value={data.gender}
          onChange={input}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <TextField
        name="dateOfBirth"
        required
        label="Date of Birth"
        value={data.dateOfBirth ? convertDateFormat(data.dateOfBirth) : null}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDOB}
        error={error.dateOfBirth}
      />
      <TextField
        value={data.jobTitle}
        name="jobTitle"
        required
        label="Job Title"
        variant="outlined"
        onChange={input}
        error={error.jobTitle}
      />
      <TextField
        value={data.joinDate ? convertDateFormat(data.joinDate) : null}
        name="joinDate"
        required
        label="join date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={input}
        error={error.joinDate}
      />
      <TextField
        value={data.salary}
        InputLabelProps={{
          shrink: true,
        }}
        name="salary"
        required
        label="Salary"
        variant="outlined"
        type="number"
        onChange={input}
        error={error.salary}
      />

      <FormControl required>
        <FormLabel id="active">Is Active</FormLabel>
        <RadioGroup
          row
          aria-labelledby="active"
          name="isActive"
          value={data.isActive}
          onChange={input}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <Box>
        <Button variant="contained" onClick={submit}>
          Insert
        </Button>
      </Box>
    </Box>
  );
};

export default Update;
