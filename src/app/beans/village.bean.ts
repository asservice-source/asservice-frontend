export class VillageBean{
    
        public villageID: string;
        public villageNo: string;
        public villageName: string;

        constructor(json?: any){
            if(json){
                this.villageID = json.villageID;
                this.villageNo = json.villageNo;
                this.villageName = json.villageName;
            }
        }
        
    }