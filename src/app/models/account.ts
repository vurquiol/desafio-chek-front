export class Account{
    constructor(
        public _id?:string,
        public number?:string,
        public cardHolder?:string,
        public expirationDate?:Date,
        public cvv?:string,
        public accountbalance?:Number

        ){}     
}