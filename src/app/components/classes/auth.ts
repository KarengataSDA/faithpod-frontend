import { EventEmitter } from "@angular/core";
import { User } from "src/app/shared/models/user";


export class Auth {
    static userEmitter = new EventEmitter<User>()
}