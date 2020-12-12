import React, { useContext } from 'react';
import { useLocalObservable } from "mobx-react";

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        code: localStorage.getItem('CODE') || '',
        token: localStorage.getItem('TOKEN') || '',
        userType: localStorage.getItem('USERTYPE') || '',
        serverUrl: 'https://alchezoomy2.herokuapp.com',
        teacherInfo: localStorage.getItem('TEACHERINFO') || '',
        meetingsObj: localStorage.getItem('MEETINGSOBJ') || '',
        loading: true,

        changeToken: newToken => {
            store.token = newToken;
            localStorage.setItem('TOKEN', newToken);
        },

        changeCode: newCode => {
            store.Code = newCode;
            localStorage.setItem('CODE', newCode);
        },

        changeUserType: newUserType => {
            store.UserType = newUserType;
            localStorage.setItem('USERTYPE', newUserType);
        },

        changeTeacherInfo: newTeacherInfo => {
            store.teacherInfo = newTeacherInfo;
            localStorage.setItem('TEACHERINFO', newTeacherInfo)
        },

        changeMeetingsObj: newMeetingsObj => {
            store.meetingsObj = newMeetingsObj;
            localStorage.setItem('MEETINGSOBJ', newMeetingsObj);
        },

        changeLoading: newLoadingState => {
            store.loading = newLoadingState;
        }
    }));
    return (
        <StoreContext.Provider
            value={store}> {children}
        </StoreContext.Provider>
    )
};

export const useStateStore = () => useContext(StoreContext);