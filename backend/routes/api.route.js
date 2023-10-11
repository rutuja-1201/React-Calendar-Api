const router = require('express').Router();
const { google } = require('googleapis');
const GOOLE_CLIENT_ID = '343285813766-5u6dnmh3br081tt13av65qb0g1qnr5a1.apps.googleusercontent.com';
const GOOLE_CLIENT_SECRET = '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';

const oauth2client =new google.aut.OAuth2(
GOOLE_CLIENT_ID,
GOOLE_CLIENT_SECRET,
'http://localhost:3000'
)


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});


router.post('/create-tokens',async(req,res,next)=>{
  try{
    const {code} =req.body
    const  { tokens } = await oauth2client.getToken(code)

    res.send(tokens)

  }
  catch(err){
    next(err);
  }
})

router.post('/create-event',async(req,res,next)=>{
  try{
    const {summary ,description ,location,startDateTime,endDateTime} =req.body

    const calendar =google.calendar('v3')
    const response =await calendar.events.insert({
      auth :oauth2client,
      calendarId :'primary' ,
      requestBody :{
        summary :summary,
        description:description,
        location :location,
        colorId:'6 ',
        start:{
          dateTime:new Date(startDateTime)
        },
        end:{
          dateTime :new Date(endDateTime)
        }

      }
    })
  }
  catch(err){
    next(err);
  }
})
module.exports = router;
