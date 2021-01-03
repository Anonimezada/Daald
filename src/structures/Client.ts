import {Client, Collection} from 'discord.js'
import EventManager from './EventManager';
import Event from './event'
import Command from './command'
import FileUtil from '../Util/FileUtil'

export default class DaaldClient extends Client {

  public commands: Collection<string, Command>;
  public aliases: Collection<string, string>
  public events: EventManager;

  constructor(options = {}) {
    super(options);

    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new EventManager(this);
  }

  public async login(token: string): Promise<string> {
    return super.login(token);
  }

  public async loadEvent(event: Event): Promise<void> {
    this.events.add(event);
  }

  public async loadCommand(command: Command, filepath: string): Promise<void> {
    command.dir = filepath;
    this.commands.set(command.name, command);
    this.aliases.set(command.name, command.name);
    command.config.aliases.forEach(a => this.aliases.set(a, command.name));
  }

  public loadCommands(directory: string): unknown {
    return FileUtil.readDirectory<Command>(directory, this, (cmd, filepath) => {
      this.loadCommand(cmd, filepath);
    });
  }

  public loadEvents(directory: string): unknown {
    return FileUtil.readDirectory<Event>(directory, this, evt => {
      this.loadEvent(evt);
    });
  }
}

