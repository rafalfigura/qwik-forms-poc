import { $, component$, useStore } from "@builder.io/qwik";

import { routeAction$ } from "@builder.io/qwik-city";
import { Input } from "~/ui/input/input";
import { useForm } from "~/custom-form/custom-form";
import * as v from "valibot";

const productValidator = v.object({
  label: v.pipe(v.string(), v.minLength(5)),
  description: v.pipe(v.string(), v.minLength(5), v.maxLength(10)),
  author: v.object({
    name: v.pipe(v.string(), v.minLength(3)),
    books: v.array(v.pipe(v.string(), v.minLength(3))),
  }),
});

export const useFormAddProduct = routeAction$(async (data, requestEvent) => {
  console.log({ data });

  return {
    success: true,
    data: data,
    errors: [],
  };
});

export default component$(() => {
  const action = useFormAddProduct();

  const store = useStore({
    label: "label",
    description: "description",
    author: {
      name: "author name",
      books: ["book 1"],
    },
  });
  const formStore = useStore({});

  const { Form, inputProps } = useForm({
    action,
    store,
    formStore,
    schema: $(productValidator),
  });

  return (
    <Form>
      <div     style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        maxWidth: "400px",
        margin: "1rem auto",
      }}>
        <button type={"submit"}>submit</button>
        <Input {...inputProps("label")} />
        <Input {...inputProps("description")} />
        <Input {...inputProps("author.name")} />
        {store.author.books.map((book, bookIndex) => (
          <Input key={bookIndex} {...inputProps(`author.books.${bookIndex}`)} />
        ))}
        <pre>{JSON.stringify({ store, formStore }, null, 2)}</pre>
      </div>
    </Form>
  );
});
