import Client from './structures/Client'

const client = new Client({ disableMentions: 'everyone', messageCacheMaxSize: 50 })

client.loadEvents(`${__dirname}/events`);
client.loadCommands('src/commands')

client.login(process.env.TOKEN).then(() => console.log('[BOT] Bot conectado ao Discord com sucesso'))
