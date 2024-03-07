import User from '../../respository/user.js'
import bcrypt from 'bcrypt'
import validator from "validator"

class HelperUser {

    constructor(){
    
        this.user_repository = new User()
    }


    async PasswordCreation(password){

        if(password) {

            return await bcrypt.hash(password, 10)

        }
    }

    async ValidEmailAndPassword(email, password){
        let data = new Object()

        if(password){

            const passwordIsnotValid = password.length

            if(passwordIsnotValid < 6){

                data.sucess = false
                data.message = "Password too short! It must contain at least 6 characters."
                return  data  
            }
        }
        if(email){

            const emailIsValid = validator.isEmail(email)

            if (!emailIsValid){

                data.sucess = false
                data.message = "Invalid e-mail. Please provid a valid one."
                return  data  
            }

        }
    }

    async IsIdValid(userId){

        let data = new Object()
        const isIdValid  = await validator.isUUID(userId)
                
        if(!isIdValid){

            data.sucess = false
            data.message = "Invalid user ID."
            return data
        } 
    }

    async AmountIsValid(amount){

        const amountIsValid = validator.isCurrency(amount.toString(), 
        {
            digits_after_decimal: [2],
            allow_negatives: false,
            decimal_separator: '.', 
        })

        if(!amountIsValid){

            data.sucess = false
            data.message = "Invalid user ID."
            return data
        } 

        return amountIsValid
    }
}

export default HelperUser
