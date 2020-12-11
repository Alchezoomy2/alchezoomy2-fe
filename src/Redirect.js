import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"



export const AutoRedirect = (props) => {
    const store = useStateStore();
    const [userType] = React.useState("");

    let code = new URLSearchParams(props.location.search);
    store.changeCode(code.get('code'));
    console.log(userType);
    console.log(code)

    if (userType === 'teacher') {
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