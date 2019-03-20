export interface IServerEntity {
  id?: string;
  testName?: string;
  testAddress?: string;
  testLastName?: string;
  testCity?: string;
  testCountry?: string;
  testNumber?: number;
}

export class ServerEntity implements IServerEntity {
  constructor(
    public id?: string,
    public testName?: string,
    public testAddress?: string,
    public testLastName?: string,
    public testCity?: string,
    public testCountry?: string,
    public testNumber?: number
  ) {}
}
