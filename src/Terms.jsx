import React from "react";
import { Paper } from "@material-ui/core";

export const Terms = () => {

    return (
        <Paper elevation={3}>
            <div>
                <Paper elevation={2}>
                    <img
                        styles={{ height: "50px", width: "50px" }}

                        src="/images/alchezoomy-logo.png"
                        alt="logo image" />
                </Paper>
            </div>
            <div>
                <a src="https://www.termsofusegenerator.net/live.php?token=fHh0NKrLk7BcEmdVd6pJP8L8tlGTTHoc">TERMS</a>

            </div>
        </Paper>
    );
};

export default Terms;