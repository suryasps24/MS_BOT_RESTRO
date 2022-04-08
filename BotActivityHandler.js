const {ActivityHandler,CardFactory,TurnContext}= require ('botbuilder');

class BotActivityHandler extends ActivityHandler{
    constructor(conversationState,rootDialog,conversationReferences){
        super();

        if(!conversationState) throw new Error ("conversationState state required");
    
        this.conversationState=conversationState;
        this.rootDialog=rootDialog;
        this.accessor=this.conversationState.createProperty('DialogAccessor');
        this.conversationReferences = conversationReferences;

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);

            await next();
        });
        //Message event 

         
      this.onMessage(async (context, next)=>{

        await this.rootDialog.run(context,this.accessor)
        await next();

        });

        this.onMembersAdded(async(context,next)=>{
            await context.sendActivity({
                attachments:[CardFactory.adaptiveCard({
                    "type": "AdaptiveCard",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "THE RESTAURANT",
                            "wrap": true,
                            "fontType": "Default",
                            "size": "ExtraLarge",
                            "weight": "Bolder",
                            "color": "Default",
                            "isSubtle": true
                        },
                        {
                            "type": "Image",
                            "url": "https://i.pinimg.com/originals/d5/ec/9c/d5ec9c42cade6c696ef244cc33efedd3.gif",
                            "width": "0px",
                            "height": "0px"
                        },
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "id": "Discription",
                            "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\nmolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\nnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\noptio, eaque rerum!",
                            "fontType": "Default",
                            "size": "Default",
                            "weight": "Bolder",
                            "color": "Dark"
                        }
                    ],
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.2"
                })]

            });

             await context.sendActivity({
                  attachments:[
                      CardFactory.heroCard(
                          'Please Select the Service You want from us:',
                          null,
                          CardFactory.actions([
                              {
                                  type:'imBack',
                                  title:'BOOK Table',
                                  value:'BOOK Table'
                              },
                              {
                                type:'imBack',
                                title:'Order Menu',
                                value:'Order Menu'
                            },
                            {
                                type:'imBack',
                                title:'Track Details',
                                value:'Track Details'
                            }
                          ])
                      )
                  ]
              })

              const welcomeMessage = 'Navigate to http://localhost:3978/api/notify to proactively message everyone who has previously messaged this bot.';
              await context.sendActivity(welcomeMessage);



            
            await next();
        });
        
    }
     addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
    async run(context){
        await super.run(context);
        await this.conversationState.saveChanges(context,false);
        
        
    }

}

module.exports.BotActivityHandler=BotActivityHandler