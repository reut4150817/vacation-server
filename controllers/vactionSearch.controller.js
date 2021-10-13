const service = require('../service/vactionSearch.service')
const Manager = require('../models/Manager')
const User = require('../models/User')
const path = require("path");

//שמירת משתמש חדש במסד הנתונים
const saveNewUser = async (req, res, next) => {
    try {
        console.log("save user");
        let user = await service.saveNewUser(req.body)
        console.log("user", user);
        // res.status(200).json(user)
    }
    catch (err) {
        console.log("bbbbbbbbbbb");
        res.status(400).send(err.message)
    }
}

//שמירת בעל מנוי חדש במסד הנתונים
const saveNewSubscriber = async (req, res, next) => {
    try {
        console.log("save Subscriber");
        let subscriber = await service.saveNewSubscriber(req.body)
        res.status(200).json(subscriber)
    }
    catch (err) {
        console.log("bbbbbbbbbbb");
        res.status(400).send(err.message)
    }
}

//שמירת מנהל חדש במסד הנתונים
const saveNewManager = async (req, res, next) => {
    try {
        console.log("save NewManager");
        let manager = await service.saveNewManager(req.body)
        res.status(200).json(manager)
    }
    catch (err) {
        console.log("bbbbbbbbbbb");
        res.status(400).send(err.message)
    }
}

const uploadImage = async (req, res, next) => {
    try {
        console.log(req);
        console.log("uploadImageeeeeee");

        let file = req.files.file;
        console.log("file" + file);
        const newpath = path.join(
            __dirname,
            "../assets",
            req.files.file.name)

        file.mv(newpath)
        res.status(200).json({ messages: 'the file was uploaded successfully', linkImage: `http://localhost:${process.env.port}/assets/${req.files.file.name}` })
    }
    catch (err) {
        console.log("bbbbbbbbbbb");
        res.status(400).send(err.message)
    }
}

//  שמירת דירה חדשה בדירות חדשות שמחכות לאישור המנהל
const saveNewItem = async (req, res, next) => {
    try {
        console.log("save Apartment");


        let apartment = await service.saveNewItem(req.body)
        res.status(200).json(apartment)
    }
    catch (err) {
        console.log("xxxxxxx");
        res.status(400).send(err.message)
    }
}

//בעת שהמנהל לוחץ על אישור הוספת דירה 
const additionToApartments = async (req, res, next) => {
    try {
        console.log("save Apartment");
        // שמירת דירה במאגר הדירות לאחר שהמנהל מאשר
        await service.saveItem(req.body)
        // מחיקת דירה מהדירות החדשות
        let deleteApartment = await service.deleteApartment(req.body)

        let apartment = await service.getAllApartmentNew(req.body)
        // שמירת דירה שהתוספה למאגר הדירות לאחר שקיבלה אישור מהמנהל להודעות המנוי
        await service.addToMessages(req.body)
        res.status(200).json(apartment)
    }
    catch (err) {
        console.log("xxxxxxx");
        res.status(400).send(err.message)
    }
}


const additionToSubscribers = async (req, res, next) => {
    try {
        console.log("save subscriber");
        //  שמירת בעל מנוי חדש במסד נתונים לאחר שהמנהל אישר את הצטרפותו ושליחת מייל לבעל המנוי
        await service.saveSubscriber(req.body)
        // מחיקת מנוי מהמנויים שמחכים לאישור
        let deleteSubscriber = await service.deleteSubscriber(req.body)
        console.log(deleteSubscriber + "xxxxxxx");
        console.log("get all apartmentNew");
        const allSubscriberNew = await service.getAllSubscriberNew()
        // await service.sendEmail(req.body)
        res.status(200).json(allSubscriberNew)
    }
    catch (err) {
        console.log(err + "xxxxxxx");
        res.status(400).send(err.message)
    }
}



