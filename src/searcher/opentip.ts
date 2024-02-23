import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class OpenTIP implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://opentip.kaspersky.com";
    this.name = "OpenTIP";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
