const restify = require('restify');

const {BotFrameworkAdapter,ConversationState,MemoryStorage,TurnContext} = require('botbuilder');

const { BotActivityHandler} = require('./BotActivityHandler');
const {RootDialog}=require('./Dialogs/RootDialog')
//adapter

const adapter = new BotFrameworkAdapter({
    appID:'',
    appPassword:''
});

//adapter error handler

adapter.onTurnError = async(context,error)=>{
    console.log('Error occured ')

    //send msg to user about error
    await context.sendActivity('Bot faced an error')
};

//create server

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(3978,()=>{
    console.log(`${server.name} Listening at ${server.url}`);
})

const memory = new MemoryStorage();

var conversationState = new ConversationState(memory);
const conversationReferences = {};
// activity handler object
const rootDialog=new RootDialog(conversationState);
const mainBot =new BotActivityHandler(conversationState,rootDialog,conversationReferences)

server.post('/api/msg', async (req,res)=>{
   await adapter.process(req,res,async(context)=> mainBot.run(context))  
   
    });
    


server.get('/api/notify', (req,res) =>  {
    for (const conversationReference of Object.values(conversationReferences))
     {
      adapter.continueConversationAsync('',conversationReference, async context => {
            await context.sendActivity('HELLO FROM PROACTIVE MESSAGE');
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write('<html><body><h1>Proactive messages have been sent.</h1></body></html>');
    res.end();
});

