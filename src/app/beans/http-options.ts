export class ApiOptional{
    public continue_session: boolean;
    public continue_error: boolean;
    constructor(params: any){
        if(params){
            if(params.continue_session){
                this.continue_session = params.continue_session;
            }
            if(params.continue_error){
                this.continue_error = params.continue_error;
            }
                
        }
    }
}