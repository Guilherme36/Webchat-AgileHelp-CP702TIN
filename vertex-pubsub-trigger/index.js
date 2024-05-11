const { accountSid, authToken, location, projectId, agentId, languageCode } = process.env;
const clientTwilio = require("twilio")(accountSid, authToken);
const { SessionsClient } = require("@google-cloud/dialogflow-cx");
// Set API URI according to your agent's location
const client = new SessionsClient({
  apiEndpoint: "dialogflow.googleapis.com",
});
// Initialization
exports.pubSubVertexTwilioSupport = async (event, context) => {
  const message = Buffer.from(event.data, 'base64').toString();

  const messageParsed = JSON.parse(message)
  let { conversationSid, from, name, doc, phone, email, stateTo } = event.attributes
  const sessionId = conversationSid;
  let request;
  let finishConversationPhrases = ['Sempre que precisar tirar dúvidas conte comigo! Até logo!', 'Obrigado por utilizar o AgileHelp']
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  if (stateTo === 'inactive') {
    request = {
      session: sessionPath,
      queryInput: {
        event: {
          event: 'inactivity',
        },
        languageCode,
      },
    };

  } else {
    request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: messageParsed.message,
        },
        languageCode,
      },
      queryParams: {
        parameters: {
          fields: {
            conversationSid: { kind: "stringValue", stringValue: conversationSid },
            author: { kind: "stringValue", stringValue: from },
            name: { kind: "stringValue", stringValue: name },
            doc: { kind: "stringValue", stringValue: doc },
            phone: { kind: "stringValue", stringValue: phone },
            email: { kind: "stringValue", stringValue: email },
          }
        }
      }
    };

  }
  // Get Dialogflow CX Response
  try {
    console.log("Entrando no try");
    //console.log("olhando o request", request);
    const [res] = await client.detectIntent(request);

    const endChannel = async (conversationSid) => {
      console.log("Caindo no end channel")
      await clientTwilio.conversations.v1.conversations(conversationSid)
        .update({ state: "closed" })
        .then((res) => {
          return console.log("Canal Fechado:", res.state);
        })
        .catch((err) => {
          return console.log("Error:", err);

        });

    }
    // Iterate over every message
    for (const message of res.queryResult.responseMessages) {
      // Send Text Message
      if (message.text) {
        let botResponse = message.text.text;

        let parsedResponse = JSON.stringify(botResponse)
        if (parsedResponse.includes(finishConversationPhrases[0]) || parsedResponse.includes(finishConversationPhrases[1])) {
          console.log("Caiu no if do includes")
          await clientTwilio.conversations.v1.conversations(conversationSid)
            .messages
            .create({ author: 'botVertex', body: botResponse })
            .then(endChannel(conversationSid));
        } else {
          await clientTwilio.conversations.v1.conversations(conversationSid)
            .messages
            .create({ author: 'botVertex', body: botResponse })
        }
      }

    }
  } catch (e) {
    console.log(e.message);
  }
};
