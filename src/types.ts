import { Result } from "neverthrow";

import type { CommandActionType, OptionsType, SearchableType } from "~/schemas";

export const SEARCHABLE_TYPES: SearchableType[] = [
  "asn",
  "btc",
  "cve",
  "domain",
  "email",
  "eth",
  "gaPubID",
  "gaTrackID",
  "hash",
  "ip",
  "url",
];

export const SCANNABLE_TYPES: ScannableType[] = ["domain", "ip", "url"];

export interface Searcher {
  baseURL: string;
  name: string;
  supportedTypes: SearchableType[];

  searchByASN?(query: string): string;
  searchByBTC?(query: string): string;
  searchByCVE?(query: string): string;
  searchByDomain?(query: string): string;
  searchByEmail?(query: string): string;
  searchByETH?(query: string): string;
  searchByGAPubID?(quqery: string): string;
  searchByGATrackID?(query: string): string;
  searchByHash?(query: string): Result<string, string> | string;
  searchByIP?(query: string): string;
  searchByURL?(query: string): string;
  searchByXMR?(query: string): string;
}

export type ScannableType = "ip" | "domain" | "url";

export interface Scanner {
  baseURL: string;
  name: string;
  supportedTypes: ScannableType[];
  apiKey?: string;
  hasAPIKey: boolean;
  setAPIKey(apiKey: string | undefined): void;
  scanByIP?(query: string): Promise<Result<string, string>>;
  scanByDomain?(query: string): Promise<Result<string, string>>;
  scanByURL?(query: string): Promise<Result<string, string>>;
}

export interface SearchFuncWrapper {
  type: SearchableType;
  func: () => string | null;
}

export interface ScanFuncWrapper {
  type: ScannableType;
  func: () => string | null;
}

export interface SelectorSlot {
  analyzer: Scanner | Searcher;
  type: SearchableType | ScannableType;
  query: string;
}

export interface Message {
  text: string;
  options: OptionsType;
}

export interface SearcherMap {
  [name: string]: (searcher: Searcher, query: string) => Result<string, string>;
}

export interface ScannerMap {
  [name: string]: (
    scanner: Scanner,
    query: string,
  ) => Promise<Result<string, string>>;
}

export interface Command {
  action: CommandActionType;
  query: string;
  type: SearchableType;
  name: string;
}

export const MD5_LENGTH = 32;
export const SHA1_LENGTH = 40;
export const SHA256_LENGTH = 64;
