/**
 * this example bot skill would show full config
 */

// could load User class
// import { User } from 'ringcentral-personal-chatbot-js/dist/models/ringcentral'

exports.name = 'Bot skill name'

exports.description = 'Bot skill description'

// only if you have setting page
exports.settingPath = '/skill/your-skill-setting-path'

exports.homepage = 'https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-js/blob/master/example-skills/full-config-skill.js'

// handle post added event
exports.onPostAdd = async ({
  text, // original text
  textFiltered, // text without metion user
  group,
  user,
  handled // hanlded by prev skills
}) => {
  await user.sendMessage(group.id, {
    text: textFiltered
  })
  // return true so next skill would know message is already handled
  return true
}

// handle all events except post added event
export const onEvent = ({
  eventType, // == message.body.eventType
  message, // original event message
  user, // user instance
  shouldUseSignature // should use signature like "send by bot skill xxx" in message.
}) => {
  console.log(message)
}

// extends express app as you need
export const appExtend = (app) => {
  app.get('/some-route', (req, res) => res.end('some'))
}
