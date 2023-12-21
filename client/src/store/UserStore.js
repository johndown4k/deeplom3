import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._user.is_admin
    }

    get isEmployer() {
        return this._user.is_employer
    }

    get userId() {
        return this._user.id
    }

    get user() {
        return this._user
    }
}


