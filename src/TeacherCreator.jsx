import React, { useState } from 'react';
import { useStateStore } from './StoreProvider';
import { Container, Typography, Paper, Avatar, Card, CardContent } from '@material-ui/core';
import { ColorPicker } from "material-ui-color";

export const TeacherCreator = () => {
    const store = useStateStore()
    const [selectedColor, setSelectedColor] = useState('#FFFFFF')
    const [teacherInfo, setTeacherInfo] = useState(store.teacherInfo);

    return (
        <Container>
            <Paper elevation={3} >
                <Typography>
                    {`WELCOME TO ALCHEMZOOMY ${teacherInfo.user_name}!`}
                </Typography>
                <Typography>
                    This appears to be your first visit!  You'll need to create an account to continue.  Is this you?
                </Typography>
                <Card style={{ height: '800px' }}>
                    <CardContent>
                        <Avatar alt={teacherInfo.user_name} src={teacherInfo.pic_url} />
                        <Typography>
                            {`Name: ${teacherInfo.user_name}`}
                        </Typography>
                        <Typography>
                            {`Email: ${teacherInfo.email}`}
                        </Typography>
                        <Typography style={{ backgroundColor: selectedColor }}>
                            Post Color:
                            <ColorPicker
                                name='color'
                                value={selectedColor}
                                onChange={color => {
                                    setSelectedColor(color)
                                }}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    )
}


