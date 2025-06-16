import { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  useSearchParams,
  useSubmit,
  useLocation,
} from "react-router-dom";

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const submit = useSubmit();
  const timer = useRef(0);

  useEffect(() => {
    if(pathname !== "/") {
        setValue("");
    }
  }, [pathname]);

  const debouncedSubmit = useCallback(
    (form: HTMLFormElement) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => submit(form), 300);
    },
    [submit]
  );

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;
      const control = form.elements.namedItem("q");
      if (control instanceof HTMLInputElement) {
        setValue(control.value);
        debouncedSubmit(form);
      }
    },
    [debouncedSubmit]
  );

  return (
    <Form
      method="get"
      role="search"
      onChange={handleChange}
      className="w-1/3 mr-4"
    >
      <input
        type="text"
        name="q"
        placeholder="Search movies..."
        value={value}
        onChange={() => {}}
        className="p-2 border-1 rounded-md w-full"
      />
    </Form>
  );
}
