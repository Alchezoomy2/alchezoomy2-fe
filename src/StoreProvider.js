import React, { useContext } from 'react';
import { useLocalObservable } from "mobx-react";

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        code: localStorage.getItem('CODE') || '',
        token: localStorage.getItem('TOKEN') || '',
        userType: localStorage.getItem('USER_TYPE') || '',
        serverUrl: 'https://api.alchezoomy.com:3443',
        zoomAPIurl: 'https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://www.alchezoomy.com/redirect/',
        s3VideoUrl: 'https://alchezoomy.s3-us-west-2.amazonaws.com/',
        teacherInfo: localStorage.getItem('TEACHER_INFO') || '',
        studentInfo: localStorage.getItem('STUDENT_INFO') || '',
        meetingsObj: localStorage.getItem('MEETINGSOBJ') || '',
        chatArray: localStorage.getItem('CHAT_ARRAY') || '',
        bookmarkArray: localStorage.getItem('BOOKMARK_ARRAY') || '',
        transcriptArray: localStorage.getItem('TRANSCRIPT_ARRAY' || ''),
        meetingDetails: localStorage.getItem('MEETING_DETAILS' || ''),
        loading: localStorage.getItem('LOADING' || true),
        videoTimestamp: 0,

        changeToken: newToken => {
            store.token = newToken;
            localStorage.setItem('TOKEN', newToken);
        },

        changeCode: newCode => {
            store.code = newCode;
            localStorage.setItem('CODE', newCode);
        },

        changeUserType: newUserType => {
            store.UserType = newUserType;
            localStorage.setItem('USER_TYPE', newUserType);
        },

        changeTeacherInfo: newTeacherInfo => {
            store.teacherInfo = newTeacherInfo;
            localStorage.setItem('TEACHER_INFO', newTeacherInfo)
        },

        changeStudentInfo: newStudentInfo => {
            store.studentInfo = newStudentInfo;
            localStorage.setItem('STUDENT_INFO', newStudentInfo)
        },

        changeMeetingsObj: newMeetingsObj => {
            store.meetingsObj = newMeetingsObj;
            localStorage.setItem('MEETINGSOBJ', newMeetingsObj);
        },

        changeLoading: newLoadingState => {
            store.loading = newLoadingState;
            localStorage.setItem('LOADING', newLoadingState);
        },

        changeChatArray: newChatArray => {
            store.chatArray = newChatArray;
            localStorage.setItem('CHAT_ARRAY', newChatArray)
        },

        changeTranscriptArray: newTranscriptArray => {
            store.transcriptArray = newTranscriptArray;
            localStorage.setItem('TRANSCRIPT_ARRAY', newTranscriptArray)
        },

        changeMeetingDetails: newMeetingsDetails => {
            store.meetingDetails = newMeetingsDetails;
            localStorage.setItem('MEETING_DETAILS', newMeetingsDetails)
        },

        changeVideoTimestamp: newTimestamp => {
            store.videoTimestamp = newTimestamp;
        },

        changeBookmarkArray: newBookmarkArray => {
            store.bookmarkArray = newBookmarkArray;
            localStorage.setItem('BOOKMARK_ARRAY', newBookmarkArray)
        }

    }));
    return (
        <StoreContext.Provider
            value={store}> {children}
        </StoreContext.Provider>
    )
};

export const useStateStore = () => useContext(StoreContext);