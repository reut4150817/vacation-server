////knowMe
// const fileUpload = require("express-fileupload");
// const socket =require('./controller/socket')
// const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
// const routeProtectedApi = require('./routes/api/protected');
// const routePublicApi = require('./routes/api/public');
// const routeToViews = require('./routes/view/views');
// app.use(cookieParser())
// app.use(fileUpload({ createParentPath: true }));


const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const request = require("request");
const router = require('./routes/api');
const routerView = require('./routes/views');
const path = require("path");

const fileUpload = require("express-fileupload");
// const User = require("./models/User");
// const auth = require('./controllers/auth')

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());


app.use("/assets", express.static(path.join(__dirname, "/assets")))
app.use(fileUpload({ createParentPath: true }))

app.use(bodyParser.urlencoded({
    extended: true
}));

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect('mongodb://localhost:27017/VactionSearch', connectionParams)
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.log("erroe", `error connecting ${err}`)
    })




// app.use('/:userName/isPermission', auth.checkPermission, async (req, res) => {
//   let currentUser = await User.findOne({ username: req.params.userName })
//   console.log("currentUser", currentUser)
//   if (!currentUser) {
//     let newUser = new User();
//     const jwt = req.cookies && req.cookies.devJwt ? req.cookies.devJwt : req.headers['authorization'] ? req.headers['authorization'] : null
//     const cookie = request.cookie(`jwt=${jwt}`)
//     const options = {
//       method: "GET",
//       url: `https://dev.accounts.codes/api/${req.params.userName}`,
//       headers: { Cookie: cookie }
//     };
//     request(options, async (error, response, body) => {
//       console.log("response.statusCode", response.statusCode)
//       if (error || response.statusCode != 200) {
//         return res.status(401).json({ status: 401 })
//       }
//       else {
//         console.log("userName", req.params.userName)
//         newUser.username = req.params.userName;
//         newUser.email = JSON.parse(body).user.email
//         await newUser.save();
//         res.status(200).send();
//       }
//     });
//   }
//   res.status(200).send();
// });

app.use('/api', router)
app.use('/', routerView)


app.listen(process
    .env.PORT, (err) => {
        console.log("listen" + process
            .env.PORT);
    });








////////knowMe
// app.all("/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });