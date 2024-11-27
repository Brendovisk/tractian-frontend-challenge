export interface Location {
  id: string;
  name: string;
  parentId: string;
}

export type LocationResponse = Location[];
