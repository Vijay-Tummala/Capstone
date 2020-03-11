// Member class to define this object's properties.
export class Member {
    constructor(
        public UserID: number,
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Organization: string,
        public RoleID: number
    ){}
}