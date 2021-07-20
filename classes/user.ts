export class User {
    public id: string;
    public name: string;
    public room: string;


    constructor(_id: string, _name?: string, _room?: string) {
        this.id = _id;
        this.name = _name || 'no-name';
        this.room = _room || 'no-room';
    }
}
