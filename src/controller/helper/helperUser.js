import CustomError  from '../../util/Error.js'
import User from '../../respository/user.js'
import bcrypt from 'bcrypt'
import validator from "validator"

class HelperUser {

    constructor(){
        
        this.user_repository = new User()
    }

    async CheckEmailExists(email, retorno) {

        if(email) {

            retorno = await this.user_repository.GetUserByEmail(email)
        }
        if (retorno) {

            throw new CustomError(`The ${email} e-mail is already in use`, "email already registered")
        }
    }

    async PasswordCreation(password){

        if(password) {

            return await bcrypt.hash(password, 10)

        }
    }

    async ValidEmailAndPassword(email, password){

        if(password){

            const passwordIsnotValid = password.length

            if(passwordIsnotValid < 6){

                throw new CustomError("Password too short! It must contain at least 6 characters.")
             
            }
        }
        if(email){

            const emailIsValid = validator.isEmail(email)

            if (!emailIsValid){
                
                throw new CustomError("Invalid e-mail. Please provid a valid one.")
            }

        }
    }

    async IsIdValid(userId){

        const isIdValid  = await validator.isUUID(userId)
                
        if(!isIdValid){

            throw new CustomError("Invalid user ID.")
        } 
    }
}

export default HelperUser
