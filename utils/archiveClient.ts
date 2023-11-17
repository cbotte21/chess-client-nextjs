import {redirect} from "next/navigation";

const PROTO_PATH: string = __dirname + process.env.proto_dir + "/archive.proto";

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

export class ArchiveClient {
    private static client = new routeguide.RouteGuide(process.env.hive_addr,
        grpc.credentials.createInsecure());


}