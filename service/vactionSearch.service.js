const User = require('../models/User')
const Subscriber = require('../models/Subscriber')
const repository = require('../repository/repository')
const Details = require('../models/Details')
const Apartment = require('../models/Apartment')
const Manager = require('../models/Manager')
const nodemailer = require("nodemailer");
const NewApartment = require('../models/NewApartment')
const ApartmentAdd = require('../models/ApartmentAdd')
const ApartmentsLiked = require('../models/ApartmentsLiked')
const NewSubscriber = require('../models/NewSubscriber')

//שמירת משתמש חדש במסד הנתונים
saveNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let currentUser = await repository.findObject(User, { "username": userName })
            // console.log(currentUser)
            // const form = data
            let newUser = new User(
                data
            )
            await repository.saveObject(newUser)
            // newForm.save();
            // await repository.findObjectAndUpdate(User, [{ _id: currentUser._id }, { $push: { forms: newForm } }, { new: true }])
            resolve(newUser)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


//שמירת בעל מנוי חדש במסד הנתונים
saveNewSubscriber = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newSubscriber = new NewSubscriber(
                data
            )
            await repository.saveObject(newSubscriber)
            resolve(newSubscriber)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


//שמירת מנהל חדש במסד הנתונים
saveNewManager = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newManager = new Manager(data)
            await repository.saveObject(newManager)
            resolve(newManager)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


// שמירת דירה שהתוספה למאגר הדירות לאחר שקיבלה אישור מהמנהל להודעות המנוי
addToMessages = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newApartment = new ApartmentAdd(
                data
            )
            await repository.saveObject(newApartment)
            resolve(newApartment)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


//  שמירת דירה חדשה בדירות חדשות שמחכות לאישור המנהל
saveNewItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newApartment = new NewApartment(
                data
            )

            await repository.saveObject(newApartment)
            resolve(newApartment)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


// שמירת דירה במאגר הדירות לאחר שהמנהל מאשר
saveItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newApartment = new Apartment(
                data
            )
            await repository.saveObject(newApartment)
            resolve(newApartment)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


// שמירת בעל מנוי חדש במסד נתונים לאחר שהמנהל אישר את הצטרפותו
saveSubscriber = (data) => {
    return new Promise(async (resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'D03N08@gmail.com',
                pass: 'D03080527D'
            }
        });

        var mailOption = {
            from: 'D03N08@gmail.com',
            to: data.email,
            subject: "Hello ✔ " + data.LastName + " !", // Subject line
            html: `<h2><b> שלום רב!</b></h2>
                <h3> תודה שנרשמת לנופש באתר </h3>
                <h3> הרשמתך בתור מנוי נקלטה בהצלחה </h3>
                <h3>השם משתמש שלך הינו השם עימו נרשמת לאתר</h3>
                <h3> סיסמתך היא ${data.password}</h3>
                <h3>המשך יום טוב</h3>`,
            // text: "Hello world?", // plain text body
            // text: "<b>Hello world?</b>", // html body

            //  "Hello world הצטרפת למאגר המנויים בהצלחה?", // plain text body
            // html: "
        }

        transporter.sendMail(
            mailOption, function (error, info) {
                if (error) {
                    console.log(error + "errrrrrrrrrrrrrrror");
                }
                else {
                    console.log("email sennnnnnnnnnnnt" + info.response);
                }
            })
        try {
            let newASubscriber = new Subscriber(
                data
            )
            await repository.saveObject(newASubscriber)
            resolve(newASubscriber)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


getAllArea = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allArea = await repository.findObject(Details, { "name": 'area' })
            resolve(allArea)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}




