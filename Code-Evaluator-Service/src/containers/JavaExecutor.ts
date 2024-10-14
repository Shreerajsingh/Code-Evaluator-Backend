// import Docker from "dockerode";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import fetchDecodedStream from "./dockerHelper";

class JavaExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCases: string, outputTestCases: string) : Promise<ExecutionResponse> {
        console.log("Initilizing Java Dock Cont");

        const rawLogBuffer: Buffer[] = [];

        const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > Main.java && javac Main.java && echo '${inputTestCases.replace(/'/g, `\\"`)}' | java Main`;

        const javaDockerContainer = await createContainer(JAVA_IMAGE, ["/bin/sh", "-c", runCommand]);

        // Starting / booting the docker container
        await javaDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await javaDockerContainer.logs({ 
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true        // Whether the logs are streamed or returned as a string
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
            await javaDockerContainer.kill();
            return {output: error as string, status: "ERROR"};
        } finally {
            await javaDockerContainer.remove();
        }
    }
}

export default JavaExecutor;