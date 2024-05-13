const { accountSid, authToken, projectId, topic } = process.env;
// Initialization 
const functions = require("firebase-functions");
const clientTwilio = require("twilio")(accountSid, authToken);

const { PubSub } = require("@google-cloud/pubsub");
// Set API URI according to your agent's location

exports.twilioIntegrationVertex = functions.https.onRequest(
  async (request, response) => {

    // Get WhatsApp Message Information
    const body = await request.body;
    const pubSub = new PubSub({ projectId });
    let topicNameOrId = topic;
    let {
      ConversationSid,
      Author = "botVertex",
      StateTo = "false",
      Body: receivedMsg = "Inactive",
    } = body;

    const listedConversations = await clientTwilio.conversations.v1.conversations(ConversationSid).fetch()
    //console.log(`Olhando o listed Conversations: ${JSON.stringify(listedConversations)}`)
    let { attributes: attributesCh } = listedConversations
    attributesCh = JSON.parse(attributesCh)
    //console.log(`olhando os atributes ch: ${JSON.stringify(attributesCh)}, \n olhando o type: ${typeof attributesCh}`)
    let { isTask = false } = attributesCh
    console.log(`olhando os isTask: ${isTask}`)
    console.log("olhando o body:", body);
    console.log(
      "olhando o type que vem no body",
      StateTo,
      "olhando seu tipo",
      typeof StateTo
    );

    if (receivedMsg) {
      let msgToSend = JSON.stringify({ message: receivedMsg });
      let dataBuffer = Buffer.from(msgToSend);
      // Configure Dialogflow CX Session
      let pubSubAttributes = {
        conversationSid: ConversationSid,
        from: Author,
        name: Author,
        stateTo: StateTo,
      };

      console.log("pubSubAttributes: ", pubSubAttributes);

      const sendMessageToPubSub = async ({
        pubSub,
        topicNameOrId,
        attributes,
        data,
      }) => {
        try {
          await pubSub
            .topic(topicNameOrId)
            .publishMessage({ data, attributes });
          console.log(`Looking at the message sent: ${data}!`);
          return { error: false };
        } catch (error) {
          console.log(
            `Looking at the error message not sent: ${error.message}`
          );
          return { error: true };
        }
      };

      if (!isTask) {
        try {
          let responseSend = await sendMessageToPubSub({
            pubSub,
            topicNameOrId,
            attributes: pubSubAttributes,
            data: dataBuffer,
          });
          if (responseSend.error) {
            let responseSend1 = await sendMessageToPubSub({
              pubSub,
              topicNameOrId,
              attributes: pubSubAttributes,
              data: dataBuffer,
            });
            if (responseSend1.error) throw new Error("Second Atempt failed");
          }
          return response.send("Send Succsefully to PubSub!");
        } catch (e) {
          console.log(e);
          return response.end();
        }
      }
    }
    return response.status(200).send("Message Sent!");
  }
);