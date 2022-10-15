# Set Up MonogDB
MongoDB is going to be our primary database for all the data from project management application

## 1. Create Account
Login to [MongoDB](https://www.mongodb.com) and create a free account.

## 2. Provision a Atlas Database
 - Create a Organization in your MongoDB account
 - Create a Project with within your organization
 - Provision a free MongoDB atlas cluster
 - Creata a datase user
 - Allow database access to everywhere
 - Copy the database connection string

## 3. Database connection Connection
Copy the database connection string update your credentials within it
```console
mongodb+srv://<username>:<password>@<ClusterName>.********.mongodb.net/?retryWrites=true&w=majority
```

## 4. Paste the URL in your .env file
```console
DATABASE_URL = mongodb+srv://<username>:<password>@<clusterName>.********.mongodb.net/<Name of your Database>?retryWrites=true&w=majority
```