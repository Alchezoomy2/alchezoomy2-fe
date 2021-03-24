import React, { useState, useEffect } from "react";

import useStyles from "./AdminS3DashboardStyles";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { fetchS3Obj, updateS3Obj } from "../../utils/admin-fetches/s3-fetches";

export default function AdminS3Dashboard({ handleSnackbarOpen
}) {
    const classes = useStyles();
    const [accessKeyId, setAccessKeyId] = useState("");
    const [secretAccessKey, setSecretAccessKey] = useState("");
    const [region, setRegion] = useState("");
    const [bucket, setBucket] = useState("");

    useEffect(() => {
        const getS3Info = async () => {
            const returnedS3Obj = await fetchS3Obj();
            console.log("🚀 ~ file: AdminS3Dashboard.jsx ~ line 20 ~ getS3Info ~ returnedS3Obj", returnedS3Obj);

        };
        getS3Info();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newS3Obj = {
            accessKeyId,
            secretAccessKey,
            region,
            Bucket: bucket
        };
        const updatedS3Obj = await updateS3Obj(newS3Obj);
        console.log("🚀 ~ file: AdminS3Dashboard.jsx ~ line 27 ~ handleSubmit ~ updatedS3Obj", updatedS3Obj);

        handleSnackbarOpen();
    };

    return (
        <div className={classes.frame}>
            <Paper
                elevation={3}
                className={classes.root}>
                <Typography
                    variant="h5">
                    S3 Information
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                    <TextField
                        className={classes.textField}
                        id="accessKeyId"
                        label="accessKeyId"
                        variant="outlined"
                        onChange={({ target }) => setAccessKeyId(target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        id="secretAccessKey"
                        label="Secret Access Key"
                        variant="outlined"
                        type="password"
                        onChange={({ target }) => setSecretAccessKey(target.value)}
                    />
                    <TextField
                        id="region"
                        label="Region"
                        variant="outlined"
                        onChange={({ target }) => setRegion(target.value)}
                    />
                    <TextField
                        id="bucket"
                        label="Bucket"
                        variant="outlined"
                        onChange={({ target }) => setBucket(target.value)}
                    />
                    <Button
                        type="submit">
                        SUBMIT
                    </Button>
                </form>
            </Paper>
        </div>
    );

}

AdminS3Dashboard.propTypes = {
    returnedS3Obj: PropTypes.objectOrObservableObject,
    handleSnackbarOpen: PropTypes.func
};
