interface RailParams{
    title: string;
}

/**
 * A data model of a single TaskRail.
 */
export class Rail {
    title: string;
    constructor(params: RailParams){
        this.title = params.title;
    }
}