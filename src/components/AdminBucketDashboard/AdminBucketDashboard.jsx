import React, { useState } from "react";

import useStyles from "./AdminBucketDashboardStyles";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { updateS3Obj } from "../../utils/admin-fetches/s3-fetches";




export default function AdminBucketDashboard({
    returnedS3Obj, openSnackbar
}) {


    const classes = useStyles();
    const [accessKeyId, setAccessKeyId] = useState(returnedS3Obj.accessKeyId);
    const [secretAccessKey, setSecretAccessKey] = useState(returnedS3Obj.secretAccessKey);
    const [region, setRegion] = useState(returnedS3Obj.region);
    const [bucket, setBucket] = useState(returnedS3Obj.Bucket);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newS3Obj = {
            accessKeyId,
            secretAccessKey,
            region,
            Bucket: bucket
        };

        const updatedS3Obj = await updateS3Obj(newS3Obj)
            .catch((error) => {
                openSnackbar("error", error.message);
            });

        setAccessKeyId(updatedS3Obj.accessKeyId);
        setSecretAccessKey(updatedS3Obj.secretAccessKey);
        setRegion(updatedS3Obj.region);
        setBucket(updatedS3Obj.Bucket);

        openSnackbar("Success", "Changes Saved");
    };

    return (
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div>
                    <Typography
                        variant="h5"
                        className={classes.title}>
                        S3 Information
                    </Typography>
                    <form
                        onSubmit={handleSubmit}
                        className={classes.form}
                    >
                        <TextField
                            className={classes.textField}
                            id="accessKeyId"
                            label="Access Key Id"
                            variant="outlined"
                            value={accessKeyId}
                            onChange={({ target }) => setAccessKeyId(target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            id="secretAccessKey"
                            label="Secret Access Key"
                            variant="outlined"
                            value={secretAccessKey}
                            type="password"
                            onChange={({ target }) => setSecretAccessKey(target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            id="region"
                            label="Region"
                            variant="outlined"
                            value={region}
                            onChange={({ target }) => setRegion(target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            id="bucket"
                            label="Bucket"
                            variant="outlined"
                            value={bucket}
                            onChange={({ target }) => setBucket(target.value)}
                        />
                        <Button
                            variant="outlined"
                            type="submit">
                            SUBMIT
                    </Button>
                    </form>
                </div>
            </Paper>
        </div>
    );

}

AdminBucketDashboard.propTypes = {
    returnedS3Obj: PropTypes.object,
    openSnackbar: PropTypes.func
};
