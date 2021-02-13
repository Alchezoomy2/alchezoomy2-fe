import React, { useState, useEffect } from 'react';
import { useStateStore } from './StoreProvider';
import { Container, Typography, Paper, Avatar, Card, CardContent } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker'

export const TeacherCreator = () => {
    const store = useStateStore()
    const [selectedColor, setSelectedColor] = useState('#FFFFFF')
    const [textColor, setTextColor] = useState('#000000')
    const [teacherInfo, setTeacherInfo] = useState(store.teacherInfo);

    useEffect(() => {

        function invertColor(hex) {
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            // convert 3-digit hex to 6-digits.
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) {
                throw new Error('Invalid HEX color.');
            }
            // invert color components
            var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
            // pad each with zeros and return
            return '#' + padZero(r) + padZero(g) + padZero(b);
        }

        console.log(selectedColor)
        setTextColor(invertColor(selectedColor))

    }, [selectedColor])



    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    return (
        <Container>
            <Paper elevation={3} >
                <Typography>
                    {`WELCOME TO ALCHEMZOOMY ${teacherInfo.user_name}!`}
                </Typography>
                <Typography>
                    This appears to be your first visit!  You'll need to create an account to continue.  Is this you?
                </Typography>
                <Card style={{ height: '800px', backgroundColor: selectedColor, color: textColor }}>
                    <CardContent>
                        <Avatar alt={teacherInfo.user_name} src={teacherInfo.pic_url} />
                        <Typography>
                            {`Name: ${teacherInfo.user_name}`}
                        </Typography>
                        <Typography>
                            {`Email: ${teacherInfo.email}`}
                        </Typography>
                        <Typography>
                            Post Color:
                            <ColorPicker
                                name='color'
                                defaultValue={selectedColor}
                                // value={this.state.color} - for controlled component
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


