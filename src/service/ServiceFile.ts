import fs from "fs";
import decompress from "decompress";
import { Project } from "../model/Project";
import { SageRepositoryEnum } from "../model/SageRepositoryEnum";
import { formatVersion } from "../utils/helpers";

export class ServiceFile {
    public async create(data: Project) {
        try {
            const version    = formatVersion(data.getVersionSage())
            const repository = (SageRepositoryEnum as never)[`VERSION_${version}`];
            const response   = await fetch(repository);

            if (!response.ok) {
                throw new Error(`Failed to download the project archive. Status: ${response.status}`);
            }

            const buffer = Buffer.from(await response.arrayBuffer());

            await decompress(buffer, `./${data.getProjectName()}/themes`);

            console.log("Project created successfully!");
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    }

    public async renameFiles(data: Project) {
        fs.rename(
            `${process.cwd()}/${data.getProjectName()}/themes/sage-${data.getVersionSage()}`,
            `${process.cwd()}/${data.getProjectName()}/themes/${data.getTheme()}`,
            (error) => {
                if (error) {
                    throw error;
                }
            }
        );
    }
}