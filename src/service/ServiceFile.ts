import fs from "fs";
import decompress from "decompress";
import { Project } from "../model/Project";
import { SageRepositoryEnum } from "../model/SageRepositoryEnum";
import { formatVersion, slugify } from "../utils/helpers";
import path from "path";
import replaceInFile from "replace-in-file";

export class ServiceFile {
    public async createSage(data: Project): Promise<void> {
        try {
            const version    = formatVersion(data.getVersionSage())
            const repository = (SageRepositoryEnum as never)[`VERSION_${version}`];
            const response   = await fetch(repository);

            if (!response.ok) {
                throw new Error(`Failed to download the project archive. Status: ${response.status}`);
            }

            const buffer = Buffer.from(await response.arrayBuffer());

            await decompress(buffer, `./${data.getProjectName()}/www/wordpress/themes`);

            console.log("Project created successfully!");
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }

    public async createDocker(data: Project): Promise<void> {
        const template = {
            dockerCompose: path.dirname(__dirname) + '/templates/docker-compose.yml',
        }

        const files = {
            dockerCompose: `${process.cwd()}/${data.getProjectName()}/docker-compose.yml`,
        }

        const slug = {
            projectName: slugify(data.getProjectName()),
            theme: slugify(data.getTheme()),
        }

        const options = {
            files: [files.dockerCompose],
            from: [
                /CLI_IMAGE_DB/g,
                /CLI_IMAGE_WP/g,
            ],
            to: [
                slug.projectName + '_db',
                slug.projectName + '_wp',
            ],
        };

        fs.copyFile(template.dockerCompose, files.dockerCompose, (error) => {
            if (error) {
                console.error("Error creating docker-compose.yml:", error);
                throw error;
            }
        });

        replaceInFile(options)
            .then(changedFiles => {
                console.log('Modified files:', changedFiles.join(', '));
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }

    public async createEnv(data: Project): Promise<void> {
        const template = {
            envExemple: path.dirname(__dirname) + '/templates/.env.example',
        }

        const files = {
            envExemple: `${process.cwd()}/${data.getProjectName()}/.env.example`,
        }

        const slug = {
            projectName: slugify(data.getProjectName()),
            theme: slugify(data.getTheme()),
        }

        const options = {
            files: [files.envExemple],
            from: [
                /CLI_DATABASE/g,
                /CLI_USER/g,
                /CLI_PASSWORD/g,
            ],
            to: [
                slug.projectName,
                slug.projectName + '_user',
                slug.projectName + '_password',
            ],
        };

        fs.copyFile(template.envExemple, files.envExemple, (error) => {
            if (error) {
                console.error("Error creating .env.example:", error);
                throw error;
            }
        });

        await replaceInFile(options)
            .then(changedFiles => {
                console.log('Modified files:', changedFiles.join(', '));
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }

    public async renameFileSage(data: Project): Promise<void> {
        fs.rename(
            `${process.cwd()}/${data.getProjectName()}/www/wordpress/themes/sage-${data.getVersionSage()}`,
            `${process.cwd()}/${data.getProjectName()}/www/wordpress/themes/${data.getTheme()}`,
            (error) => {
                if (error) {
                    throw error;
                }
            }
        );
    }

    public async renameFileEnv(data: Project): Promise<void> {
        await fs.promises.rename(
            `${process.cwd()}/${data.getProjectName()}/.env.example`,
            `${process.cwd()}/${data.getProjectName()}/.env`
        );
    }

    public async moveDefaultFiles(data: Project): Promise<void> {
        const file = {
            project: `${process.cwd()}/${data.getProjectName()}`,
            template: path.dirname(__dirname) + '/templates'
        };

        fs.cpSync(`${file.template}/.vscode`, `${file.project}/.vscode`, {recursive: true});
        fs.cpSync(`${file.template}/config`, `${file.project}/config`, {recursive: true});

        fs.copyFileSync(`${file.template}/.editorconfig`, `${file.project}/.editorconfig`);
        fs.copyFileSync(`${file.template}/composer.json`, `${file.project}/composer.json`);
        fs.copyFileSync(`${file.template}/README.md`, `${file.project}/README.md`);
    }
}
