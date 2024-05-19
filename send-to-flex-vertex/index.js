
const { accountSid, authToken, workspaceSid, workflowSid } = process.env;
const clientTwilio = require('twilio')(accountSid, authToken);
exports.sendToFlexVertex = async (req, res) => {

    let { conversationSid, myNumberTwilio, author, client_name, form_name} = req.body.sessionInfo.parameters
    let name = client_name ? client_name : form_name
    console.log("olhando o nome", req.body.sessionInfo.parameters)
    let normalizedName = author
    console.log(conversationSid, myNumberTwilio, author)


    const listedConversations = await clientTwilio.conversations.v1.conversations(conversationSid).fetch()
    //console.log(`Olhando o listed Conversations: ${JSON.stringify(listedConversations)}`)
    let { attributes: attributesCh } = listedConversations
    attributesCh = JSON.parse(attributesCh)
    //console.log(`olhando os atributes ch: ${JSON.stringify(attributesCh)}, \n olhando o type: ${typeof attributesCh}`)
    let { isTask = false } = attributesCh
    console.log(`olhando os isTask: ${isTask}`)

    if (!isTask) {

        console.log("Caindo no if")
        clientTwilio.flexApi.v1.interaction
            .create({
                channel: {
                    type: 'web',
                    initiated_by: 'customer',
                    properties: {
                        type: 'web',
                        media_channel_sid: conversationSid,
                    },

                },
                routing: {
                    properties: {
                        workspace_sid: workspaceSid,
                        workflow_sid: workflowSid,
                        task_channel_unique_name: "chat",
                        attributes: {
                            name: normalizedName,
                            customerName: normalizedName,
                            customerAddress: normalizedName,
                            'ConversationSid': conversationSid,
                            'botSolution': 'false',
                            conversations:{
                                conversation_attribute_1: "Enviado para o agente"
                            }
                        }
                    }
                }
            }).then(interaction => {
                console.log("olhando o properties", interaction.routing.properties.sid)


                clientTwilio.conversations.v1.conversations(conversationSid)
                    .update({
                        attributes: JSON.stringify({
                            ...attributesCh,
                            isTask: interaction.routing.properties.sid
                        })
                    }).then(conversation => {

                        console.log("CH SID:", conversation.sid)
                        res.status(200).send({response: "interaction created"})
                        

                    });
            }).catch((e) => {
                console.log("Error in Interaction: ", e)
                res.status(400).send({response:"error"})
            })

        
    } else {
        console.log("Já é uma task")
        res.status(400).send({response: "its already a task"});

    }


};
