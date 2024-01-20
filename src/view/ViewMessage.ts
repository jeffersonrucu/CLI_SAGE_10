import figlet from "figlet";

export class ViewMessage {
    public welcome () {
        console.log(figlet.textSync("CLI Sage"));
    }
}