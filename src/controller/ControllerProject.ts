import { Project } from "../model/Project";
import { ServiceFile } from "../service/ServiceFile";

export class ControllerProject {
    public async create(data: Project) {
        const file = new ServiceFile();

        file.create(data);
        file.renameFiles(data);
    }
}