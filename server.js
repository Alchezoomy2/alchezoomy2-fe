
const app = require('./server/app.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on ${PORT}`);
});
