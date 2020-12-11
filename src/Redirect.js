import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"
// import { useHistory } from "react-router-dom";




export const AutoRedirect = (props) => {
    const store = useStateStore();
    // const history = useHistory();
    console.log(store)
    // let code = new URLSearchParams(props.location.search);
    // store.changeCode(code.get('code'));

    // if (store.userType === 'teacher') {
    //     history.push('/teacher');
    // } else {
    //     history.push('/student');
    // }


    return useObserver(() =>
        <p>REDIRECTING!</p>
    )

}

export default AutoRedirect