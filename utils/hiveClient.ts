import {redirect} from "next/navigation";

const PROTO_PATH: string = __dirname + process.env.proto_dir + "/hive.proto";

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

export class HiveClient {
    private static client = new routeguide.RouteGuide(process.env.hive_addr,
        grpc.credentials.createInsecure());

    public Connect = (jwt: string): Promise<unknown> => {
        return new Promise(resolve => {
            const call = HiveClient.client.Connect(jwt);
            call.on('data', function(status: number) {
                switch (status) {
                    case 1:
                        console.log("successful ping to authentication servers.")
                        break;
                    default: //TODO: Could pass kicked message here. Look for a specific status
                        throw("lost connection to authentication servers.")
                }
            });
        })
    }

    public Disconnect = (jwt: string) => {
        HiveClient.client.Leave(jwt)
    }
}