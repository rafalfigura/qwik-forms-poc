import {
  component$,
  Slot,
} from "@builder.io/qwik";
export default component$(() => {

  return (
      <div class="flex flex-col justify-between max-w-screen-xl mx-auto p-2 md:p-5 h-full space-y-4">
        <main class="grow">
          <Slot />
        </main>
      </div>
  );
});
