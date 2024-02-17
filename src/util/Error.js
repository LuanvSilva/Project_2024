
class Exception extends Error {
    
    constructor(error, name){

        super(error)
        this.name = name
    }
}

export default Exception