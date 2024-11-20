import { TweetResponse } from "~/types/twitter";
import { serverSupabaseClient } from "#supabase/server";
import { Database, Enums } from "~/types/database";
import { ToolsOzoneCommunicationUpdateTemplate } from "@atproto/api";

const mock: TweetResponse = {
  data: [
    {
      created_at: "2024-11-18T02:34:22.000Z",
      id: "1858337924070416815",
      text: "Segundos que se tarda un usuario en hacer login según la estrategia\n\n- Sign in with Google: 3.86 segundos\n- Magic Link: 56 segundos\n\nMuerte a los magic links https://t.co/KQpaaJcvoI",
      referenced_tweets: [{ type: "quoted", id: "1857900968245072087" }],
      edit_history_tweet_ids: ["1858337924070416815"],
    },
    {
      created_at: "2024-11-16T19:35:03.000Z",
      id: "1857870012947771507",
      text: "Ship it https://t.co/EAlkIikFL7",
      referenced_tweets: [{ type: "quoted", id: "1857439161797488990" }],
      edit_history_tweet_ids: ["1857870012947771507"],
    },
    {
      created_at: "2024-11-16T19:33:18.000Z",
      id: "1857869573648953591",
      text: "Razón #1 por la que no me gusta iMessage:\n\nLos stickers están como mil años atrás de las rarezas que podemos encontrar en WhatsApp\n\nIncluso hay grupos en WhatsApp que se dedican solamente a proveer stickers \uD83D\uDE02 https://t.co/RyBU2XONu8",
      referenced_tweets: [{ type: "quoted", id: "1857637942887612460" }],
      edit_history_tweet_ids: ["1857869573648953591"],
    },
    {
      created_at: "2024-11-16T16:48:34.000Z",
      id: "1857828118142292459",
      text: "Y para el stack, ando pensando en Kotlin MultiPlatform\n\nMe encanta la idea que ofrece de que puedo elegir entre crear UI nativa por plataforma y reusar business logic, o de plano crear UI reusable\n\nSobretodo que la app compila a código nativo. Fan de esto.",
      referenced_tweets: [{ type: "replied_to", id: "1857828116993028472" }],
      edit_history_tweet_ids: ["1857828118142292459"],
    },
    {
      created_at: "2024-11-16T16:48:34.000Z",
      id: "1857828116993028472",
      text: "Algo tipo:\n\n- Solo cubrir el IF que seguimos (16 - 8)\n- Apps para WearOS y WatchOS (para iniciar / detener el fasting)\n- Integración con Health Connect y HealthKit\n- Lo más básica posible\n\nSiento que al menos la app mobile sale en un día, solo es una vista!",
      referenced_tweets: [{ type: "replied_to", id: "1857828115789349005" }],
      edit_history_tweet_ids: ["1857828116993028472"],
    },
    {
      created_at: "2024-11-16T16:48:34.000Z",
      id: "1857828115789349005",
      text: "Hago intermittent fasting (IF), y en iOS uso Zero porque tiene app también para el watch. Aunque tienen banners diarios para que pagues premium\n\nMi mamá usa Android y también hace IF, y aunque Zero también está ahí, está medio abandonada\n\nQuiero hacer un MVP para resolver esto!",
      edit_history_tweet_ids: ["1857828115789349005"],
    },
    {
      created_at: "2024-11-16T03:17:09.000Z",
      id: "1857623916937941066",
      text: "Ahora con lo que vi de mi mentora, se que ser Senior es llevar ese impacto a la organización e incluso a la empresa\n\nY ese impacto se refleja en que como la empresa puede dar un paso más grande gracias a tus contribuciones\n\nYa no solo es un feature, son logros que tal cual van… https://t.co/YPQqtf7DgJ",
      referenced_tweets: [{ type: "replied_to", id: "1857623915419558374" }],
      edit_history_tweet_ids: ["1857623916937941066"],
    },
    {
      created_at: "2024-11-16T03:17:09.000Z",
      id: "1857623915419558374",
      text: "Y ahora veo que el impacto no se mide en tiempo (x años es ser Senior? Nope) \n\nNi tampoco por dominar un framework o saber mucho de algo\n\nEso implicaría ser un mid level alto\n\nMientras el impacto se quede en un equipo, le seguimos dando vuelta entre los niveles jr y mid",
      referenced_tweets: [{ type: "replied_to", id: "1857623914123608480" }],
      edit_history_tweet_ids: ["1857623915419558374"],
    },
    {
      created_at: "2024-11-16T03:17:08.000Z",
      id: "1857623914123608480",
      text: "Definitivamente ella fue varios pasos más allá del nivel Senior, pero sin duda me abrió los ojos del nivel de impacto que implica ser Senior en Google\n\nSobretodo que cuando me tocó ser senior en empresas anteriores, normalmente ocurría porque sabía mucho de x tecnología y llevaba… https://t.co/npSWj7k1pp",
      referenced_tweets: [{ type: "replied_to", id: "1857623912781410658" }],
      edit_history_tweet_ids: ["1857623914123608480"],
    },
    {
      created_at: "2024-11-16T03:17:08.000Z",
      id: "1857623912781410658",
      text: "Y es un problema que implica performance, storage, y sobretodo comunicación e INFLUENCIA, al motivar a otros equipos a unificar sus approaches a una sola forma\n\nE incluso comenzó un summit (eventos a nivel Google) donde hicieron presentaciones para mantener al tanto a todos los… https://t.co/BYF71usLAD",
      referenced_tweets: [{ type: "replied_to", id: "1857623911376236735" }],
      edit_history_tweet_ids: ["1857623912781410658"],
    },
    {
      created_at: "2024-11-16T03:17:08.000Z",
      id: "1857623911376236735",
      text: "Ya les he compartido del gran peso de los soft skills, y como se combinan con los tech skills para llevar el impacto más allá de tu equipo\n\nPero para darles contexto: prácticamente ella se encargó de lograr un standard en Google para un framework de formato de textos, que implica… https://t.co/5S4g3hdlkj",
      referenced_tweets: [{ type: "replied_to", id: "1857623909794984447" }],
      edit_history_tweet_ids: ["1857623911376236735"],
    },
    {
      created_at: "2024-11-16T03:17:07.000Z",
      id: "1857623909794984447",
      text: "Mi mentora en YouTube (también de mi mismo equipo) tuvo promo a Senior hace unas semanas\n\nY ahora me hacen clicks muchas cosas acerca de ese paso en la promo, sobretodo comparándolo con lo que creía saber que se necesitaba para ello \n\nMini \uD83E\uDDF5",
      edit_history_tweet_ids: ["1857623909794984447"],
    },
    {
      created_at: "2024-11-16T02:12:46.000Z",
      id: "1857607716526797040",
      text: "Me encantan los comerciales del @madebygoogle Pixel \uD83D\uDE02\n\n#BestPhonesForever https://t.co/MmR7FRPzT1",
      attachments: { media_keys: ["7_1857607678148882432"] },
      edit_history_tweet_ids: ["1857607716526797040"],
    },
    {
      created_at: "2024-11-16T02:03:03.000Z",
      id: "1857605267950809356",
      text: "Esta semana casi no me metí a avanzar en sideprojects\n\nToda mi energía mental se fue en el algoritmo de la chamba y sus tres variantes\n\nPero este fin voy a tener un buen break para priorizar mi mental health! \uD83E\uDDE0",
      edit_history_tweet_ids: ["1857605267950809356"],
    },
    {
      created_at: "2024-11-16T02:01:54.000Z",
      id: "1857604980364161486",
      text: "Bluefin, por lejos! https://t.co/8Y77aXi3eG",
      referenced_tweets: [{ type: "quoted", id: "1857075514818617508" }],
      edit_history_tweet_ids: ["1857604980364161486"],
    },
    {
      created_at: "2024-11-15T23:47:04.000Z",
      id: "1857571047593447702",
      text: "Qué es ser un full stack engineer? Excelente respuesta! https://t.co/pYdzUoYAMu",
      referenced_tweets: [{ type: "quoted", id: "1854199734501515530" }],
      edit_history_tweet_ids: ["1857571047593447702"],
    },
    {
      created_at: "2024-11-15T20:16:30.000Z",
      id: "1857518056530129208",
      text: "Porque Matias Duarte es relevante / importante en la industria UI/UX. Aquí sus logros:\n\nDanger Hiptop: Lideró el diseño de un smartphone con internet y mensajería integrados (esto fue en 2002!)\n\nwebOS (Palm): Creó la UI multitarea basada en tarjetas y gestos. Algo super común que… https://t.co/3ZnCCcV2CH",
      referenced_tweets: [{ type: "replied_to", id: "1857518054974124469" }],
      edit_history_tweet_ids: ["1857518056530129208"],
    },
    {
      created_at: "2024-11-15T20:16:29.000Z",
      id: "1857518054974124469",
      text: "Ayer fui a un lunch con un nuevo amigo de la chamba que es UI designer en el team de YT Shorts\n\nY al final resultó que eramos fans de Matias Duarte, que es VP de diseño en Google \uD83D\uDE02\n\nMatias Duarte es chileno y es una eminencia en cuestión de diseño de interfaces\n\n\uD83E\uDDF5",
      edit_history_tweet_ids: ["1857518054974124469"],
    },
    {
      created_at: "2024-11-15T19:03:02.000Z",
      id: "1857499568189092346",
      text: "Como llega muchísima data y también tenemos variables para que los PMs puedan experimentar con el algoritmo y las métricas, había un montón de casos\n\nY cada implementación tuve que darle vueltas según el feedback que me iba llegando\n\nAhora sí que cada día si me sentía super… https://t.co/CqruqjzmL7",
      referenced_tweets: [{ type: "replied_to", id: "1857499566893052126" }],
      edit_history_tweet_ids: ["1857499568189092346"],
    },
    {
      created_at: "2024-11-15T19:03:02.000Z",
      id: "1857499566893052126",
      text: "Acabo de terminar la primer fase de un design doc que llevo trabajando durante unas semanas a la par de código para validar ideas\n\nLa parte más tricky es que es acerca de un algoritmo, tons tuve que investigar muchos escenarios, y sobretodo registrar el time complexity",
      edit_history_tweet_ids: ["1857499566893052126"],
    },
    {
      created_at: "2024-11-14T18:59:42.000Z",
      id: "1857136340695175591",
      text: "Tons tiendo a no activar ChatGPT Search tan seguido\n\nPero en este mundo donde la AI avanza a pasos adelantados, les digo que tal en mi update de AIs de diciembre!",
      referenced_tweets: [{ type: "replied_to", id: "1857136339365527773" }],
      edit_history_tweet_ids: ["1857136340695175591"],
    },
    {
      created_at: "2024-11-14T18:59:41.000Z",
      id: "1857136339365527773",
      text: "Para mi el contexto es crucial porque si estoy investigando un tema, no solo necesito la respuesta sino indagar en las fuentes\n\nSobretodo en un mundo en que la viralidad implica que una fuente erronea sea posteada en muchos medios, implica que la repetición de un tema no le da… https://t.co/IWudlyRbNi",
      referenced_tweets: [{ type: "replied_to", id: "1857136337641435230" }],
      edit_history_tweet_ids: ["1857136339365527773"],
    },
    {
      created_at: "2024-11-14T18:59:41.000Z",
      id: "1857136337641435230",
      text: "Es mi experiencia también. Cuando hice mi ranking de AIs de Noviembre, les platiqué que aún no me convencía ChatGPT Search\n\nMe encanta la competencia tho, como usuarios, nos beneficiamos!\n\nY le veo un gran win a que no tenga ads (aún :p)\n\nPero justo sentí esa falta de contexto https://t.co/BwV1kwBbMh",
      referenced_tweets: [{ type: "quoted", id: "1857097010219745668" }],
      edit_history_tweet_ids: ["1857136337641435230"],
    },
    {
      created_at: "2024-11-14T18:49:41.000Z",
      id: "1857133819503194124",
      text: "Ahorita tengo un sideproject donde ando haciendo reverse engineering a una API y Claude alucinó con ganas \uD83E\uDD72\n\nQue es un gran ejemplo de que las AIs para tareas no tan comunes no son muy buenas\n\nPara este sideproject tengo que hacer comparaciones de repos de Github hechos en Go… https://t.co/qg6ZYNgPHK",
      referenced_tweets: [{ type: "replied_to", id: "1857133817540296878" }],
      edit_history_tweet_ids: ["1857133819503194124"],
    },
    {
      created_at: "2024-11-14T18:49:40.000Z",
      id: "1857133817540296878",
      text: "El model experimental más reciente de Gemini acaba de saltar al primer lugar del leaderboard de Chatbot Arena\n\nEste modelo está disponible en Google AI Studio\n\nLe echare un ojo llegando a casa!\n\nTambien saltó al primer lugar en el leaderboard de Vision! https://t.co/cIFbOP16v2",
      referenced_tweets: [{ type: "quoted", id: "1857110672565494098" }],
      edit_history_tweet_ids: ["1857133817540296878"],
    },
    {
      created_at: "2024-11-14T18:25:14.000Z",
      id: "1857127667373638117",
      text: "Me dio mucha risa esto \uD83D\uDE02 \n\nya entiendo porque la forma del CyberTruck \uD83D\uDE02 https://t.co/6Id5SfL3NW",
      referenced_tweets: [{ type: "quoted", id: "1856896167658885266" }],
      edit_history_tweet_ids: ["1857127667373638117"],
    },
    {
      created_at: "2024-11-14T18:15:51.000Z",
      id: "1857125308123758937",
      text: "Un día común usando Apple Intelligence\n\nCada uso es cruzar los dedos para que o no truene o no escriba como si no fuera chavorruco\n\nDe las AIs que he usado, esta es la más triste por mucho https://t.co/j01aMKO2o9",
      attachments: { media_keys: ["3_1857125305561063424"] },
      edit_history_tweet_ids: ["1857125308123758937"],
    },
    {
      created_at: "2024-11-14T17:59:11.000Z",
      id: "1857121113186443687",
      text: "Gemini llega como app nativa a iOS!\n\nLlevo varias semanas usándola y me encanta. Sobretodo Gemini Live\n\nYa se ganó un espacio dentro de mi carpeta de apps de AI, junto a Claude y ChatGPT\n\nhttps://t.co/mAaady8mk6\n2024/11/14/24296295/google-gemini-app-iphone-ios-ai",
      edit_history_tweet_ids: ["1857121113186443687"],
    },
    {
      created_at: "2024-11-14T00:10:07.000Z",
      id: "1856852074669248610",
      text: "Amsterdam, Buenos Aires, Cairo… comienza la fase del siguiente mega release en YouTube\n\nY el nuevo nombre es \uD83E\uDD41 \n\nDelhi! \uD83C\uDDEE\uD83C\uDDF3",
      edit_history_tweet_ids: ["1856852074669248610"],
    },
    {
      created_at: "2024-11-13T23:45:57.000Z",
      id: "1856845989518479714",
      text: "Agrego a esta lista el estado actual de Apple Intelligence\n\nPros: viene incluido en el sistema\n\nContras: es malo en todo. El texto q genera suena a algo q dirían en una telenovela, o incluso crashea\n\nYa mejor copio mi texto y abro otra app a pesar de que esa AI está a un tap",
      referenced_tweets: [{ type: "replied_to", id: "1856392328933748749" }],
      edit_history_tweet_ids: ["1856845989518479714"],
    },
  ],
  includes: {
    tweets: [
      {
        created_at: "2024-11-16T21:38:03.000Z",
        id: "1857900968245072087",
        text: 'Data from Clerk. "Magic Links" are magic in name only\n\nProud that Clerk has successfully guided builders to:\n- Enable Sign in with Google\n- Keep passwords enabled \n- Choose Email OTP over Magic Links\n\nData &gt; hype cycles \uD83D\uDCCA https://t.co/dEpiqY6ZV0',
        attachments: { media_keys: ["3_1857899606467923968"] },
        edit_history_tweet_ids: ["1857900968245072087"],
      },
      {
        created_at: "2024-11-15T15:03:00.000Z",
        id: "1857439161797488990",
        text: "\uD83D\uDE48\uD83D\uDE48 https://t.co/XzRqxbL5p1",
        referenced_tweets: [{ type: "quoted", id: "1853843479639835016" }],
        edit_history_tweet_ids: ["1857439161797488990"],
      },
      {
        created_at: "2024-11-16T04:12:53.000Z",
        id: "1857637942887612460",
        text: "my imessage sticker collection is getting pretty good https://t.co/XlSmgw1Djz",
        attachments: { media_keys: ["3_1857637940538781697"] },
        edit_history_tweet_ids: ["1857637942887612460"],
      },
      {
        created_at: "2024-11-16T16:48:34.000Z",
        id: "1857828116993028472",
        text: "Algo tipo:\n\n- Solo cubrir el IF que seguimos (16 - 8)\n- Apps para WearOS y WatchOS (para iniciar / detener el fasting)\n- Integración con Health Connect y HealthKit\n- Lo más básica posible\n\nSiento que al menos la app mobile sale en un día, solo es una vista!",
        referenced_tweets: [{ type: "replied_to", id: "1857828115789349005" }],
        edit_history_tweet_ids: ["1857828116993028472"],
      },
      {
        created_at: "2024-11-16T16:48:34.000Z",
        id: "1857828115789349005",
        text: "Hago intermittent fasting (IF), y en iOS uso Zero porque tiene app también para el watch. Aunque tienen banners diarios para que pagues premium\n\nMi mamá usa Android y también hace IF, y aunque Zero también está ahí, está medio abandonada\n\nQuiero hacer un MVP para resolver esto!",
        edit_history_tweet_ids: ["1857828115789349005"],
      },
      {
        created_at: "2024-11-16T03:17:09.000Z",
        id: "1857623915419558374",
        text: "Y ahora veo que el impacto no se mide en tiempo (x años es ser Senior? Nope) \n\nNi tampoco por dominar un framework o saber mucho de algo\n\nEso implicaría ser un mid level alto\n\nMientras el impacto se quede en un equipo, le seguimos dando vuelta entre los niveles jr y mid",
        referenced_tweets: [{ type: "replied_to", id: "1857623914123608480" }],
        edit_history_tweet_ids: ["1857623915419558374"],
      },
      {
        created_at: "2024-11-16T03:17:08.000Z",
        id: "1857623914123608480",
        text: "Definitivamente ella fue varios pasos más allá del nivel Senior, pero sin duda me abrió los ojos del nivel de impacto que implica ser Senior en Google\n\nSobretodo que cuando me tocó ser senior en empresas anteriores, normalmente ocurría porque sabía mucho de x tecnología y llevaba… https://t.co/npSWj7k1pp",
        referenced_tweets: [{ type: "replied_to", id: "1857623912781410658" }],
        edit_history_tweet_ids: ["1857623914123608480"],
      },
      {
        created_at: "2024-11-16T03:17:08.000Z",
        id: "1857623912781410658",
        text: "Y es un problema que implica performance, storage, y sobretodo comunicación e INFLUENCIA, al motivar a otros equipos a unificar sus approaches a una sola forma\n\nE incluso comenzó un summit (eventos a nivel Google) donde hicieron presentaciones para mantener al tanto a todos los… https://t.co/BYF71usLAD",
        referenced_tweets: [{ type: "replied_to", id: "1857623911376236735" }],
        edit_history_tweet_ids: ["1857623912781410658"],
      },
      {
        created_at: "2024-11-16T03:17:08.000Z",
        id: "1857623911376236735",
        text: "Ya les he compartido del gran peso de los soft skills, y como se combinan con los tech skills para llevar el impacto más allá de tu equipo\n\nPero para darles contexto: prácticamente ella se encargó de lograr un standard en Google para un framework de formato de textos, que implica… https://t.co/5S4g3hdlkj",
        referenced_tweets: [{ type: "replied_to", id: "1857623909794984447" }],
        edit_history_tweet_ids: ["1857623911376236735"],
      },
      {
        created_at: "2024-11-16T03:17:07.000Z",
        id: "1857623909794984447",
        text: "Mi mentora en YouTube (también de mi mismo equipo) tuvo promo a Senior hace unas semanas\n\nY ahora me hacen clicks muchas cosas acerca de ese paso en la promo, sobretodo comparándolo con lo que creía saber que se necesitaba para ello \n\nMini \uD83E\uDDF5",
        edit_history_tweet_ids: ["1857623909794984447"],
      },
      {
        created_at: "2024-11-14T14:58:00.000Z",
        id: "1857075514818617508",
        text: "Linux users... What's your favorite distro?",
        edit_history_tweet_ids: ["1857075514818617508"],
      },
      {
        created_at: "2024-11-06T16:30:40.000Z",
        id: "1854199734501515530",
        text: "What is a Full Stack Engineer? Understand the Foundations, Not Just the Tools  \uD83C\uDFD7️ https://t.co/prZTrNl8RJ",
        attachments: { media_keys: ["7_1854199600908759061"] },
        edit_history_tweet_ids: ["1854199734501515530"],
      },
      {
        created_at: "2024-11-15T20:16:29.000Z",
        id: "1857518054974124469",
        text: "Ayer fui a un lunch con un nuevo amigo de la chamba que es UI designer en el team de YT Shorts\n\nY al final resultó que eramos fans de Matias Duarte, que es VP de diseño en Google \uD83D\uDE02\n\nMatias Duarte es chileno y es una eminencia en cuestión de diseño de interfaces\n\n\uD83E\uDDF5",
        edit_history_tweet_ids: ["1857518054974124469"],
      },
      {
        created_at: "2024-11-15T19:03:02.000Z",
        id: "1857499566893052126",
        text: "Acabo de terminar la primer fase de un design doc que llevo trabajando durante unas semanas a la par de código para validar ideas\n\nLa parte más tricky es que es acerca de un algoritmo, tons tuve que investigar muchos escenarios, y sobretodo registrar el time complexity",
        edit_history_tweet_ids: ["1857499566893052126"],
      },
      {
        created_at: "2024-11-14T18:59:41.000Z",
        id: "1857136339365527773",
        text: "Para mi el contexto es crucial porque si estoy investigando un tema, no solo necesito la respuesta sino indagar en las fuentes\n\nSobretodo en un mundo en que la viralidad implica que una fuente erronea sea posteada en muchos medios, implica que la repetición de un tema no le da… https://t.co/IWudlyRbNi",
        referenced_tweets: [{ type: "replied_to", id: "1857136337641435230" }],
        edit_history_tweet_ids: ["1857136339365527773"],
      },
      {
        created_at: "2024-11-14T18:59:41.000Z",
        id: "1857136337641435230",
        text: "Es mi experiencia también. Cuando hice mi ranking de AIs de Noviembre, les platiqué que aún no me convencía ChatGPTSearch\n\nMe encanta la competencia tho, como usuarios, nos beneficiamos!\n\nY le veo un gran win a que no tenga ads (aún :p)\n\nPero justo sentí esa falta de contexto https://t.co/BwV1kwBbMh",
        referenced_tweets: [{ type: "quoted", id: "1857097010219745668" }],
        edit_history_tweet_ids: ["1857136337641435230"],
      },
      {
        created_at: "2024-11-14T16:23:25.000Z",
        id: "1857097010219745668",
        text: "I've been using @ChatGPTapp Search instead of Google for a week (I switched it in Chrome using a plugin following a @sama recommendation).\n\nResults \uD83D\uDC47\n\n⏳ Bad UX: The results are fairly quick, but the web app takes a few extra seconds to load.\n\n✅ For searches involving a… https://t.co/gUzhkrWKsV https://t.co/AmUhx6heKl",
        attachments: { media_keys: ["3_1857096419909173248"] },
        edit_history_tweet_ids: ["1857097010219745668"],
      },
      {
        created_at: "2024-11-14T18:49:40.000Z",
        id: "1857133817540296878",
        text: "El model experimental más reciente de Gemini acaba de saltar al primer lugar del leaderboard de Chatbot Arena\n\nEste modelo está disponible en Google AI Studio\n\nLe echare un ojo llegando a casa!\n\nTambien saltó al primer lugar en el leaderboard de Vision! https://t.co/cIFbOP16v2",
        referenced_tweets: [{ type: "quoted", id: "1857110672565494098" }],
        edit_history_tweet_ids: ["1857133817540296878"],
      },
      {
        created_at: "2024-11-14T17:17:42.000Z",
        id: "1857110672565494098",
        text: "Massive News from Chatbot Arena\uD83D\uDD25\n\n@GoogleDeepMind's latest Gemini (Exp 1114), tested with 6K+ community votes over the past week, now ranks joint #1 overall with an impressive 40+ score leap — matching 4o-latest in and surpassing o1-preview! It also claims #1 on Vision… https://t.co/8RoIVtytrn https://t.co/HPmcWE6zzI https://t.co/AgfOk9WHNZ",
        attachments: { media_keys: ["3_1857106777764212736"] },
        referenced_tweets: [{ type: "quoted", id: "1857106089063362768" }],
        edit_history_tweet_ids: ["1857110672565494098"],
      },
      {
        created_at: "2024-11-14T03:05:20.000Z",
        id: "1856896167658885266",
        text: "I am MFKN cryyyying!!\n\uD83D\uDE2D\uD83D\uDE2D\uD83D\uDE2D\uD83D\uDE2D https://t.co/2SAGXR0hp7",
        attachments: { media_keys: ["13_1856896114043068417"] },
        edit_history_tweet_ids: ["1856896167658885266"],
      },
      {
        created_at: "2024-11-12T17:43:15.000Z",
        id: "1856392328933748749",
        text: "Para aprender / análisis de artículos / resúmenes: Gemini\n\nY también, gana por mucho. Sobretodo porque su contexto window es gigante, y se nota que tiene esta especialidad en su entrenamiento\n\nPara código es meh. No alucina tanto, pero a veces hay que darle vueltas al prompt para… https://t.co/VIkdzA2sE4",
        referenced_tweets: [{ type: "replied_to", id: "1856392327495069729" }],
        edit_history_tweet_ids: ["1856392328933748749"],
      },
    ],
    media: [
      {
        type: "video",
        media_key: "7_1857607678148882432",
        preview_image_url:
          "https://pbs.twimg.com/ext_tw_video_thumb/1857607678148882432/pu/img/LoyidKTZ3QbCWvbN.jpg",
        duration_ms: 60069,
      },
      {
        type: "photo",
        url: "https://pbs.twimg.com/media/GcXVoD1bIAA5wUH.jpg",
        media_key: "3_1857125305561063424",
      },
    ],
  },
  meta: {
    next_token: "7140dibdnow9c7btw4b1zcg3njj6q2wfik9wgmp98y6gk",
    result_count: 30,
    newest_id: "1858337924070416815",
    oldest_id: "1856845989518479714",
  },
};

