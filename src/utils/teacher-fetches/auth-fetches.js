import request from "superagent";
const serverUrl = process.env.REACT_APP_SERVER_URL;


export async function teacherAuth(code) {

    // let stream = fs.createWriteStream("teacherLog.text", { flags: "a" });
    // stream.write("****//// code ////****\n");
    // stream.write(new Date().toISOString() + "\n");
    // stream.write(code + "\n");
    // stream.write("\n\n\n");
    // stream.end();

    const response = await request
        .post(serverUrl + "/teacher/oauth")
        .send({ code })
        .withCredentials();

    return response.body;
}

export async function createTeacher(teacherInfo) {
    const response = await request
        .post(serverUrl + "/teacher/new")
        .send({ teacherInfo })
        .withCredentials();

    return response.body;
}

