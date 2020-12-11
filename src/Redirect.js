import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"



export const AutoRedirect = (props) => {
    const store = useStateStore();
    // const [userType] = React.useState("");

    let code = new URLSearchParams(props.location.search);
    store.changeCode(code.get('code'));
    console.log(store.userType);
    console.log(code.get('code'))

    if (store.userType === 'teacher') {
        props.history.push = '/teacher';
    } else {
        props.history.push = '/student';
    }


    return useObserver(() =>
        // <p>REDIRECTING
        // autoRedirect()
        // </p>
        <p>{userType}</p>
    )

}

export default AutoRedirect