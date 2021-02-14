import { useObserver } from "mobx-react";
import React from "react";
import { useStateStore } from "./StoreProvider";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";


export const AutoRedirect = ({ location }) => {
    const store = useStateStore();
    const history = useHistory();

    let code = new URLSearchParams(location.search);
    store.changeCode(code.get("code"));

    history.push("/login");

    return useObserver(() =>
        <Backdrop open={true}>
            <CircularProgress />
        </Backdrop>
    );

};

export default AutoRedirect;