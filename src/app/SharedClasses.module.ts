export class Nodes {
    Id: number = 0;
    Label: string | undefined;
  }
  export class Edges {
    Source: number | undefined;;
    Target: number | undefined;;
  }
  export class Degree {
    Id: Edges | undefined;
    Count: number = 0;
  }