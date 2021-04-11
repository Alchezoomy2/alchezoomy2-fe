import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button } from "@material-ui/core";
import { useStyles } from "./StudentInviteStyles";
import { createStudent, studentExists } from "../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../utils/StoreProvider";
import { useHistory } from "react-router-dom";



export default function StudentInvite() {
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [studentInfo, setStudentInfo] = useState({});
    const store = useStateStore();
    const { jwt } = useParams();
    const classes = useStyles();


    useEffect(() => {
        const checkStudent = async () => {
            const response = await studentExists(jwt);
            const { status } = response;

            if (status === "existing") {
                history.push("/student/login");
            } else {
                setStudentInfo(response);
                setOpen(true);
            }
        };

        checkStudent();
    }, []);

    const handleSubmit = async (e, studentEmail, teacherEmail) => {
        e.preventDefault();

        const studentInfo = await createStudent(studentEmail, teacherEmail, password1, firstName);
        if (studentInfo) {
            store.changeStudentInfo(studentInfo);
            const newMeetingsObj = await fetchAllStudentMeetings();
            store.changeMeetingsObj(newMeetingsObj);
            store.changeLoggedIn();
            history.push("/student/");
        }
    };


    return (
        <Paper elevation={3} className={classes.root}>
            <div>
                <Paper elevation={2}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo" />
                    <div className={classes.inviteText}>
                        <Typography
                            variant="body1"
                            align="center">
                            {"Welcome to Alchezoomy!"}
                            <br />
                            {"You have been invited to view lectures from Alchemy Code Lab!"}
                            <br />
                            {"To create your account, you'll need to create a password"}
                            <br />
                            {"We will use your email address as your user name!"}
                        </Typography>
                    </div>
                    <form
                        onSubmit={(e) => handleSubmit(e, studentInfo.studentEmail, studentInfo.teacherEmail)}
                        className={classes.signupForm}>
                        <TextField
                            id="studentEmail"
                            variant="outlined"
                            value={studentInfo.studentEmail}
                            disabled
                        />
                        <TextField
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                            required
                        />
                        <TextField
                            id="password1"
                            label="Password"
                            value={password1}
                            onChange={({ target }) => setPassword1(target.value)}
                            type="password"
                            error={password1 !== password2}
                            required
                        />
                        <TextField
                            id="password2"
                            label="Password"
                            value={password2}
                            onChange={({ target }) => setPassword2(target.value)}
                            type="password"
                            error={password1 !== password2}
                            required
                        />
                        <Button
                            type="submit">
                            SUBMIT
                        </Button>

                    </form>
                </Paper>

                <Backdrop
                    className={classes.backdrop}
                    open={open}>
                    <CircularProgress />
                </Backdrop>
            </div>
        </Paper>


    );

}

