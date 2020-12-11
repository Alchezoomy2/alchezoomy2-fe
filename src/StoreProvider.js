import React, { useContext } from 'react';
import { useLocalObservable } from "mobx-react";

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        code: localStorage.getItem('CODE') || '',
        token: localStorage.getItem('TOKEN') || '',
        userType: localStorage.getItem('USERTYPE') || '',

        changeToken: newToken => {
            store.token = newToken;
            localStorage.setItem('TOKEN', newToken);
        },

        changeCode: newCode => {
            store.Code = newCode;
            localStorage.setItem('CODE', newCode);
        },

        changeUserType: newUserType => {
            console.log('------------------------------------');
            console.log(`newUserType:  ${newUserType}`);
            console.log('------------------------------------');
            store.UserType = newUserType;
            localStorage.setItem('USERTYPE', newUserType);
        }
    }));
    return (
        <StoreContext.Provider
            value={store}> {children}
        </StoreContext.Provider>
    )
};

export const userStateStore = () => useContext(StoreContext);