export default defineEventHandler(async (event) => {
  const response = mock;
  //   const client = await serverSupabaseClient<Database>(event);

  const tweets: Database["public"]["Tables"]["tweets"]["Insert"][] = [];
  const mediaMap: Record<
    string,
    Database["public"]["Tables"]["tweet_media"]["Insert"]
  > = {};

  for (const media of response.includes.media) {
    // Bluesky does not support videos (yet)
    if (media.type == "video") {
      continue;
    }
    mediaMap[media.media_key] = {
      media_key: media.media_key,
      url: media.url,
      type: media.type,
      preview_image_url: media.preview_image_url,
      duration_ms: media.duration_ms,
    };
  }

  for (const tweet of response.data) {
    // Skip retweets and quotes
    if (tweet.referenced_tweets?.[0]?.type == "quoted") {
      continue;
    }

    const maybeMedia = tweet.attachments?.media_keys?.[0];

    // Skip if the tweet has media that we don't have in the media map.
    // This means the tweet contains media that we don't support yet.
    if (maybeMedia && !mediaMap[maybeMedia]) {
      continue;
    }

    tweets.push({
      tweet_id: tweet.id,
      tweet_text: tweet.text,
      tweet_created_at: tweet.created_at,
      referenced_tweet_id: tweet.referenced_tweets?.[0]?.id,
      tweet_type: tweet.referenced_tweets?.[0]
        ?.type as Database["public"]["Enums"]["tweet_type"],
    });
  }

  //   const tweetsInsert = await client.from("tweets").insert(tweets);
  // const mediaInsert = await client.from("tweet_media").insert({
  //   media_key: "",
  //   type: "",
  // });
  //   const syncStateInsert = await client.from("sync_state").insert({
  //     last_tweet_id: tweets[0].tweet_id,
  //     tweets_synced: tweets.length,
  //   });

  // store media

  return {
    tweets,
    media: Object.values(mediaMap),
  };
});
