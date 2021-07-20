import {User} from "./user";

export class UsersList {
    private list: User[] = [];

    public add(user: User) {
        console.log(user);
        this.list.push(user);
    }

    public refreshName(id: string, name: string) {
        const user = this.list.find((u) => u.id === id);
        if(user) {
            user.name = name;
        }
    }

    public getList() {
        return this.list;
    }

    public getUser(id: string) {
        return this.list.find((u) => u.id === id);
    }

    public getUsersInRoom(room: string) {
        return this.list.filter((u) => u.room === room);
    }

    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter((u) => u.id !== id);

        return tempUser;
    }
}
