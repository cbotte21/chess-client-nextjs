const PROTO_PATH: string = __dirname + process.env.proto_dir + "/queue.proto";

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const routeguide = grpc.loadPackageDefinition(packageDefinition).routeguide;

export class QueueClient {
    private onGame: Function
    private static client = new routeguide.RouteGuide(process.env.queue_addr,
        grpc.credentials.createInsecure());

    constructor(onGame: Function) {
        this.onGame = onGame
    }

    public Join = () => {
        
    }

    public Leave = () => {

    }
}