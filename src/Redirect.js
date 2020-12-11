import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"



export const Redirect = (props) => {
    const store = useStateStore();
    const [userType] = React.useState("");

    let code = new URLSearchParams(props.location.search);
    store.changeCode(code);

    if (userType === 'teacher') {
        this.props.history.push = '/teacher';
    } else {
        this.props.history.push = '/student';
    }


    return useObserver(() => {
        <p>REDIRECTING</p>
    })
}
export default Redirect;