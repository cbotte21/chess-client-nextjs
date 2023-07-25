import React from "react";

const PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

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
const hive_proto = grpc.loadPackageDefinition(packageDefinition).hive;

export var HiveContextProps: any = {
    client: new hive_proto.Hive("localhost:80000", grpc.credentials.createInsecure())
}

const HiveContext = React.createContext(HiveContextProps);

export function HiveProvider({children}: any): any {
    const [hiveContext, setHiveContext] = React.useState(HiveContextProps)
    // TODO: Try connecting here
    return (
        <>
            <HiveContext.Provider value={hiveContext}>
                {children}
            </HiveContext.Provider>
        </>
    )
}