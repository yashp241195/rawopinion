const {
    MessageModel
} = require('./../graphql/models/match')

const UserModel = require('./../graphql/models/user')
const { faker } = require('@faker-js/faker');

const mongoose = require('mongoose');

const LOCALMONGOURI = 'mongodb://127.0.0.1/opinion-db'
const uri = LOCALMONGOURI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(connect => console.log('connected to mongodb..'))
.catch(e => console.log('could not connect to mongodb', e));


/*
  Testing Scenerios

  1. Test the recommendations
  2. Test the messages

*/ 

/*
async function generateFakeMessages() {
    
    const u1 = "8a71105bd76e07b84f07a336bc4785a2ee5da7d9dbc9e65e2a4343f01a2b5225"
    const u2 = "8a71105bd76e07b84f07a336bc4785a2ee5da7d9dbc9e65e2a4343f01a2b5226"
    
    for (let i = 0; i < 50; i++) { 
      
        // Generate 50 fake messages
        
        const s1 = (i%2 == 0)?u1:u2
        const s2 = (i%2 == 0)?u2:u1

        const fakeMessage = new MessageModel({
            sender: s1,  
            receiver: s2 , 
            content: {
              image: null,  // Generates a random image URL using the updated function
              sticker: null,  // Generates a random avatar image URL as a sticker
              message: faker.lorem.sentence(),  // Generates a random message text
            },
            timestamp: faker.date.recent(),  // Generates a recent timestamp
          });

          await fakeMessage.save();  // Save the generated message to MongoDB
            // console.log(`Fake message ${i + 1} created:`, fakeMessage);
    }
  
    mongoose.disconnect();  

}
*/


async function generateFakeUsers(){

  for(let i = 0; i < 10; i++){
    // don't forget to comment userschema.pre()
    const username = "8a71105bd76e07b84f07a336bc4785a2ee5da7d9dbc9e65e2a4343f01a2b52" + (26 + i).toString();
    
    const firstName = faker.person.firstName('female');
    const lastName = faker.person.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i+1}@example.com`;

    const newUser = {
      profileInfo: {
        gender: "FEMALE",
        orientation: "STRAIGHT",
        firstname: firstName,
        lastname: lastName,
        bio: faker.lorem.sentence(),
        openfor: faker.helpers.arrayElement(['FRIENDSHIP', 'DATING']),
        dateofbirth: "1995-11-23T18:30:00.000Z",
        imageGallery: [
          {
            "imgid": 1,
            "url": "https://res.cloudinary.com/dcejlvxxx/image/upload/fl_preserve_transparency/v1725482237/apps/zrv3hq4myqin805acfyx.jpg",
            "icon_url": "https://res.cloudinary.com/dcejlvxxx/image/upload/v1725482238/apps/nbiyz7egjlgybqy82nul.jpg",
            "identifiedAs": "neutral",
            "filter": "Lark",
            "isProfileSafe": true,
            "isSafe": true,
            "porn": 3.780677957365697e-7,
            "drawing": 0.0000462526259070728,
            "sexy": 0.00001800322388589848,
            "hentai": 0.0000026078621431224747,
            "neutral": 0.9999327659606934,
          },
        ],
      },
      preferences: {
        genderpreference: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      },
      googleAuthId: "110583511897533383187",
      hasEssential: true,
      isBanned: false,
      isDeactivated: false,
      username: username,
      email: email,
      isEmailVerified: true,
      password: "$2b$10$ACMBS9mxvJQkK7K40U3KoOPoSFcBopArIqJ6vEx3jM9eksNcR4Xd.",
  

    }

    // console.log("newUser",newUser)
    const vv = new UserModel(newUser);
    await vv.save();
  }

  mongoose.disconnect();  


}

generateFakeUsers();
// generateFakeMessages();

