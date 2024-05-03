// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('zuri');

// Create a new document in the collection.
db.getCollection('usercredentials').insertOne({
    "name": "Ivy Stacy",
    "email": "ivystacyn@gmail.com",
    "password": "PASSWORD123"
});
