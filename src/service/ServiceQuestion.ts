import { input, select, confirm, Separator } from '@inquirer/prompts';
import { QuestionEnum } from '../model/QuestionEnum';

export class ServiceQuestion {
    public async askProjectName(): Promise<string> {
        return await input({
            message: QuestionEnum.PROJECT_NAME
        });
    }

    public async askTheme(): Promise<string> {
        return await input({
            message: QuestionEnum.THEME
        });
    }

    public async askSageVersion(): Promise<string> {
        return await select({
            message: QuestionEnum.SAGE_VERSION,
            choices: [
                {
                  name: '10',
                  value: '10.7.0',
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

    public async askCssPreprocessor(): Promise<string> {
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

    public async askJsInterpreter(): Promise<string> {
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

    public async askDocker(): Promise<boolean> {
        return await confirm({
            message: QuestionEnum.USE_DOCKER,
            default: true,
        });
    }
}