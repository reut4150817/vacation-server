saveObject = (doc) => {
    return new Promise(async (resolve, reject) => {
        try {
            const savedDoc = await doc.save()
            resolve(savedDoc)
        }
        catch (err) {
            reject(err)
        }
    })
}


findObject = (Model, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findOne(filter)
            resolve(doc)
        } catch (err) {
            reject(err)
        }
    })
}

// deleteApartment = (Model, filter) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const doc = await Model.delete(filter)
//             resolve(doc)
//         } catch (err) {
//             reject(err)
//         }
//     })
// }
findObjectAll = (Model) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.find()
            resolve(doc)
        } catch (err) {
            reject(err)
        }
    })
}

createObject = (Model, data) => {
    return new Promise(async (resolve, reject) => {
        // const savedDoc = await doc.save()
        Model.create(data, function (err, savedDoc) {
            if (err) return reject(err);
            resolve(savedDoc);
        });
    })
}


findObjectAndUpdate = (Model, filterArr) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findOneAndUpdate(...filterArr)
            resolve(doc)
        } catch (err) {
            reject(err)
        }
    })
}


findObjectByIdAndUpdate = (Model, id, optionsArr) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findByIdAndUpdate(id, ...optionsArr)
            resolve(doc)
        } catch (err) {
            reject(err)
        }
    })
}


countDoc = (Model) => {
    return new Promise(async (resolve, reject) => {
        Model.countDocuments({}, (err, count) => {
            if (err) {
                reject(err)
            }
            resolve(count)
        })
    })
}

initObj = (Model, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(Model)
            let obj = new Model(data)
            console.log(obj)
            resolve(obj)
        } catch (err) {
            reject(err)
        }
    })
}

findObjectByIdAndDelete = (Model, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findByIdAndDelete(id)
            resolve(doc)
        } catch (err) { }
    })
}

findObjectById = (Model, objectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findById(objectId)
            resolve(doc)
        } catch (err) { }
    })
}
pushObject = (doc, val) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(doc)
            const newDoc = await doc.push(val)
            resolve(newDoc)
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}
getAllUserApartment = (Model, user, password) => {
    return new Promise((resolve, reject) => {
        // console.log("username", userName)
        Model.find({ nameUser: user, passwordUser: password }, (err, apartments) => {
            if (err) {
                reject(err)
            }
            resolve(apartments)
        })
    })

}

getAllApartmentArea = (Model, area) => {
    return new Promise((resolve, reject) => {
        // console.log("username", userName)
        Model.find({ area: area }, (err, apartments) => {
            if (err) {
                reject(err)
            }
            resolve(apartments)
        })
    })

}


getAllApartmentsLiked = (Model, user, password) => {
    return new Promise((resolve, reject) => {
        // console.log("username", userName)
        Model.find({ nameCurrentUser: user, passwordCurrentUser: password }, (err, apartments) => {
            if (err) {
                reject(err)
            }
            resolve(apartments)
        })
    })

}
getFormsOfUser = (Model, user) => {
    return new Promise((resolve, reject) => {
        // console.log("username", userName)
        Model.find({ user: user }, (err, forms) => {
            if (err) {
                reject(err)
            }
            resolve(forms)
        })
    })

}


module.exports = {
    saveObject,
    findObject,
    findObjectAndUpdate,
    findObjectByIdAndUpdate,
    findObjectByIdAndDelete,
    // deleteApartment,
    countDoc,
    initObj,
    findObjectById,
    pushObject,
    createObject,
    getFormsOfUser,
    getAllUserApartment,
    getAllApartmentArea,
    findObjectAll,
    getAllApartmentsLiked

}