import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorFallback() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6 text-red-700">
        <h1 className="text-2xl font-bold">Oops!</h1>
        <p>
          {error.status} — {error.statusText}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 text-red-700">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p>{(error as Error).message}</p>
    </div>
  );
}
