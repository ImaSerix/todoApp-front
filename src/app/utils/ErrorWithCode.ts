
class ErrorWithCode<T> extends Error {

    public code:T;

    constructor(message:string, code:T) {
        super(message);
        this.code = code
    }
}

export default ErrorWithCode;