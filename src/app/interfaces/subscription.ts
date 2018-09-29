export interface Subscription {
    context: Object | undefined;
    isOnce: boolean;
    handler: (sender: any, eventArg: any) => void;
}
