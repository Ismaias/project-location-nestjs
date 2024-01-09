export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

export class LocationEntity implements Location {
  id: string;
  name: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(props: Partial<Location>) {
    Object.assign(this, props);
  }
}
