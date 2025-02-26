public without sharing class InvitationController {
    
    //Get Invitation details by Id
    @AuraEnabled(cacheable=true)
    public static Invitation__c getInvitationDetailsById(String Id){
        try{
            return [SELECT Id, Twitter_Url__c, Theme__c, Instagram_Url__c, Greeting_Message__c, Facebook_Url__c, Event_Participants__c,
            Event_Introduction__c, Event_Date_and_Time__c from Invitation__c where Id= : Id];
        } catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Program_Detail__c> getProgramDetailsByInvitationId(String Id){
        try{
            return [SELECT Id, Program_Date__c ,Invitation__c ,Name ,Program_End_Time__c,Program_Start_Time__c  from Program_Detail__c where Invitation__c=: Id];
            
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<Invitation__c> getInvitationAddress(String Id){
        try{
            return [SELECT Id, Event_Address__c ,Greeting_Message__c ,Event_Map_URL__c ,Contact_Number__c   from Invitation__c  where Id=: Id];
            
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
}