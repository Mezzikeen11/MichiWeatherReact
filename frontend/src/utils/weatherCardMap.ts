// src/utils/weatherCardMap.ts
import MichiSol from "../assets/michis/michi-sol.png";
import MichiParcial from "../assets/michis/michi-parcial.png";
import MichiLluvia from "../assets/michis/michi-lluvia.png";
import MichiNublado from "../assets/michis/michi-nublado.png";

//Ambar
import AuroraSol from "../assets/michis/Aurora/Aurora-sol.png";
import AuroraParcial from "../assets/michis/Aurora/Aurora-agradable.png";
import AuroraLluvia from "../assets/michis/Aurora/Aurora-lluvia.png";
import AuroraNublado from "../assets/michis/Aurora/Aurora-tormenta.png";

//Misha
import MishaSol from "../assets/michis/Misha/Misha-sol.png";
import MishaParcial from "../assets/michis/Misha/Misha-parcial.png";
import MishaLluvia from "../assets/michis/Misha/Misha-lluvia.png";
import MishaNublado from "../assets/michis/Misha/misha-frio-cafe.png";

// opcionales (si los agregas)
//import MichiTormenta from "../assets/michis/michi-tormenta.png";
//import MichiNieve from "../assets/michis/michi-nieve.png";
//import MichiNiebla from "../assets/michis/michi-niebla.png";

import FondoSoleado from "../assets/weather/soleado.png";
import FondoParcial from "../assets/weather/parcial.png";
import FondoLluvioso from "../assets/weather/lluvioso.png";
import FondoNublado from "../assets/weather/nublado.png";

//import FondoTormenta from "../assets/weather/tormenta.png";
//import FondoNieve from "../assets/weather/nieve.png";
//import FondoNiebla from "../assets/weather/niebla.png";

export const weatherCardMap: Record<string, Record<string, { fondo?: string; michi?: string }>> = {
  soleado: {
    MichiSol: { fondo: FondoSoleado, michi: MichiSol },
    AuroraSol: { fondo: FondoSoleado, michi: AuroraSol },
    MishaSol: { fondo: FondoSoleado, michi: MishaSol },
  },
  parcial: {
    MichiParcial: { fondo: FondoParcial, michi: MichiParcial },
    AuroraParcial: { fondo: FondoParcial, michi: AuroraParcial },
    MishaParcial: { fondo: FondoParcial, michi: MishaParcial },
  },
  nublado: {
    MichiNublado: { fondo: FondoNublado, michi: MichiNublado },
    AuroraNublado: { fondo: FondoNublado, michi: AuroraNublado },
    MishaNublado: { fondo: FondoNublado, michi: MishaNublado },
  },
  lluvioso: {
    MichiLluvia: { fondo: FondoLluvioso, michi: MichiLluvia },
    AuroraLluvia: { fondo: FondoLluvioso, michi: AuroraLluvia },
    MishaLluvia: { fondo: FondoLluvioso, michi: MishaLluvia },
  },

  // opcionales
  //tormenta: { fondo: FondoTormenta, michi: MichiTormenta },
  //nieve: { fondo: FondoNieve, michi: MichiNieve },
  //niebla: { fondo: FondoNiebla, michi: MichiNiebla },
};
