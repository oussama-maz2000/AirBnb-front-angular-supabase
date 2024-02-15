import { Injectable, inject } from "@angular/core";
import { ActionsSubject } from "@ngrx/store";
import { SettingsActions } from "src/app/store/actions/settings-actions";

@Injectable({ providedIn: 'root' })
export  class  MonitoringService{
    private static _actionsSubject: ActionsSubject | null = null;

    constructor(actionsSubject: ActionsSubject) {
        MonitoringService._actionsSubject = actionsSubject;
    }

    static dispatchAction() {
        if (!this._actionsSubject) {
            throw new Error('MonitoringService has not been initialized.');
        }
        console.log('dispatchAction');
        // Use MonitoringService._actionsSubject as needed here
    }
}