// import Docker from "dockerode";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import fetchDecodedStream from "./dockerHelper";

class CppExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCases: string, outputTestCases: string) : Promise<ExecutionResponse> {
        console.log("Initilizing cpp Dock Cont");

        const rawLogBuffer: Buffer[] = [];

        const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCases.replace(/'/g, `\\"`)}' | stdbuf -oL -eL ./main`;
        
        const cppDockerContainer = await createContainer(CPP_IMAGE, ["/bin/sh", "-c", runCommand]);

        // Starting / booting the docker container
        await cppDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await cppDockerContainer.logs({ 
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true        //wether the logs are streamed or returned as a string
        })

        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        })

        try {
            const response: string = await fetchDecodedStream(loggerStream, rawLogBuffer);
            
            if(response.trim() === outputTestCases.trim()){
                return {output: response, status: "COMPLETED"};
            } else {
                return {output: response, status: "WA"};
            }
        } catch (error) {
            await cppDockerContainer.kill();
            return {output: error as string, status: "ERROR"};
        } finally {
            await cppDockerContainer.remove();
        }
    }
}

export default CppExecutor;