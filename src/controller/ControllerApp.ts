import { ControllerQuestions } from "./ControllerQuestions";
import figlet from "figlet";
import decompress from "decompress";
import { SageRepositoryEnum } from "../model/SageRepositoryEnum";

export class ControllerApp {
    private theme: string;
    private versionSage: string;

    constructor() {
        this.theme       = '';
        this.versionSage = '';

        this.welcome();
        this.init();
    }

    private async init() {
        try {
            await this.askQuestions();
            await this.createProject();
        } catch (error) {
            console.error("Error during initialization:", error);
        }
    }

    private welcome() {
        console.log(figlet.textSync("CLI Sage"));
    }

    private async askQuestions() {
        try {
            const questions = new ControllerQuestions();

            // const data = {
            //     theme: await questions.theme(),
            //     sage: await questions.sageVersion(),
            //     css: await questions.cssPreprocessor(),
            //     js: await questions.jsInterpreter(),
            //     docker: await questions.docker(),
            // }

            this.theme = await questions.theme();
            this.versionSage = await questions.sageVersion();
        } catch (error) {
            console.error("Error while obtaining answers:", error);
            throw error; // Propagate the error to stop further execution
        }
    }

    private async createProject() {
        try {
            const repository = (SageRepositoryEnum as never)[`VERSION_${this.versionSage}`];

            // Download the file
            const response = await fetch(repository);
            if (!response.ok) {
                throw new Error(`Failed to download the project archive. Status: ${response.status}`);
            }

            // Convert the response buffer to a Node.js Buffer
            const buffer = Buffer.from(await response.arrayBuffer());

            // Decompress the downloaded file
            await decompress(buffer, './project');
            console.log("Project created successfully!");
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }
}
