const {ComponentDialog,WaterfallDialog,ChoicePrompt,ChoiceFactory,NumberPrompt}= require('botbuilder-dialogs');
const{CardFactory,AttachmentLayoutTypes,MessageFactory}=require('botbuilder');

const {orderDialog}=require('../Constants/DialogIds');
const { bill, bill2 } = require('../cards/cards');

const orderDialogWF1 ='orderDialogWF1';
const ChoicePromptDialog= 'ChoicePromptDialog';
const NumberPromptDialog= 'NumberPromptDialog'

class OrderDialog extends ComponentDialog{

    constructor(conversationState,askBookdateAccessor){
        super(orderDialog,askBookdateAccessor);

        if(!conversationState) throw new Error ("conversationState state required");

        this.conversationState=conversationState;
        this.askBookdateAccessor= askBookdateAccessor
        
        this.addDialog(new ChoicePrompt(ChoicePromptDialog))
        this.addDialog(new NumberPrompt(NumberPromptDialog))
        this.addDialog(new WaterfallDialog(orderDialogWF1,[
         
            this.menutype.bind(this),
            this.menuItem.bind(this),
            this.menuQuantity.bind(this),
            this.askdrink.bind(this),
            this.AllOrder.bind(this),
           // this.PriceList.bind(this)
        ]));

        this.initialDialogId=orderDialogWF1;
    }
 
    async menutype(stepContext){
        await stepContext.context.sendActivity(MessageFactory.carousel(this.cardchoices()));
        return await stepContext.next()
    }

    async menuItem(stepContext){
        return await stepContext.prompt(ChoicePromptDialog,{
            prompt: 'Select What you want to Order',
            choices: ChoiceFactory.toChoices(['Pizza','Burger','Sandwich'])
        })
    }

    async menuQuantity(stepContext){
        let DialogData1= await this.askBookdateAccessor.get(stepContext.context,{});
        DialogData1.ItemType=stepContext.result.value;
         return await stepContext.prompt(NumberPromptDialog,`How many ${DialogData1.ItemType} would you like to order?`)
       
    }

    async askdrink(stepContext){
        let DialogData1= await this.askBookdateAccessor.get(stepContext.context,{});
        DialogData1.quantity= stepContext.result;
        return await stepContext.prompt(ChoicePromptDialog,{
            prompt:`Would You like to have some Coke (Rs.20) along with your order of ${DialogData1.quantity} ${DialogData1.ItemType}/${DialogData1.ItemType}s`,
            choices: ChoiceFactory.toChoices(['YES','NO'])
        })
    }

   /* async PriceList(stepContext){
        let DialogData1= await this.askBookdateAccessor.get(stepContext.context,{});
        DialogData1.price= stepContext.result;
        if(DialogData1.ItemType == "Pizza")
        {
            DialogData1.price = 50;
        }
        else if(DialogData1.ItemType == "Burger")
        {
            DialogData1.price = 45;
        }
        
       return await DialogData1.price;
    }*/
    
    
    async AllOrder(stepContext){
        let DialogData1= await this.askBookdateAccessor.get(stepContext.context);
        switch (stepContext.context.activity.text.toLowerCase()){ 
            
            case 'yes':
                DialogData1.result= DialogData1.quantity * 200 + 20;
             // return await stepContext.context.sendActivity(`Total price = Rs.${DialogData1.result} for your order of ${DialogData1.ItemType} and coke`);
             return await stepContext.context.sendActivity({
                attachments:[
                    CardFactory.adaptiveCard(bill(DialogData1.ItemType,DialogData1.quantity,DialogData1.result))
                ]
            });
            case 'no':
                DialogData1.result= DialogData1.quantity * 200;
               // return await stepContext.context.sendActivity(`Total price = Rs.${DialogData1.result} for your order of ${DialogData1.ItemType} `);
               return await stepContext.context.sendActivity({
                attachments:[
                    CardFactory.adaptiveCard(bill2(DialogData1.ItemType,DialogData1.quantity,DialogData1.result))
                ]
            });
            default:
                await context.sendActivity("Sorry Try again");   
                break;
            }
        return await stepContext.endDialog();
    }



    cardchoices(){
        try{
            const cardoptions = [
                CardFactory.animationCard(
                    'Pizza',
                [
                    { url: 'https://i.pinimg.com/originals/8e/3f/9e/8e3f9e959dd460a6fdb06caf1eaede8c.gif' }
                ],
                [],
                {
                    subtitle: 'Price: Rs.200'
                }),
                CardFactory.animationCard(
                    'Burger',
                [
                    { url: 'https://images.squarespace-cdn.com/content/v1/58ed0fd46a49630e8a874b7e/1572525401548-4U3LGV2MEZ3JBJ5YMUHJ/burger.gif' }
                ],
                [],
                {
                    subtitle: 'Price: Rs.200'
                }),
                CardFactory.animationCard(
                    'Sandwich',
                [
                    { url: 'https://c.tenor.com/ozqx8OPjJykAAAAM/sandwich-food.gif' }
                ],
                [],
                {
                    subtitle: 'Price: Rs.200'
                })
            ]
            return cardoptions;
        }catch(err){
            console.error(err)
        }
    }

    

   /* createAnimationCard1() {
        return CardFactory.animationCard(
            'Microsoft Bot Framework',
            [
                { url: 'https://i.giphy.com/Ki55RUbOV5njy.gif' }
            ],
            [],
            {
                subtitle: 'Animation Card'
            }
        );
    }*/

   /* createAnimationCard2() {
        return CardFactory.animationCard(
            'Microsoft Bot Framework',
            [
                { url: 'https://i.giphy.com/Ki55RUbOV5njy.gif' }
            ],
            [],
            {
                subtitle: 'Animation Card'
            }
        );
    }*/

   /* createAnimationCard3() {
        return CardFactory.animationCard(
            'Microsoft Bot Framework',
            [
                { url: 'https://i.giphy.com/Ki55RUbOV5njy.gif' }
            ],
            [],
            {
                subtitle: 'Animation Card'
            }
        );
    }*/
    
}

module.exports.OrderDialog=OrderDialog;