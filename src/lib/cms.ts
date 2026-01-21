import {
  ClientError,
  request as graphqlRequest,
  RequestDocument,
  Variables,
} from "graphql-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

let requestTimes: number[] = [];

const RATE_LIMIT_WINDOW = 1000;
const MAX_REQUESTS_PER_WINDOW = 40;

function waitForRateLimit(): Promise<void> {
  const now = Date.now();

  requestTimes = requestTimes.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (requestTimes.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestRequest = Math.min(...requestTimes);
    const waitTime = RATE_LIMIT_WINDOW - (now - oldestRequest) + 100;

    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  return Promise.resolve();
}

async function makeRateLimitedRequest<TDocument = unknown>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables,
  token?: string,
  retryCount = 0,
  maxRetries = 5,
): Promise<TDocument> {
  if (process.env.NODE_ENV !== "development") {
    await waitForRateLimit();
    requestTimes.push(Date.now());
  }

  try {
    return await graphqlRequest<TDocument, Variables>(
      "https://graphql.datocms.com/",
      document,
      variables,
      {
        Authorization: token || "",
      },
    );
  } catch (error) {
    const isRateLimitError =
      error instanceof ClientError && error.response?.status === 429;

    const isTransientError =
      error instanceof ClientError &&
      error.response?.status &&
      (error.response.status >= 500 || error.response.status === 408);

    if ((isRateLimitError || isTransientError) && retryCount < maxRetries) {
      let retryAfter = 0;

      if (error instanceof ClientError && error.response?.headers) {
        const headers = error.response.headers;

        retryAfter = parseInt(
          headers.get("retry-after") || headers.get("Retry-After") || "0",
          10,
        );
      }

      const baseDelay = retryAfter > 0 ? retryAfter * 1000 : 1000;
      const exponentialDelay = baseDelay * Math.pow(2, retryCount);
      const jitter = Math.random() * 1000;
      const waitTime = exponentialDelay + jitter;

      console.warn(
        `Rate limit hit (attempt ${retryCount + 1}/${maxRetries}). Waiting ${Math.round(waitTime / 1000)}s before retry...`,
      );

      await new Promise((resolve) => setTimeout(resolve, waitTime));

      return makeRateLimitedRequest<TDocument>(
        document,
        variables,
        token,
        retryCount + 1,
        maxRetries,
      );
    }

    throw error;
  }
}

export function request<TDocument = unknown>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  variables?: Variables,
) {
  return makeRateLimitedRequest<TDocument>(
    document,
    variables,
    process.env.DATO_CMS_TOKEN || "",
  );
}
