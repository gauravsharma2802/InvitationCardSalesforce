import { LightningElement,wire } from 'lwc';
import getProgramDetailsByInvitationId from '@salesforce/apex/InvitationController.getProgramDetailsByInvitationId'

export default class InvitationProgramDetails extends LightningElement {
   
    recordId='a0Iaj000001y0MLEAY';
    programList=[]
    @wire(getProgramDetailsByInvitationId, {Id:'$recordId'})
    programDetailsHandler({data, error}){
        if(data){
            console.log("programList", data)
            this.programList = data
        }
        if(error){
            console.error("Error in programDetailsHandler", error)
        }
    }

}