// TripRisk class to define this object's properties.
export class TripRisk {
    constructor(
        public RiskID: number,
        public RiskName: string,
        public Description: string,
        public Outcrop: string,
        public Class: string,
        public Probability: string,
        public Rating: string,
        public Mitigation: string,
        public Ppe: string,
        public ReqEquipment: string,
        public SpWarning: string,
        public Responsible: string,
        public Effect: string,
        public WorstOutcome: string,
        public ResidualRisk: String,
        public TripID: number,
        public StopID: number
    ){}
}