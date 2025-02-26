import { LightningElement,wire } from 'lwc';
import getInvitationAddress from '@salesforce/apex/InvitationController.getInvitationAddress';
export default class InvitationAddress extends LightningElement {

    recordId='a0Iaj000001y0MLEAY';

    addressDetails={}
    @wire(getInvitationAddress, {Id:'$recordId'})
    addressHandler({data, error}){
        if(data){
            console.log("addressHandler data", JSON.stringify(data))
            this.addressDetails = { ...data[0] };
            console.log(this.addressDetails);
        }
        if(error){
            console.error("addressHandler error", error)
        }
    }

}