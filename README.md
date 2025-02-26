
## Invitation Card Salesforce Project Overview

This project implements a digital invitation card system within a Salesforce Experience Site, providing a modern approach to event invitations with tracking capabilities.

### Object Structure

The primary object in this system is:

**Invitation__c (Custom Object)**
- Contains all event details and messaging configurations
- Tracks invitation status through rollup summaries
- Includes customizable theming options
- Stores social media integration links

### Key Fields in Invitation__c Object

**Event Information:**
- Event_Name__c (Text, Required) - Name of the event
- Event_Address__c (Text, Required) - Physical location
- Event_Date_And_Time__c (Date/Time, Required) - When the event occurs
- Event_Map_URL__c (URL, Required) - Map link to event location
- Respond_By__c (Date, Required) - RSVP deadline

**Messaging Fields:**
- Greeting_Message__c (Text, Required) - Initial greeting for invitees
- Event_Introduction__c (Text, Required) - Event description/purpose
- Event_Participants__c (Text, Required) - Information about hosts/organizers
- Rsvp_Accept_Message__c (Text, Required) - Message shown after accepting
- Rsvp_Decline_Message__c (Text, Required) - Message shown after declining
- Rsvp_after_date_Message__c (Text) - Message shown for late responses

**Tracking and Analytics:**
- Invitation_Accepted_Count__c (Roll-Up Summary) - Tracks acceptance rate
- Contact_Number__c (Phone) - Contact information for RSVP questions

**Social Media and URL Fields:**
- Invite_URL__c (Formula Text) - Dynamically generated invitation link
- Facebook_Url__c, Twitter_Url__c, Instagram_Url__c (URLs) - Social media links

**Customization:**
- Theme__c (Picklist) - Visual theme options (theme1, theme2, theme3, theme4)





### Technical Implementation

**Front-End:**
- Lightning Web Components (LWC) create responsive, interactive invitation cards
- Cards dynamically display data from the Invitation__c object
- Theme selection changes visual presentation

**Back-End:**
- Apex Classes handle data retrieval and RSVP processing
- Formula fields generate unique invitation URLs
- Roll-up summaries track invitation statistics


### Access Point
The invitation system is publicly accessible at:
https://devvserver-dev-ed.develop.my.site.com/

