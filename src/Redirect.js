import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"



export const Redirect = (props) => {
    const store = useStateStore();
    const [userType] = React.useState("");

    let code = new URLSearchParams(window.location.search);
    store.changeCode(code);

    if (userType === 'teacher') {
        window.location.href = '/teacher';
    } else {
        window.location.href = '/student';
    }


    return useObserver(() => {
        <p>REDIRECTING</p>
    })
}
export default Redirect;