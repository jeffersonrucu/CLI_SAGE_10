import { Project } from "../model/Project";
import { ServiceFile } from "../service/ServiceFile";

export class ControllerProject {
    public async create(data: Project) {
        const file = new ServiceFile();

        // SAGE
        await file.createSage(data);
        await file.renameFileSage(data);

        // ENV
        await file.createEnv(data);
        await file.renameFileEnv(data);

        // MOVE DEFAULT FILES
        await file.moveDefaultFiles(data);

        // DOCKER
        if(data.getDocker()) {
            await file.createDocker(data);
        }
    }
}