const getAllArea = async (req, res, next) => {
    try {
        console.log("get all area");
        const allArea = await service.getAllArea()
        return res.status(200).json(allArea)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

//בעת לחיצה על התחבר בודק אם קיים כזה בעל מנוי
const connectS = async (req, res, next) => {
    try {
        console.log("connacteddd ");
        const name = req.params.name;
        const password = req.params.password;
        const data = await service.connectS(name, password)
        return res.status(200).json(data)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//בעת לחיצה על התחבר בודק אם קיים כזה משתמש 
const connectU = async (req, res, next) => {
    try {
        console.log("connacteddd ");
        const name = req.params.name;
        const password = req.params.password;
        const data = await service.connectU(name, password)
        return res.status(200).json(data)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//בעת לחיצה על התחבר בודק אם קיים כזה מנהל
const connectM = async (req, res, next) => {
    try {
        console.log("connacteddd ");
        const name = req.params.name;
        const password = req.params.password;
        const data = await service.connectM(name, password)
        return res.status(200).json(data)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


// שליפת הודעות על דירות שהתוספו לפי שם וסיסמת מנוי
const getAllMessage = async (req, res, next) => {
    try {
        console.log("get all messages");
        const username = req.params.name;
        const userpassword = req.params.password;
        const userMessage = await service.getAllMessage(username, userpassword)
        return res.status(200).json(userMessage)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


// שליפת דירות של בעל מנוי לפי שם וסיסמת מנוי
const getAllUserApartment = async (req, res, next) => {
    try {
        console.log("get all apartment");
        const username = req.params.name;
        const userpassword = req.params.password;
        const userApartment = await service.getAllUserApartment(username, userpassword)
        return res.status(200).json(userApartment)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//שליפת כל הדירות לפי אזור מסוים    
const getAllApartmentArea = async (req, res, next) => {
    try {
        console.log("get all apartment area");
        const apartmentArea = req.params.area;
        const allApartmentArea = await service.getAllApartmentArea(apartmentArea)
        return res.status(200).json(allApartmentArea)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//שליפת כל הדירות החדשות שעדין לא קיבלו אישור
const getAllApartmentNew = async (req, res, next) => {
    try {
        console.log("get all apartmentNew");
        const userApartmentNew = await service.getAllApartmentNew()
        return res.status(200).json(userApartmentNew)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//שליפת כל המנויים החדשים שעדין לא קיבלו אישור
const getAllSubscriberNew = async (req, res, next) => {
    try {
        console.log("get all apartmentNew");
        const allSubscriberNew = await service.getAllSubscriberNew()
        return res.status(200).json(allSubscriberNew)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

// שליפת כל הדירות שבמאגר
const getAllApartment = async (req, res, next) => {
    try {
        console.log("get all apartment");
        const allApartment = await service.getAllApartment()
        return res.status(200).json(allApartment)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


// שליפת כל הדירות שאהבתי לפי שם משתמש וסיסמא
const getAllApartmentsLiked = async (req, res, next) => {
    try {
        console.log("get all apartment");
        const name = req.params.name;
        const password = req.params.password;
        const ApartmentLiked = await service.getAllApartmentsLiked(name, password)
        return res.status(200).json(ApartmentLiked)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


//שליפת כל המנהלים
const getManager = async (req, res, next) => {
    try {
        console.log("get all manager");
        const allManager = await service.getManager()
        return res.status(200).json(allManager)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


// מחיקת הודעה כאשר בעל מנוי צפה בה
const deleteMessage = async (req, res, next) => {
    try {
        console.log("delete Message");
        let name = req.params.name
        let password = req.params.password
        // מחיקת הודעה כאשר בעל מנוי צפה בה
        let deleteMessage = await service.deleteMessage(name, password, req.body)
        res.status(200).json(deleteMessage)
    }
    catch (err) {
        console.log("רררררר");
        res.status(400).send(err.message)
    }
}


//  שמירת דירה שאהבתי בדירות שאהבתי
const saveNewItemLiked = async (req, res, next) => {
    try {
        let apartment = await service.saveNewItemLiked(req.body)
        res.status(200).json(apartment)
    }
    catch (err) {
        console.log("xxxxxxx");
        res.status(400).send(err.message)
    }
}

const sendEmail = async (req, res, next) => {
    try {
        console.log("  send email");
        const email = await service.sendEmail(req.body)
        return res.status(200).json(email)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}
module.exports = {
    saveNewUser,
    saveNewSubscriber,
    saveNewManager,
    saveNewItem,
    additionToApartments,
    getAllArea,
    connectS,
    getAllUserApartment,
    getAllApartmentArea,
    getAllMessage,
    getAllApartmentNew,
    getAllSubscriberNew,
    additionToSubscribers,
    getAllApartment,
    getAllApartmentsLiked,
    connectU,
    connectM,
    getManager,
    deleteMessage,
    saveNewItemLiked,
    sendEmail,
    uploadImage
}


// const updateForm = async (req, res, next) => {
//     try {
//         console.log('update form');
//         await service.updateForm(req.params.formName, req.body)
//         res.status(200).send('the form is update')
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(400).send(err.message)
//     }
// }