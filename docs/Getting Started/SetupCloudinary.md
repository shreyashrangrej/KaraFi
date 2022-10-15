# Set Up Cloudinary Service
Cloudinary is required to store all your image and document files from your application. We will not be using standard database to store all your files.

## 1. Create Account

Go to [Cloudinary](https://cloudinary.com) and create a free cloudinary account.

## 2. API Credentials

Navigate to cloudinary dashboard and copy the API credentials
- Cloud Name
- API KEY
- API Secret

## 3. Configure .env

```console
CLOUD_NAME = <CLOUD_NAME>
API_KEY = <API_KEY>
API_SECRET = <API_SECRET>
```