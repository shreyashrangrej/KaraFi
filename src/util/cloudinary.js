const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadToCloudinary = (path, folder) => {
    return cloudinary.v2.uploader.upload(path, {
        folder
    }).then((data) => {
        return { url: data.url, public_Id: data.public_Id };
    }).catch((error) => {
        console.log(error)
    })
}

const removeFromCloudinary = async (publicId) => {
    await cloudinary.v2.uploader.destroy(publicId, function (error, result) {
        console.log(result, error)
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary };