export class Project {
    private projectName : string;
    private theme       : string;
    private versionSage : string;
    private css         : string;
    private js          : string;
    private docker      : boolean;

    constructor(projectName: string, theme: string, versionSage: string, css: string, js: string, docker: boolean) {
        this.projectName = projectName;
        this.theme = theme;
        this.versionSage = versionSage;
        this.css = css;
        this.js = js;
        this.docker = docker;
    }

    public getProjectName(): string {
        return this.projectName;
    }

    public setProjectName(projectName: string): void {
        this.projectName = projectName;
    }

    public getTheme(): string {
        return this.theme;
    }

    public setTheme(theme: string): void {
        this.theme = theme;
    }

    public getVersionSage(): string {
        return this.versionSage;
    }

    public setVersionSage(versionSage: string): void {
        this.versionSage = versionSage;
    }

    public getCss(): string {
        return this.css;
    }

    public setCss(css: string): void {
        this.css = css;
    }

    public getJs(): string {
        return this.js;
    }

    public setJs(js: string): void {
        this.js = js;
    }

    public getDocker(): boolean {
        return this.docker;
    }

    public setDocker(docker: boolean): void {
        this.docker = docker;
    }
}