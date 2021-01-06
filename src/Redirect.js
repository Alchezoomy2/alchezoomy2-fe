import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"
import { useHistory } from "react-router-dom";


export const AutoRedirect = (props) => {
    const store = useStateStore();
    const history = useHistory();

    let code = new URLSearchParams(props.location.search);
    store.changeCode(code.get('code'));

    history.push('/login')


    return useObserver(() =>
        <p>REDIRECTING!</p>
    )

}

export default AutoRedirect