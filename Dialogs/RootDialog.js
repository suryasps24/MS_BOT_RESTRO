const {ComponentDialog,DialogSet,DialogTurnStatus,WaterfallDialog}=require('botbuilder-dialogs');
const  {rootDialog,bookDialog,orderDialog, trackDialog}=require('../Constants/DialogIds');
const{BookDialog,OrderDialog,TrackDialog}=require('./call');


const parseMessage ='parseMessage';

class RootDialog extends ComponentDialog{
    constructor(conversationState){
        super(rootDialog);
        if(!conversationState) throw new Error ("conversationState state required");

        this.conversationState=conversationState;
        this.askBookdateAccessor =this.conversationState.createProperty('State accessor');
        this.addDialog(new WaterfallDialog(parseMessage,[
            this.routeMessage.bind(this)
        ]));
        
        this.addDialog(new BookDialog(this.askBookdateAccessor));
        this.addDialog(new OrderDialog(this.askBookdateAccessor,conversationState));
        this.addDialog(new TrackDialog(this.askBookdateAccessor));

        this.initialDialogId=parseMessage;
    }

    async run(context,accessor){
        try{
            const dialogSet = new DialogSet(accessor);
            dialogSet.add(this);
            const dialogContext =await dialogSet.createContext(context);
            const results =await dialogContext.continueDialog();
            if(results && results.status === DialogTurnStatus.empty){
                await dialogContext.beginDialog(this.id);
            }else{
                console.log('dialog stack is empty')
            }
        }catch(err){
            console.log(err);
        }
    }

    async routeMessage(stepContext){
        switch (stepContext.context.activity.text.toLowerCase()){
            case 'book table':
               return await stepContext.beginDialog(bookDialog);
            case 'order menu':
                return await stepContext.beginDialog(orderDialog);
            case 'track details':
                return await stepContext.beginDialog(trackDialog);
            default:
                await context.sendActivity("Sorry Try again");   
                break;
            }
        return await stepContext.endDialog();
    }
}

module.exports.RootDialog=RootDialog;