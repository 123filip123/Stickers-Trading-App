// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  console.log("here is an error middleware");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
  console.log(err.message);
};
