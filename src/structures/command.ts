import { Message, PermissionString } from 'discord.js';
import DaaldClient from './Client';

type CategoryTypes = 'util' | 'dev' | 'mod' | 'fun';

interface CommandConfig {
  category: CategoryTypes;
  aliases: Array<string>;
  dir?: string;
}

export default abstract class Command {
  public client!: DaaldClient;

  public config: CommandConfig;

  public name: string;

  public abstract run(message: Message, args: Array<string>): unknown;

  public dir!: string;

  constructor(client: DaaldClient, name: string, options: Partial<CommandConfig>) {
    this.client = client;
    this.name = name;
    this.config = {
      category: options.category || 'dev',
      aliases: options.aliases || [],
    };
  }
}