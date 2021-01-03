
import { ActivityOptions } from 'discord.js';
import DaaldClient from '../structures/Client';
import Event from '../structures/event';

export default class ReadyEvent extends Event {
  constructor(client: DaaldClient) {
    super(client, 'ready');
  }

  async run(): Promise<void> {
    const status: Array<ActivityOptions> = [
      {
        name: 'Funk Reverso',
        type: 'LISTENING',
      }
    ];

    setInterval(() => {
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      this.client.user.setPresence({
        activity: randomStatus,
      });
    }, 1000);
  }
}