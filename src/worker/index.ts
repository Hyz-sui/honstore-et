import { Hono } from "hono";
import { generateDescriptionBySearchQuery, generateTitleBySearchQuery } from "../shared/head-stuff";

type Env = {
  ASSETS: {
    fetch: typeof fetch;
  };
};

const app = new Hono<{ Bindings: Env }>();

app.get("*", async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);

  if (res.status === 200 && res.headers.get("Content-Type")?.includes("text/html")) {
    const url = new URL(c.req.url);
    const word = url.searchParams.get("word") || undefined;

    const title = generateTitleBySearchQuery(word);
    const description = generateDescriptionBySearchQuery(word);

    return new HTMLRewriter()
      .on("title", {
        element(el) {
          el.setInnerContent(title);
        },
      })
      .on('meta[property="og:title"]', {
        element(el) {
          el.setAttribute("content", title);
        },
      })
      .on('meta[name="description"]', {
        element(el) {
          el.setAttribute("content", description);
        },
      })
      .on('meta[property="og:description"]', {
        element(el) {
          el.setAttribute("content", description);
        },
      })
      .transform(res);
  }

  return res;
});

export default app;
