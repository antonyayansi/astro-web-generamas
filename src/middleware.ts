export function onRequest(context, next) {
  // intercept response data from a request
  // optionally, transform the response
  // return a Response directly, or the result of calling `next()`

  console.log('Middleware: onRequest')

  return next()
}
