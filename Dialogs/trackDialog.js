const {ComponentDialog,WaterfallDialog}= require('botbuilder-dialogs');
const{CardFactory,MessageFactory}=require('botbuilder');

const {trackDialog}=require('../Constants/DialogIds');
const {BookDialog}=require('./bookDialog');
const{confirmbooking}=require('../cards/cards');

const trackDialogWF1 ='trackDialogWF1';

class TrackDialog extends ComponentDialog{

    constructor(askBookdateAccessor){
        super(trackDialog,askBookdateAccessor);

        //if(!conversationState) throw new Error ("conversationState state required");
        
       // this.conversationState=conversationState;
       
        this.askBookdateAccessor=askBookdateAccessor;

        this.addDialog(new WaterfallDialog(trackDialogWF1,[
            this.details.bind(this)
        ]));

        this.initialDialogId=trackDialogWF1;
    }
   
    async details(stepContext){
      let dialogData=await this.askBookdateAccessor.get(stepContext.context);
      console.log(this.askBookdateAccessor);
      await stepContext.context.sendActivity({
        attachments:[
            CardFactory.adaptiveCard(confirmbooking(dialogData.Date,dialogData.Time,dialogData.members))
        ]
    });
    }

  
}

module.exports.TrackDialog=TrackDialog;