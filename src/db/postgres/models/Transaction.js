import { Schema } from "mongoose"

class TransactionModel {

    constructor(typeConnection){

        this.transaction = typeConnection;
        this.TypeConnection(this.transaction)
    }

   async TypeConnection(){
    }
  
    SetTransaction(){

        const transaction = new Schema({
            
            user_id:{
                type: String,
                required: true
            },
            type_transactions:{
                type: String,
                required: true
            },
            name:{
                type:String,
                required: true
            },
            amount:{
                type: Number,
                required : true 
            },
            created_at:{
                type: Date,
                required: true
            }
            
        })

        return transaction
    }
    

}

export default TransactionModel