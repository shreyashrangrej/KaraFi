const cloudinary = require('cloudinary')
cloudinary.confg({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

uploadToCloudinary = (path, folder) => {
    return cloudinary.v2.uploader.upload(path, {
        folder
    }).then((data) => {
        return { url: data.url, publicId: data.publicId };
    }).catch((error) => {
        console.log(error)
    })
}

removeFromCloudinary = async (publicId) => {
    await cloudinary.v2.uploader.destroy(publicId, function (error, result) {
        console.log(result, error)
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary };