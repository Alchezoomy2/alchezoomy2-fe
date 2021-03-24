// import React, { useState } from "react";

// import useStyles from "./AdminS3DashboardStyles";
// import { Paper, TextField, Typography, Button } from "@material-ui/core";
// import { PropTypes } from "mobx-react";
// import { updateS3Obj } from "../../utils/admin-fetches/s3-fetches";
import React from "react";
export default function AdminS3Dashboard() {

    return <div>Hello!</div>;
}
//     const classes = useStyles();
//     const [accessKeyId, setAccessKeyId] = useState(returnedS3Obj.accessKeyId);
//     const [secretAccessKey, setSecretAccessKey] = useState(returnedS3Obj.secretAccessKey);
//     const [region, setRegion] = useState(returnedS3Obj.region);
//     const [bucket, setBucket] = useState(returnedS3Obj.Bucket);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newS3Obj = {
//             accessKeyId,
//             secretAccessKey,
//             region,
//             Bucket: bucket
//         };
//         const updatedS3Obj = await updateS3Obj(newS3Obj);
//         console.log("🚀 ~ file: AdminS3Dashboard.jsx ~ line 27 ~ handleSubmit ~ updatedS3Obj", updatedS3Obj);

//         handleSnackbarOpen();
//     };

//     return (
//         <div className={classes.frame}>
//             <Paper
//                 elevation={3}
//                 className={classes.root}>
//                 <Typography
//                     variant="h5">
//                     S3 Information
//                 </Typography>
//                 <form
//                     onSubmit={handleSubmit}
//                     className={classes.form}
//                 >
//                     <TextField
//                         className={classes.textField}
//                         id="accessKeyId"
//                         label="accessKeyId"
//                         variant="outlined"
//                         onChange={({ target }) => setAccessKeyId(target.value)}
//                     />
//                     <TextField
//                         className={classes.textField}
//                         id="secretAccessKey"
//                         label="Secret Access Key"
//                         variant="outlined"
//                         type="password"
//                         onChange={({ target }) => setSecretAccessKey(target.value)}
//                     />
//                     <TextField
//                         id="region"
//                         label="Region"
//                         variant="outlined"
//                         onChange={({ target }) => setRegion(target.value)}
//                     />
//                     <TextField
//                         id="bucket"
//                         label="Bucket"
//                         variant="outlined"
//                         onChange={({ target }) => setBucket(target.value)}
//                     />
//                     <Button
//                         type="submit">
//                         SUBMIT
//                     </Button>
//                 </form>
//             </Paper>
//         </div>
//     );

// }

// AdminS3Dashboard.propTypes = {
//     returnedS3Obj: PropTypes.object,
//     handleSnackbarOpen: PropTypes.func
// };
