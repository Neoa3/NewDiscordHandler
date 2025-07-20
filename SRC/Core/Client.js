export default async function _client(client) {

    setInterval(() => {
        if (!client || !client.user) {
            console.log("[WARNING] ".red.bold + "Client Not Login".yellow)
        } else {
            console.log('[' + ' SYSTEM ' + '] ' + " Client Login ")
        }
    }, 50000 * 5);

    console.log('[' + ' SYSTEM ' + '] ' + ' Check Client Was Successfully Checked ');

}