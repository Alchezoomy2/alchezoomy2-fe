require('dotenv').config();
require('./lib/client').connect();

const app = require('./server/app.js');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on ${PORT}`);
});
