import React, { useContext } from "react";
import { useLocalObservable } from "mobx-react";
import PropTypes from "prop-types";


const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const store = useLocalObservable(() => ({
        loggedIn: localStorage.getItem("LOGGED_IN") || false,
        JWT: localStorage.getItem("JWT") || "",
        code: localStorage.getItem("CODE") || "",
        userType: localStorage.getItem("USER_TYPE") || "",
        adminInfo: JSON.parse(localStorage.getItem("ADMIN_INFO")) || "",
        teacherInfo: JSON.parse(localStorage.getItem("TEACHER_INFO")) || "",
        studentInfo: JSON.parse(localStorage.getItem("STUDENT_INFO")) || "",
        meetingsObj: JSON.parse(localStorage.getItem("MEETINGSOBJ")) || "",
        chatArray: JSON.parse(localStorage.getItem("CHAT_ARRAY")) || "",
        bookmarkArray: JSON.parse(localStorage.getItem("BOOKMARK_ARRAY")) || "",
        transcriptArray: JSON.parse(localStorage.getItem("TRANSCRIPT_ARRAY")) || "",
        favoriteArray: JSON.parse(localStorage.getItem("FAVORITE_ARRAY")) || [],
        meetingDetails: localStorage.getItem("MEETING_DETAILS" || ""),
        // loading: localStorage.getItem("LOADING" || true),
        videoTimestamp: 0,

        changeLoggedIn: () => {
            store.loggedIn = true;
            localStorage.setItem("LOGGED_IN", true);
        },
        changeLoggedOut: () => {
            store.loggedOut = false;
            localStorage.setItem("LOGGED_IN", false);
        },
        changeCode: newCode => {
            store.code = newCode;
            localStorage.setItem("CODE", newCode);
        },

        changeUserType: newUserType => {
            store.UserType = newUserType;
            localStorage.setItem("USER_TYPE", newUserType);
        },

        changeAdminInfo: newAdminInfo => {
            store.AdminInfo = newAdminInfo;
            localStorage.setItem("ADMIN_INFO", JSON.stringify(newAdminInfo));
        },

        changeTeacherInfo: newTeacherInfo => {
            store.teacherInfo = newTeacherInfo;
            localStorage.setItem("TEACHER_INFO", JSON.stringify(newTeacherInfo));
        },

        changeStudentInfo: newStudentInfo => {
            store.studentInfo = newStudentInfo;
            localStorage.setItem("STUDENT_INFO", JSON.stringify(newStudentInfo));
        },

        changeMeetingsObj: newMeetingsObj => {
            store.meetingsObj = newMeetingsObj;
            localStorage.setItem("MEETINGSOBJ", JSON.stringify(newMeetingsObj));
        },

        changeChatArray: newChatArray => {
            store.chatArray = newChatArray;
            localStorage.setItem("CHAT_ARRAY", JSON.stringify(newChatArray));
        },

        changeTranscriptArray: newTranscriptArray => {
            store.transcriptArray = newTranscriptArray;
            localStorage.setItem("TRANSCRIPT_ARRAY", JSON.stringify(newTranscriptArray));
        },

        changeFavoriteArray: newFavoriteArray => {
            store.favoriteArray = newFavoriteArray;
            localStorage.setItem("FAVORITE_ARRAY", JSON.stringify(newFavoriteArray));
        },

        changeMeetingDetails: newMeetingsDetails => {
            store.meetingDetails = newMeetingsDetails;
            localStorage.setItem("MEETING_DETAILS", JSON.stringify(newMeetingsDetails));
        },

        changeVideoTimestamp: newTimestamp => {
            store.videoTimestamp = newTimestamp;
        },

        changeBookmarkArray: newBookmarkArray => {
            store.bookmarkArray = newBookmarkArray;
            localStorage.setItem("BOOKMARK_ARRAY", JSON.stringify(newBookmarkArray));
        },

        changeJWT: newJWT => {
            store.JWT = newJWT;
            localStorage.setItem("JWT", newJWT);
        }


    }));
    return (
        <StoreContext.Provider
            value={store}> {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.element
};

export const useStateStore = () => useContext(StoreContext);
