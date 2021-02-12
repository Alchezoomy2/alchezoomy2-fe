import React from 'react';
import { useStateStore } from './StoreProvider';
import { Container, Typography } from '@material-ui/core';


export const TeacherCreator = () => {
    const [teacherInfo, setTeacherInfo] = useState();
    const store = useStateStore()

    useEffect(() => {
        setTeacherInfo(store.teacherInfo)
    }, [])
    return (
        <Container>
            <Paper elevation={3} >
                <Typography>
                    {`WELCOME TO ALCHEMZOOMY ${teacherInfo.user_name}!`}
                </Typography>
            </Paper>
        </Container>
    )
}


