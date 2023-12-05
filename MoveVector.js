class MoveVector {

    constructor(rankVectorComponent, fileVectorComponent, restricted = undefined){
        this.rankComponent = rankVectorComponent
        this.fileComponent = fileVectorComponent
        this.restricted = restricted
    }
}

module.exports = MoveVector