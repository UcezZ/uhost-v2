export default class Video {
    id;
    userid;
    duration;
    name;
    alias;
    isPublic;
    time;
    humantime;
    user;
    humanduration;
    thumburl;
    videoUrl;

    constructor(data) {
        this.id = data.id ?? 'N/A';
        this.userid = data.userid ?? 'N/A';
        this.duration = data.duration ?? 'N/A';
        this.name = data.name ?? 'N/A';
        this.alias = data.alias ?? 'N/A';
        this.isPublic = data.isPublic ?? 'N/A';
        this.time = data.time ?? 'N/A';
        this.humantime = data.humantime ?? 'N/A';
        this.user = data.user ?? 'N/A';
        this.humanduration = data.humanduration ?? 'N/A';
        this.thumburl = data.thumburl ?? 'N/A';
        this.videoUrl = data.videoUrl ?? 'N/A';
    }
}