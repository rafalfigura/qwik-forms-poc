import {
  component$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

export default component$(() => {

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <ServiceWorkerRegister />

      </head>
      <body id={"app"} lang="en" class="bg-gray-50 md:h-screen">
        <RouterOutlet />

      </body>
    </QwikCityProvider>
  );
});
