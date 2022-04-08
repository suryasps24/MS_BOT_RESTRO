const {ComponentDialog,WaterfallDialog,NumberPrompt,TextPrompt,DateTimePrompt}= require('botbuilder-dialogs');
const{CardFactory}=require('botbuilder');

const {bookDialog}=require('../Constants/DialogIds');
const bookDialogWF1 ='bookDialogWF1';
const DateTimePromptDialog='DateTimePromptDialog';
const NumberPromptDialog='NumberPromptDialog';
const TextPromptDialog='TextPromptDialog';

class BookDialog extends ComponentDialog{

    constructor(askBookdateAccessor){
        super(bookDialog,askBookdateAccessor);

     //  if(!conversationState) throw new Error ("conversationState state required");
        
      // this.conversationState=conversationState;
       this.askBookdateAccessor= askBookdateAccessor

        this.addDialog(new DateTimePrompt(DateTimePromptDialog));
        this.addDialog(new NumberPrompt(NumberPromptDialog));
        this.addDialog(new TextPrompt(TextPromptDialog));
        this.addDialog(new WaterfallDialog(bookDialogWF1,[
            this.askBookdate.bind(this),
            this.asktime.bind(this),
            this.askmember.bind(this),
            this.thanks.bind(this)
          //  this.submitbooking.bind(this)

        ]));

        this.initialDialogId=bookDialogWF1;
    }
    async askBookdate(stepContext){
      //  let dialogData =await this.askBookdateAccessor.get(stepContext.context,{});
      //  dialogData.Date=stepContext.result;
        return await stepContext.prompt(DateTimePromptDialog,'On which day you want to make reservation?')
            

    }
    
    async asktime(stepContext){
        let dialogData= await this.askBookdateAccessor.get(stepContext.context,{});
        dialogData.Date= stepContext.result;
        return await stepContext.prompt (DateTimePromptDialog,`At What time you wanna Come? ${dialogData.Date}`)
            

    }

    async askmember(stepContext){
        let dialogData =await this.askBookdateAccessor.get(stepContext.context);
        dialogData.Time=stepContext.result;
        return await stepContext.prompt(NumberPromptDialog,'HOW many members coming?')
    }

 /*   async submitbooking(stepContext){
        let dialogData =await this.askBookdateAccessor.get(stepContext.context);
        dialogData.finalbooking=stepContext.result; 
        await stepContext.context.sendActivity({
            attachments:[
                CardFactory.adaptiveCard(confirmbooking(dialogData.Date,dialogData.Time,dialogData.members))
            ]
        });
        return stepContext.endDialog();
    }*/

    async thanks(stepContext){
        let dialogData=await this.askBookdateAccessor.get(stepContext.context);
        dialogData.members=stepContext.result;
        return await stepContext.context.sendActivity('Thank you for booking! Now Check out are menu in adavance and click on Track details for confirmation')
    }
}

module.exports.BookDialog=BookDialog;
