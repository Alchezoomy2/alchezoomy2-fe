import React, { useEffect } from "react";
// import { Paper, Snackbar, TextField } from "@material-ui/core";
// import { useStyles } from "./styles/adminLogin.js";
// import { adminAuth, adminSetupPassword } from "./utils/admin-fetches/auth-fetches.js";
// import { useStateStore } from "./StoreProvider";
// import { NewAdminDialog } from "./components/NewAdminDialog/NewAdminDialog.jsx";
// import { useHistory } from "react-router-dom";


export default function AdminLogin() {


    // const history = useHistory();
    // const classes = useStyles();
    // const store = useStateStore();
    // const [userName, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
    // const [invalidLoginOpen, setInvalidLoginOpen] = useState(false);

    useEffect(() => {
        console.log("HERE!");
    }, []);
    return (<div>HI!</div>);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const adminInfo = await adminAuth(userName, password);
    //     if (adminInfo === "new") {
    //         setNewUserDialogOpen(true);
    //     } else if (adminInfo === "false") {
    //         setInvalidLoginOpen(true);
    //         setPassword("");
    //     } else if (adminInfo === "success") {
    //         store.setAdminInfo(adminInfo);
    //         store.changeLoggedIn();
    //         history.push("/admin/dashboard/");
    //     }
    // };

    // const handleClose = async (newUserName, newPassword1) => {
    //     const adminInfo = await adminSetupPassword(newUserName, newPassword1);
    //     await store.changeAdminInfo(adminInfo);
    //     setNewUserDialogOpen(false);
    // };

    // const handleSnackbarClose = () => {
    //     setInvalidLoginOpen(false);
    // };


    // return (
    //     <div>
    //         <Paper elevation={3}>
    //             <div>
    //                 <Paper elevation={2}>
    //                     <img
    //                         className={classes.mainLogo}
    //                         src="/images/AL-logo.JPG"
    //                         alt="logo image" />
    //                 </Paper>
    //             </div>
    //             <form
    //                 onSubmit={handleSubmit}
    //             >
    //                 <TextField
    //                     id="userName"
    //                     label="User Name"
    //                     value={userName}
    //                     onChange={({ target }) => setUserName(target.value)}
    //                     required
    //                 />
    //                 <TextField
    //                     id="password"
    //                     lavel="Password"
    //                     value={password}
    //                     onChange={({ target }) => setPassword(target.value)}
    //                     type="password"
    //                     required
    //                 />

    //             </form>
    //         </Paper>
    //         <NewAdminDialog
    //             handleClose={handleClose}
    //             newUserDialogOpen={newUserDialogOpen}
    //         />
    //         <Snackbar
    //             open={invalidLoginOpen}
    //             message="Invalid Username or Password"
    //             onClose={handleSnackbarClose}
    //         />
    //     </div>
    // );

}

