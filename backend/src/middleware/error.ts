// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  console.log("error middleware");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    code: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
