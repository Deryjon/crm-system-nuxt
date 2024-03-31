export interface IBaseField {
  $createAt: string;
  $id: string;
}

export interface ICustomer extends IBaseField {
  name: string;
  email: number;
  $avatar_url: string;
  from_source?: string;
}

export interface IComment extends IBaseField {
$updatedAt($updatedAt: any): unknown;
  text: string;
}

export enum EnumStatus {
  "todo" = "todo",
  "to-be-agreed" = "to-be-agreed",
  "in-progress" = "in-progress",
  "produced" = "produced",
  "done" = "done",
}

export interface IDeal extends IBaseField {
[x: string]: any;
  comments: IComment[];
  customer: ICustomer;
  name: string;
  price: number;
  status: EnumStatus
}
