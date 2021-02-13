import React, { useEffect, useState } from 'react';
import { useStateStore } from './StoreProvider';
import { Container, Typography, Paper, Avatar } from '@material-ui/core';


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
                <Typography>
                    This appears to be your first visit!  You'll need to create an account to continue.  Is this you?
                </Typography>
                <Card>
                    <CardContent>
                        <Avatar alt={teacherInfo.user_name} src={pic_url} />
                        <Typography>
                            {`Name: ${teacherInfo.user_name}`}
                        </Typography>
                        <Typography>
                            {`Email: ${teacherInfo.email}`}
                        </Typography>
                        <Typography>
                            {`Post Color: ${teacherInfo.color}`}

                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    )
}


