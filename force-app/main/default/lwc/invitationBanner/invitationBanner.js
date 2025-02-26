import { LightningElement,wire } from 'lwc';
import marriageInvitationAssets from '@salesforce/resourceUrl/marriageInvitationAsset';
import getInvitationDetailsById from '@salesforce/apex/InvitationController.getInvitationDetailsById';
import CONFETTI from '@salesforce/resourceUrl/confetti'
import { loadScript } from 'lightning/platformResourceLoader';
export default class InvitationBanner extends LightningElement {

    facebookUrl = '';
    twitterUrl = '';
    instagramUrl = '';
    theme = 'theme1'
    recordId='a0Iaj000001y0MLEAY';
    invitationDetails={}
    isConfettiLoaded=false;

    intervalId
    days=0
    minutes=0
    seconds=0
    hours=0




      // Paths to the static resources
      instagram = marriageInvitationAssets + '/instagram.svg';
      twitter = marriageInvitationAssets + '/twitter.svg';
      facebook = marriageInvitationAssets + '/facebook.svg';
      


       // Dynamically setting background image style for the banner
    get bannerImageStyle() {
        let themeName =  marriageInvitationAssets + `/${this.theme}.jpeg`;
        return `background-image: url(${themeName});`;
    }

    
    //wire service to fetch the Invitation detail.
    @wire(getInvitationDetailsById,{Id:'$recordId'})
    invitationDetailHandler({data,error}){
        if(data){
            console.log("Invitation Handler",JSON.stringify(data));
            this.theme=data.Theme__c;
            this.invitationDetails=data;
            this.facebookUrl=data.Facebook_Url__c;
            this.instagramUrl=data.Instagram_Url__c;
            this.twitterUrl=data.Twitter_Url__c;
            this.countdownTimer(data.Event_Date_and_Time__c);
        }
        if(error){
            console.error(error);
        }
    }


    //
    countdownTimer(targetDate){
     this.intervalId=setInterval(()=>{
       //get the current time
       const currentTime=new Date().getTime()
       const targetTime=new Date(targetDate).getTime()


       const timeDifference=targetTime-currentTime;

       this.days=Math.floor(timeDifference/(1000 * 60 * 60 * 24));
       this.hours=Math.floor((timeDifference%(1000 * 60 * 60 *24)) /(1000 * 60 *60));
       this.minutes=Math.floor((timeDifference%(1000 * 60 * 60)) /(1000 * 60 ));
       this.seconds=Math.floor((timeDifference%(1000 * 60)) /(1000));

if(timeDifference<=0){
    clearInterval(this.intervalId)
}

     },1000)
    }


    renderedCallback(){
        if(!this.isConfettiLoaded){
         loadScript(this, CONFETTI).then(()=>{
            console.log("CONFETTI LOADED SUCCESSFULLY");
            const jsConfetti=new JSConfetti();
            jsConfetti.addConfetti();
         }).catch(error=>{
            console.log("Error while loading the confetti",error);
         })
    }
}
    
}