//בעת לחיצה על התחבר בודק אם קיים כזה בעל מנוי
connectS = (name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await repository.findObject(Subscriber, { "LastName": name, "password": password })

            // var transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false,
            // service: 'gmail',
            // auth: {
            // user: manager.managers.manager.email,
            // pass: manager.managers.manager.passwordEmail
            // user: 'reut4150817@gmail.com',
            // pass: 'reutmenashe'
            // },
            // });

            // var mailOption = {
            //     // from: manager.managers.manager.email, // sender address
            //     from: 'reut4150817@gmail.com',
            //     // to: subscriberEmail, // list of receivers
            //     to: 'reut@leader.codes',
            //     subject: "Hello ✔", // Subject line
            //     text: "Hello world?", // plain text body
            // html: "<b>Hello world?</b>", // html body
            // }
            ////////////////שליחת מייל
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'D03N08@gmail.com',
                    // 'reut4150817@gmail.com'
                    pass: 'D03080527D'
                }
            });

            var mailOption = {
                // from: manager.managers.manager.email, // sender address
                from: 'D03N08@gmail.com',
                // to: subscriberEmail, // list of receivers
                to: 'reut4150817@gmail.com',
                // to: 'am0504104141@gmail.com',
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                // html: "
            }

            transporter.sendMail(
                mailOption, function (error, info) {
                    if (error) {
                        console.log(error + "errrrrrrrrrrrrrrror");
                    }
                    else {
                        console.log("email sennnnnnnnnnnnt" + info.response);
                    }
                })

            resolve(data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


//בעת לחיצה על התחבר בודק אם קיים כזה משתמש 
connectU = (name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await repository.findObject(User, { "LastName": name, "password": password })
            resolve(data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


//בעת לחיצה על התחבר בודק אם קיים כזה מנהל
connectM = (name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await repository.findObject(Manager, { "userName": name, "password": password })
            resolve(data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


// שליפת הודעות על דירות שהתוספו לפי שם וסיסמת מנוי
getAllMessage = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        console.log("userName", userName)
        try {
            let userApaartments = await repository.getAllUserApartment(ApartmentAdd, userName, password)
            resolve(userApaartments)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


// שליפת דירות של בעל מנוי לפי שם וסיסמת מנוי
getAllUserApartment = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        console.log("userName", userName)
        try {
            let userApaartments = await repository.getAllUserApartment(Apartment, userName, password)
            resolve(userApaartments)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


//שליפת כל הדירות לפי אזור מסוים    
getAllApartmentArea = (area) => {
    return new Promise(async (resolve, reject) => {
        console.log("area", area)
        try {
            let allApartmentArea = await repository.getAllApartmentArea(Apartment, area)
            resolve(allApartmentArea)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


//שליפת כל הדירות החדשות שעדין לא קיבלו אישור
getAllApartmentNew = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allApartmaentNew = await repository.findObjectAll(NewApartment)
            resolve(allApartmaentNew)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


//שליפת כל המנויים החדשים שעדין לא קיבלו אישור
getAllSubscriberNew = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allSubscriberNew = await repository.findObjectAll(NewSubscriber)
            resolve(allSubscriberNew)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


// שליפת כל הדירות שבמאגר
getAllApartment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allApartmaent = await repository.findObjectAll(Apartment)
            resolve(allApartmaent)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


// שליפת כל הדירות שאהבתי לפי שם משתמש וסיסמא
getAllApartmentsLiked = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        console.log("Name", userName)
        try {
            let ApartmentLiked = await repository.getAllApartmentsLiked(ApartmentsLiked, userName, password)
            resolve(ApartmentLiked)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


//שליפת כל המנהלים
getManager = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allManager = await repository.findObject(Manager, { "password": '12345' })
            resolve(allManager)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}


// מחיקת הודעה כאשר בעל מנוי צפה בה
deleteMessage = (name, password, apartment) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteMessage = await repository.findObjectByIdAndDelete(ApartmentAdd,

                apartment
            )
            let allMessages = await repository.getAllUserApartment(ApartmentAdd, name, password)

            resolve(allMessages)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


//  שמירת דירה שאהבתי בדירות שאהבתי
saveNewItemLiked = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newApartmentLiked = new ApartmentsLiked(
                data
            )
            await repository.saveObject(newApartmentLiked)
            resolve(newApartmentLiked)
        }
        catch (err) {
            reject(err.message)
        }
    })
}


// מחיקת דירה מהדירות החדשות
deleteApartment = (apartment) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteApartment = await repository.findObjectByIdAndDelete(NewApartment,

                apartment
            )
            resolve(deleteApartment)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}


// מחיקת מנוי מהמנויים שמחכים לאישור
deleteSubscriber = (subscriber) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleteSubscriber = await repository.findObjectByIdAndDelete(NewSubscriber,
                subscriber
            )
            resolve(deleteSubscriber)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}



sendEmail = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'D03N08@gmail.com',
                    pass: 'D03080527D'
                }
            });

            var mailOption = {
                from: 'D03N08@gmail.com',
                to: name.email,
                subject: "Hello ✔", // Subject line
                text: "Hello world הצטרפת למאגר המנויים בהצלחה?", // plain text body
            }

            transporter.sendMail(
                mailOption, function (error, info) {
                    if (error) {
                        console.log(error + "errrrrrrrrrrrrrrror");
                    }
                    else {
                        console.log("email sennnnnnnnnnnnt" + info.response);
                    }
                })

            resolve(data)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })
}



// שליפת כל הדירות שאהבתי לפי שם משתמש וסיסמא
getApartmentsCriteria = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        // console.log("Name", userName)
        try {
            let criter = req.body
            let ApartmentLiked = await repository.getApartmentsCriteria(Apartment, criter.area, criter.numBeds)
            resolve(ApartmentLiked)
        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    });
}
module.exports = {
    saveNewUser,
    saveNewSubscriber,
    saveNewManager,
    addToMessages,
    saveNewItem,
    saveItem,
    saveSubscriber,
    getAllArea,
    connectS,
    connectU,
    connectM,
    getAllMessage,
    getAllUserApartment,
    getAllApartmentArea,
    getAllApartmentNew,
    getAllSubscriberNew,
    getAllApartment,
    getAllApartmentsLiked,
    getManager,
    deleteMessage,
    saveNewItemLiked,
    deleteApartment,
    deleteSubscriber,
    sendEmail
}

// updateForm = (userName, data) => {
//     return new Promise(async (resolve, reject) => {
//         console.log("userName", userName)
//         try {
//             let updateForm = await repository.findObjectAndUpdate(Form, [{ name: userName }, { style: data.style, fields: data.fields, imgForm: data.imgForm, mailsFormSubmitions: data.mailsFormSubmitions, emailsForSendingForm: data.emailsForSendingForm },
//             { useFindAndModify: false }])
//             resolve(updateForm)
//         }
//         catch (err) {
//             console.log(err)
//             reject(err)
//         }
//     });
// }


