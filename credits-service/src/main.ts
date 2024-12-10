import { Application, Router } from "@oak/oak";
import { getUserBalance, useCredits } from "./credits.ts";

const PORT = Deno.env.get("PORT") || "8000";

const router = new Router();

router.get("/credits", (ctx) => {
  const user = ctx.request.headers.get("X-User-Id");

  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }

  const credits = getUserBalance(Number(user));

  ctx.response.status = 200;
  ctx.response.body = JSON.stringify({
    credits,
  });
});

router.put("/internal/credits/use/:amount", (ctx) => {
  const user = ctx.request.headers.get("X-User-Id");
  const amount = Number(ctx.params.amount);

  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }

  if (amount <= 0) {
    ctx.response.status = 400;
    ctx.response.body = "Invalid amount";
    return;
  }

  useCredits(Number(user), amount);

  ctx.response.status = 200;
  ctx.response.body = "Success";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({
  port: PORT,
});
