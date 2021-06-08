
export interface RuleStatus{
    status: string;
    statusDetail: string;
}

export interface Rule {
    name: string;
    uid: string;
    status: RuleStatus;
    trigger: string;
    actions: string;
    conditions: string;
    script: string;
}
