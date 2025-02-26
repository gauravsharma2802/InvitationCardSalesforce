import { LightningElement,wire } from 'lwc';
import getRSVPDetails from '@salesforce/apex/InvitationController.getRSVPDetails'
import getResponsePicklistValues from '@salesforce/apex/InvitationController.getResponsePicklistValues'
import submitResponse from  '@salesforce/apex/InvitationController.submitResponse'
export default class InvitationResponse extends LightningElement {
    recordId='a0Iaj000001y0MLEAY';
    formData={}
    rsvpDetailsInfo={}
    rsvpOptions=[]
    rsvpMessage=''
    // get rsvpOptions(){
    //     return [
    //         {label:"Joyfully Accept", value:"Joyfully Accept"},
    //         {label:"Regretfully Decline", value:"Regretfully Decline"}
    //     ]
    // }

    @wire(getResponsePicklistValues)
    picklistHandler({data, error}){
        if(data){
            console.log("picklist", data)
            //['Joyfully Accept', 'Regretfully Decline']
            this.rsvpOptions = data.map(item=>{
                return {label:item, value:item}
            })
        }
        if(error){
            console.error("picklistHandler error", error)
        }
    }

    @wire(getRSVPDetails, {Id:'$recordId'})
    rsvpHandler({data, error}){
        if(data){
            console.log("rsvpHandler data", data)
            this.rsvpDetailsInfo = data
            this.checkAndSetMessage()
        }
        if(error){
            console.error("rsvpHandler error", error)
        }
    }

    changeHandler(event){
        const {name, value} = event.target //name = "Email", "test1@gmail.com"
        this.formData={...this.formData, [name]:value}
    }

    submitHandler(event){
        this.rsvpMessage=''
        event.preventDefault()
        console.log("this.formData", JSON.stringify(this.formData))
        const {Name, Email, Phone, Response, additionalGuests='0', additionalComment} = this.formData
        submitResponse({
            InvitationId:this.recordId,
            Name,
            Email,
            Phone,
            Response,
            additionalGuests,
            additionalComment
        }).then(result=>{
            console.log("result", result)
            if(result){
                localStorage.setItem(`invitationSubmitted-${this.recordId}`, Response)
                this.checkAndSetMessage()
            }
        }).catch(error=>{
            console.error("submitResponse error", error)
        })
    }

    checkAndSetMessage(){
        let isResponseSubmitted =''
        let allKeys = Object.keys(window.localStorage)
        allKeys.forEach(item=>{
            if(item.endsWith(this.recordId)){
                isResponseSubmitted = localStorage[item]
            }
        })

        if(isResponseSubmitted === "Joyfully Accept"){
            this.rsvpMessage=this.rsvpDetailsInfo.Rsvp_Accept_Message__c
        } else if(isResponseSubmitted === "Regretfully Decline"){
            this.rsvpMessage=this.rsvpDetailsInfo.Rsvp_Decline_Message__c
        } else if(!isResponseSubmitted && this.isRespondByDateIsPast(this.rsvpDetailsInfo.Respond_By__c)){
            this.rsvpMessage = this.rsvpDetailsInfo.Rsvp_after_date_Message__c
        } else {
            this.rsvpMessage =''
        }
    }

    isRespondByDateIsPast(respondByDate){
        // Get the current date
        const today = new Date()
        //provide a date to compare
        const providedDate = new Date(respondByDate)

        if(today>providedDate){
            return true
        } else {
            return false
        }
    }
}