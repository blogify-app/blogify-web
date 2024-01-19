/* tslint:disable */
/* eslint-disable */
/**
 * Blogify - API
 * Log in and blog on [Blogify-web](https://github.com/blogify-app/blogify-web)  to blog and interact with other users using [Blogify-api](https://github.com/blogify-app/blogify-api)  as your giveaway provider. Comment, create posts, follow new trends and react to posts as you see fit.
 *
 * The version of the OpenAPI document: latest
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {Configuration} from "./configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import globalAxios, {AxiosInstance, AxiosRequestConfig} from "axios";

export const BASE_PATH = (
  process.env.API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ",",
  ssv: " ",
  tsv: "\t",
  pipes: "|",
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
  url: string;
  options: AxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration | undefined;

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected axios: AxiosInstance = globalAxios
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  name: "RequiredError" = "RequiredError";
  constructor(
    public field: string,
    msg?: string
  ) {
    super(msg);
  }
}
