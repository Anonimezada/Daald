import {Client, Collection} from 'discord.js'
import EventManager from './EventManager';

export default class DaaldClient extends Client {

  private commands: Collection<string, number>;
  private aliases: Collection<string, string>
  private events: EventManager;

  constructor(options = {}) {
    super(options);

    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new EventManager(this);
  }
}

