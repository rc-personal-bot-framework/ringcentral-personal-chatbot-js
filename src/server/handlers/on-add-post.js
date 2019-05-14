/**
 * default parser for add post event
 */
import { User } from '../models/ringcentral'

export default async message => {
  console.log('The user received a new message')
  let text = message.body.text
  if (!text) {
    return // not a text message
  }
  const { ownerId } = message
  const { creatorId } = message.body
  if (ownerId === creatorId) {
    return // bot should not talk to itself to avoid dead-loop conversation
  }
  const { groupId } = message.body
  const user = await User.findByPk(ownerId)
  const group = await user.getGroup(groupId)
  const isPrivateChat = group.members.length <= 2
  if (!isPrivateChat && (
    message.body.mentions &&
    message.body.mentions.some(m => m.type === 'Person' && m.id === ownerId)
  )) {
    // only respond to mentioned chat in group chat or private chat
    return
  }
  const regex = new RegExp(`!\\[:Person\\]\\(${user.id}\\)`)
  const textFiltered = text.replace(regex, ' ').trim()
  if (textFiltered === '__test__') {
    await user.sendMessage(groupId, {
      text: 'Bot running~'
    })
  }
  return { text, textFiltered, group, user }
}