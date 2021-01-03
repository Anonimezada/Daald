import { Message, MessageEmbed } from 'discord.js';
import DaaldClient from '../../structures/Client';
import Command from '../../structures/command';

export default class InfoCommand extends Command {
  constructor(client: DaaldClient) {
    super(client, 'ping', {
      category: 'util',
    });
  }

  async run(message: Message): Promise<Message> {
    return message.channel.send(`**Host:** \`${Math.round(this.client.ws.ping)}\`ms\n**API:** \`${
        Date.now() - message.createdTimestamp
      }\`ms`)
  }
}