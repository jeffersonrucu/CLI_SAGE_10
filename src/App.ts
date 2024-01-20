#! /usr/bin/env node

import { ControllerProject } from "./controller/ControllerProject";
import { Project } from "./model/Project";
import { ViewMessage } from "./view/ViewMessage";
import { ViewQuestion } from "./view/ViewQuestion";

class App {
    private message: ViewMessage;
    private question: ViewQuestion;

    constructor() {
        this.message  = new ViewMessage();
        this.question = new ViewQuestion();

        this.init();
    }

    private async init() {
        const project = new ControllerProject();

        this.message.welcome();

        const data = new Project(
            await this.question.askProjectName(),
            await this.question.askTheme(),
            await this.question.askSageVersion(),
            await this.question.askCssPreprocessor(),
            await this.question.askJsInterpreter(),
            await this.question.askDocker()
        );

        project.create(data);
    }
}

new App();
