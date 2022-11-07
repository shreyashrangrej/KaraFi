# User Details - Schema Overview

| Field | Description | Type | Creatable |
| --- | --- | --- | :-: |
| `_id` | An auto generated MongoDB document ID | object | :heavy_check_mark:
| `firstName` | First Name of the user/member in the application | string
| `lastName` | Last Name of the user/member in the application | string
| `email` | User's email address | string
| `gender` | Users Gender | string
| `dateOfBirth` | Users Date of Birth | date
| `phoneNumber` | Phone number of a user | string
| `jobTitle` | Job Title of a User | string
| `nationality` | User's nationality | string
| `birthPlace` | User's birth Place | string
| `address` | User's Address | Relation Ref: address
| `createdProject` | User created projects | Relation Ref: project
| `ownerOfProject` | Project that user is assigned to | Relation Ref: project
| `publicId` | Public ID of user image stored in cloudinary | string
| `imageUrl` | Image URL of the user's image stored in cloudinary | url
| `createdAt` | Time stamp of document creation | Datetime
| `updatedAt` | Time stamp of document updation | Datetime