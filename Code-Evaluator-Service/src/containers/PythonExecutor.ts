// import Docker from "dockerode";
import CodeExecutorStrategy, { ExecutionResponse } from "../types/codeExecutorStrategy";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import fetchDecodedStream from "./dockerHelper";

class PythonExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCases: string, outputTestCases: string) : Promise<ExecutionResponse> {
        console.log("Initilizing Pyth Dock Cont");

        const rawLogBuffer: Buffer[] = [];

        const runCommand = `echo '${code.replace(/'/g, `\\"`)}' > test.py && echo '${inputTestCases.replace(/'/g, `\\"`)}' | python3 test.py`;
        
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);
        const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["/bin/sh", "-c", runCommand]);

        // Starting / booting the docker container
        await pythonDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await pythonDockerContainer.logs({ 
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
            await pythonDockerContainer.kill();
            return {output: error as string, status: "ERROR"};
        } finally {
            await pythonDockerContainer.remove();
        }
    }
}

export default PythonExecutor;