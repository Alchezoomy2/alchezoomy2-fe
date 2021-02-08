import React, { useContext } from 'react';
import { useLocalObservable } from "mobx-react";

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        code: '',
        userType: localStorage.getItem('USER_TYPE') || '',
        teacherInfo: localStorage.getItem('TEACHER_INFO') || '',
        studentInfo: localStorage.getItem('STUDENT_INFO') || '',
        meetingsObj: localStorage.getItem('MEETINGSOBJ') || '',
        chatArray: localStorage.getItem('CHAT_ARRAY') || '',
        bookmarkArray: localStorage.getItem('BOOKMARK_ARRAY') || '',
        transcriptArray: localStorage.getItem('TRANSCRIPT_ARRAY' || ''),
        favoriteArray: localStorage.getItem('FAVORITE_ARRAY') || [],
        meetingDetails: localStorage.getItem('MEETING_DETAILS' || ''),
        loading: localStorage.getItem('LOADING' || true),
        videoTimestamp: 0,

        changeCode: newCode => {
            store.code = newCode;
        },

        changeUserType: newUserType => {
            store.UserType = newUserType;
            localStorage.setItem('USER_TYPE', newUserType)
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

        changeFavoriteArray: newFavoriteArray => {
            store.favoriteArray = newFavoriteArray;
            localStorage.setItem('FAVORITE_ARRAY', newFavoriteArray)
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