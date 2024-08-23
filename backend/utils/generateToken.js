import jwt from 'jsonwebtoken'

const generateToken =(res,userId)=>{
  
    

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d',})   
        // userID: is payload what i want to send into is payload // 'userID' field is customized, not built-in field.

       
        //SEt JWT as HTTP-Only cookie   
                        //-jwt is cookie name, token is  value stored in cookie;
                        // httpOnly ensure cookie is only accessible by teh web server and not by client-side scripts(JS)
                        // this enhance security by preventing cross-site scripting attacks from accessing the cookies
        res.cookie('jwt', token, 
            {httpOnly:true,
             secure: process.env.NODE_ENV !== 'development',
             sameSite: 'strict',   // cookie will be sent with requests originating from teh same site, which helps protect against cross-cite request forgery attack.
             maxAge: 30*24*60*60*1000 , //30 Days, 24 hours/day, 60 minutes/hour 60 secs/minutes 1000milliseconds/second
            })

            


        }

export default generateToken