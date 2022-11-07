# User Details - Schema Overview

| Field | Description | Type | Creatable | Required | Unique | Min Length | Max Length
| :-: | --- | --- | :-: | :-: | :-: | :-: | :-: |
| `_id` | An auto generated MongoDB document ID | object | :x: | :x: | :white_check_mark: | `auto` | `auto`
| `firstName` | First Name of the user/member in the application | string | :white_check_mark: | :white_check_mark: | :x: | `1` | `32`
| `lastName` | Last Name of the user/member in the application | string | :white_check_mark: | :white_check_mark: | :x: | `1` | `32`
| `email` | User's email address | string | :white_check_mark: | :white_check_mark: | :white_check_mark: | `auto` | `auto`
| `gender` | Users Gender | string | :white_check_mark: | :white_check_mark: | :x: 
| `dateOfBirth` | Users Date of Birth | date | :white_check_mark: | :white_check_mark: | :x:
| `phoneNumber` | Phone number of a user | string | :white_check_mark: | :white_check_mark: | :white_check_mark:
| `jobTitle` | Job Title of a User | string | :white_check_mark: | :white_check_mark: | :x:
| `nationality` | User's nationality | string | :white_check_mark: | :x: | :x:
| `birthPlace` | User's birth Place | string | :white_check_mark: | :x: | :x:
| `address` | User's Address | Relation Ref: address | :white_check_mark: | :x: | :white_check_mark:
| `createdProject` | User created projects | Relation Ref: project | :white_check_mark: | :x: | :white_check_mark:
| `ownerOfProject` | Project that user is assigned to | Relation Ref: project | :white_check_mark: | :x: | :x:
| `publicId` | Public ID of user image stored in cloudinary | string | :x: | :x: | :white_check_mark:
| `imageUrl` | Image URL of the user's image stored in cloudinary | url | :x: | :x: | :white_check_mark:
| `createdAt` | Time stamp of document creation | Datetime | :x: | :x: | :x:
| `updatedAt` | Time stamp of document updation | Datetime | :x: | :x: | :x: