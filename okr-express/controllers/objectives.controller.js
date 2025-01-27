export class objectivesController{
    constructor(objectiveService){
        this.objectiveService = objectiveService
    }

    fetchAll(res){
        const objectives = this.objectiveService.fetchAll();
        res.json(objectives);
    }
}