class Command
{

    constructor(message) {
        this.message = message;
        this.arguments = [];
    }

    setArguments(args)
    {
        this.arguments = args;
    }
}

module.exports = Command;