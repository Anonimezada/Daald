import { Message } from 'discord.js';
import DaaldClient from '../structures/Client';
import Event from '../structures/event';

export default class MessageReceive extends Event {
  constructor(client: DaaldClient) {
    super(client, 'message');
  }

  async run(message: Message): Promise<Message | undefined> {
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const comando =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!comando) return;

    try {
      new Promise(res => res(comando.run(message, args)));
    } catch {
      // Do nothing
    }
  }
}