import { input, select, confirm, Separator } from '@inquirer/prompts';
import { QuestionEnum } from '../model/QuestionEnum';

export class ControllerQuestions {
    public async theme(): Promise<string> {
        return await input({
            message: QuestionEnum.THEME
        });
    }

    public async sageVersion(): Promise<string> {
        return await select({
            message: QuestionEnum.SAGE_VERSION,
            choices: [
                {
                  name: '10',
                  value: '10',
                  description: 'Last version',
                },
                new Separator(),
                {
                  name: '9',
                  value: '9',
                  disabled: 'Pending release',
                },
            ],
        });
    }

    public async cssPreprocessor(): Promise<string> {
        return await select({
            message: QuestionEnum.CSS_PREPROCESSOR,
            choices: [
                {
                    name: 'None',
                    value: 'None',
                    description: 'No CSS preprocessor',
                },
                {
                    name: 'Sass',
                    value: 'Sass',
                    description: 'Sass with the SCSS syntax',
                },
                new Separator(),
                {
                    name: 'Less',
                    value: 'Less',
                    disabled: 'Pending release',
                },
                {
                    name: 'Stylus',
                    value: 'Stylus',
                    disabled: 'Pending release',
                },
            ],
        });
    }

    public async jsInterpreter(): Promise<string> {
        return await select({
            message: QuestionEnum.JS_INTERPRETER,
            choices: [
                {
                    name: 'None',
                    value: 'None',
                    description: 'No JavaScript interpreter',
                },
                {
                    name: 'TypeScript',
                    value: 'TypeScript',
                    description: 'TypeScript',
                },
                new Separator(),
                {
                    name: 'Babel',
                    value: 'Babel',
                    disabled: 'Pending release',
                },
                {
                    name: 'Flow',
                    value: 'Flow',
                    disabled: 'Pending release',
                },
            ],
        });
    }

    public async docker(): Promise<boolean> {
        return await confirm({
            message: QuestionEnum.USE_DOCKER,
            default: true,
        });
    }
}
