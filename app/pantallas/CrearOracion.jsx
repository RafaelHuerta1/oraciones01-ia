/**
 * @nombre: este parametro es el nombre de la persona por la que se esta orando
 * @situacion: este parametro es la situacion por la que esta pasando la persona
 */
import { useState, useEffect } from 'react';
//import { Text } from 'react-native';
//import { Modal, View, Text, StyleSheet } from 'react-native';

//export  let oracionesCreadas = [];
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../../src/firebase';
import { initializeApp } from 'firebase/app';
//import { Alert } from 'react-native';
import { useNavigation, router } from 'expo-router';
import MisOraciones from '../(tabs)/MisOraciones';
import ModalInfo from '../componentes/ModalInf';
import React from 'react';

const app = initializeApp(firebaseConfig);

// createOracion
export default function CreateOracion({ oracionInfo }) {

  // console.log('Si se pasan los valores a create oracion!', oracionInfo.valorName );
  //console.log('Si se pasan los valores a create oracion!',oracionInfo.valorOracion );
  // valorNombre = {valorName: 'Juan', valorOracion: 'padre nuestro'};  

  console.log('Si se pasan los valores a create oracion!', oracionInfo);


  const { valorName, valorOracion, valorSituacion } = oracionInfo;
  console.log('Si se pasan los valores a create oracion!', valorName);
  console.log('Si se pasan los valores a create oracion!', valorOracion);
  console.log('Si se pasan los valores a create oracion!', valorSituacion);

  const [oracionesCreadas, setOracionesCreadas] = useState([]);
  //const [isTrue, setIsTrue] = useState(false); 
  // const [contadorOracion, setContadorOracion] = useState(0);	
  const [modalVisible, setModalVisible] = useState(false);


  /*
  VERSION 2 , 
  const createReflexion = () => {
    console.log('Oremos por ', valorSituacion);
    // conectarme a la api de openai y crear una reflexion
    // enviar la reflexion a la base de datos
    // enviar la reflexion a la pantalla de reflexiones
  
  
  
  }
  */


  const oracionesManana = [
    `Hoy, ${new Date().toLocaleDateString('es-ES')}  Señor, al comenzar este día, te pido por ${valorName} quien enfrenta ${valorSituacion}. Que tu luz guíe sus pasos y tu amor le dé fuerza. Llena su jornada de esperanza y sus decisiones de sabiduría, para que en cada desafío encuentre una oportunidad de crecimiento y en cada alegría un motivo para agradecer. `,
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, al iniciar este día, levanto mi corazón hacia ti en ferviente oración por ${valorName}, quien lleva sobre sus hombros la pesada carga de ${valorSituacion}. En este nuevo amanecer, te imploro que lo envuelvas en tu infinito amor y le concedas la fortaleza necesaria para enfrentar con valentía cada desafío que se presente en su camino. Que la luz de este nuevo día sea un símbolo de las nuevas oportunidades que le ofreces para superar las pruebas que enfrenta y encontrar alegría en las pequeñas bendiciones que la vida le brinda.

    Oh, Dios compasivo, guía sus pasos con tu sabiduría infinita y dale la fuerza para perseverar en la esperanza, incluso en los momentos más difíciles. Que encuentre en tu presencia el consuelo y la fortaleza que necesita para seguir adelante y alcanzar la victoria sobre esta adversidad.
    
    Te ruego, Señor, que derrames tu infinita misericordia sobre ${valorName}, y le concedas la sanación, la paz y la restauración que tanto anhela. Que tu amor lo acompañe en cada paso que dé, y que la luz de tu esperanza lo ilumine en su camino hacia la victoria.`,


    // 3
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre celestial, en la quietud de esta mañana, te presento la vida de ${valorName}, quien se encuentra en una ardua batalla contra ${valorSituacion}. En este nuevo día, te pido que tu presencia reconfortante lo acompañe en cada momento y que tu sabiduría lo guíe en cada decisión que deba tomar.

    Que la esperanza que nace con el sol le inspire a mantener viva la fe y a caminar con confianza bajo tu amorosa mirada. Que la fuerza de tu amor lo sostenga en los momentos de debilidad y le dé la valentía para enfrentar cada desafío con entereza.
    
    Oh, Señor sanador, te ruego por la sanación física y emocional de ${valorName}, Que tu poder milagroso obre en él y le conceda la salud que tanto necesita. Que la luz de tu amor lo llene de fortaleza y le dé la esperanza necesaria para superar esta prueba.`,
    

    // 4  
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de esperanza, con el amanecer renueva la fe de ${valorName}, quien se enfrenta a un momento difícil en su vida debido a ${valorSituacion}. Que la frescura del aire matutino le recuerde tu constante renovación y que la belleza del cielo le hable de tu grandeza y poder infinito.

    En este nuevo día, te pido que le concedas la fortaleza necesaria para enfrentar las adversidades con valentía y esperanza. Que encuentre en cada momento del día un recordatorio de tu amor inquebrantable y tu fidelidad inagotable.
    
    Oh, Señor compasivo, que tu luz ilumine su camino y le guíe hacia la paz y la tranquilidad que tanto anhela. Que la esperanza que nace con cada nuevo amanecer le dé la fuerza para seguir adelante y superar cualquier obstáculo que se presente en su camino. `,



    //5
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Amado Creador, en esta mañana te pido por ${valorName}, quien se encuentra en medio de ${valorSituacion}, buscando desesperadamente paz y consuelo. Que la serenidad del amanecer le traiga la tranquilidad que tanto anhela y que la calidez de los primeros rayos de sol le brinde consuelo y esperanza.

    En este nuevo día, te ruego que lo rodees con tu amor infinito y le concedas la paz que solo tú puedes dar. Que cada paso que dé hoy esté acompañado por tu gracia y tu amor incondicional, guiándolo hacia un lugar de tranquilidad y sanación.
    
    Oh, Señor misericordioso, que tu presencia lo envuelva y le brinde el consuelo que necesita en este momento tan difícil. Que en tu amor encuentre el refugio y la fortaleza que le permitirán superar cualquier adversidad.`,



    // 6
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Misericordioso Señor, que este nuevo día sea un testimonio de tu amor infinito para  ${valorName}, quien enfrenta ${valorSituacion}, sintiendo la soledad como una pesada carga. Que la sinfonía de la vida que despierta a su alrededor le recuerde que no está solo y que tu mano está siempre extendida para sostenerlo y guiarlo.

    En este amanecer, te pido que le concedas la compañía de personas bondadosas y amorosas que le brinden el apoyo y el afecto que tanto necesita. Que en las relaciones que lo rodean encuentre el calor humano que le permita sentirse amado y valorado.`,


    // 7
    `Hoy, ${new Date().toLocaleDateString('es-ES')} En la frescura de esta mañana, te pido por  ${valorName},  oramos por su necesidad; ${valorSituacion}, buscando sabiduría y dirección para su vida. Que la claridad del amanecer le ofrezca una visión renovada de su camino y que la suave brisa le hable de tu presencia constante en su vida.

    En este nuevo día, te ruego que le concedas la sabiduría necesaria para tomar decisiones acertadas y que lo guíes hacia el camino que has preparado para él. Que en tu palabra encuentre la guía y la dirección que busca, y que en tu amor encuentre el refugio y la fortaleza que necesita.
    
    Oh, Señor, que ilumine su mente con tu luz divina y le revele tu voluntad para su vida. Que en la oración encuentre la comunión contigo y la paz que tanto anhela.`,


    // 8 
    `Hoy, ${new Date().toLocaleDateString('es-ES')} , Señor de bondad, en este nuevo día, te ruego por ${valorName}, quien te pide hoy por la sig necesidad; ${valorSituacion}, Que la promesa de un nuevo comienzo que trae cada mañana le inspire a mirar hacia adelante con esperanza y determinación. Que tu amor sea la fuente de su fortaleza y tu misericordia el cimiento de su fe.

    En este amanecer, te pido que le concedas la fuerza necesaria para enfrentar cada obstáculo con valentía y perseverancia. Que no se desanime ante las dificultades, sino que las vea como oportunidades para crecer y fortalecer su fe en ti.
    
    Oh, Señor compasivo, que tu presencia lo acompañe en cada paso que dé y le dé la confianza necesaria para alcanzar la victoria sobre este obstáculo. Que en tu amor encuentre la motivación y el impulso que necesita para seguir adelante.`,


    // 9
    `Hoy, ${new Date().toLocaleDateString('es-ES')} , Dios de amor, en esta mañana, te presento a ${valorName}, quien necesita con urgencia una dosis de esperanza y aliento hoy te pide por la sig necesidad,  ${valorSituacion}, Que la luz que se filtra a través de las hojas le recuerde que incluso en los momentos de sombra, tu luz siempre encuentra un camino para iluminar su vida.

    En este nuevo día, te ruego que le concedas la esperanza necesaria para creer en un futuro mejor. Que sienta tu abrazo en el calor del sol y tu aliento en el viento que acaricia su rostro.
    
    Oh, Señor compasivo, que tu amor lo llene de optimismo y le dé la fuerza necesaria para enfrentar cada desafío con una sonrisa. Que en tu presencia encuentre la paz y la tranquilidad que tanto anhela.`,


    // 10
    `Hoy, ${new Date().toLocaleDateString('es-ES')} , Padre, en la serenidad de esta mañana, te pido por ${valorName}, Que esta pasando por problemas dificiles es por eso que te pedimos : ${valorSituacion}, encuentre la fortaleza y la guía en tu palabra. Que las historias de fe y perseverancia en las Escrituras sean un faro de luz en su camino y que la comunión contigo en la oración sea su mayor consuelo.

    En este nuevo día, te ruego que abras su corazón para que reciba tu mensaje de amor y esperanza. Que en la lectura de la Biblia encuentre la sabiduría y la dirección que necesita para superar cualquier obstáculo.
    
    Oh, Señor, que su fe en ti sea un escudo poderoso que lo proteja de las adversidades y le dé la fuerza necesaria para seguir adelante en tu camino. Que en tu amor encuentre la paz y la seguridad que tanto anhela.`,


  ];

  const oracionesNoche = [
    // 1
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, al comenzar este día, te pido por ${valorName} quien enfrenta el/la siguiente problema ${valorSituacion}. Que tu luz guíe sus pasos y tu amor le dé fuerza. Llena su jornada de esperanza y sus decisiones de sabiduría, para que en cada desafío encuentre una oportunidad de crecimiento y en cada alegría un motivo para agradecer.`,
    

    // 2
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre celestial, mientras la noche despliega su manto estrellado, te pido por ${valorName}, quien lleva en su corazón la sig preocupacion:  ${valorSituacion}. Que la calma de la oscuridad le traiga paz a su mente y que el silencio de la noche sea el espacio sagrado para su descanso y renovación. Que sienta tu presencia como un faro de esperanza en la inmensidad del cielo nocturno.`,


    // 3
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, en la quietud de esta noche, elevo una oración por ${valorName}, y te pedimos por la siguiente/s necesida/es ${valorSituacion}. Que encuentre en el silencio nocturno la fortaleza para superar sus desafíos y la esperanza para un nuevo amanecer lleno de posibilidades y tu gracia infinita. Que la luna sea testigo de su crecimiento y transformación bajo tu amoroso cuidado.`,


    // 4
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de misericordia, bajo el manto protector de la noche, te pido por ${valorName} y su situación de ${valorSituacion}. Que el descanso que buscan sus ojos sea también el descanso para su alma agitada, y que tu amor sea el guardián de sus sueños, llevándolo a través de paisajes de paz y serenidad en su mente y corazón.`,


    // 5
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Amado Señor, mientras las sombras se alargan y el mundo se sumerge en el descanso, te ruego por  ${valorName} , que lucha con  ${valorSituacion}, Que la serenidad de la luna le inspire confianza y que la brisa nocturna le susurre tus palabras de consuelo, recordándole que cada noche es una oportunidad para cerrar ciclos y comenzar de nuevo con tu bendición.`,


    // 6
    `Hoy, ${new Date().toLocaleDateString('es-ES')} En la penumbra de la noche, te pido por ${valorName} , que se ve abrumado por  ${valorSituacion}. Que la tranquilidad de la noche le brinde claridad y que tu presencia le ofrezca un refugio seguro donde pueda descansar su espíritu y encontrar la guía para el camino que debe tomar al amanecer.`,
  
  
  
    // 7
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor de la noche, te pido por ${valorName}, que busca tu guía en ${valorSituacion}. Que la majestuosidad del cielo nocturno le recuerde la magnitud de tu poder y la profundidad de tu cuidado. Que las constelaciones sean el mapa que le muestre que, en tu voluntad, hay un diseño divino y un propósito para cada estrella, incluida la suya.`,
    


    // 8
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre, en el silencio de esta noche, te pido por ${valorName}, y su ${valorSituacion}. Que la suave oscuridad sea un bálsamo para su espíritu y que la promesa de la aurora le traiga renovación y esperanza. Que en la quietud pueda escuchar tu voz y sentir tu consuelo, sabiendo que no hay noche que tu amor no pueda iluminar.`,


    // 9
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de paz, mientras todo se aquieta y el mundo se prepara para el descanso, te pido por ${valorName}, quien se enfrenta a ${valorSituacion}. Que el misterio de la noche le revele la certeza de tu gracia y que el firmamento estrellado le hable de tu gloria, recordándole que cada día es un regalo y cada noche una bendición.`,

    // 10
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, en la intimidad de esta noche, te pido por ${valorName}, que siente el peso de ${valorSituacion}. Que el velo nocturno le recuerde que no hay oscuridad que tu luz no pueda penetrar y que la luna le sirva de faro en la oscuridad, guiándolo hacia la tranquilidad y la certeza de que está seguro en tus manos.`,

    // 11
    `Hoy, ${new Date().toLocaleDateString('es-ES')} En la profundidad de la noche, te pido por ${valorName}, que busca solución a ${valorSituacion}. Que la quietud le permita escuchar tu voz y que la frescura de la noche le renueve el alma, dándole la fuerza para enfrentar lo que viene con la luz del alba, armado con fe y esperanza en tu providencia.`,

    // 12
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre amoroso, en la paz de esta noche, te pido por ${valorName}, que se encuentra en medio de ${valorSituacion}. Que la armonía del mundo en reposo le inspire a encontrar equilibrio en su vida y que tu protección le asegure un descanso reparador, preparándolo para los desafíos y las bendiciones del mañana.`,

    // 13
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor de las estrellas, te pido por ${valorName}, que anhela alivio para ${valorSituacion}. Que la inmensidad del cielo nocturno le recuerde la infinitud de tu amor y que la luna le sirva de faro en la oscuridad, guiándolo hacia la tranquilidad y la certeza de que está seguro en tus manos.`,


    // 14
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de consuelo, en la cobertura de la noche, te pido por ${valorName} y su ${valorSituacion}. Que el susurro del viento nocturno le lleve tus palabras de paz y que el abrazo de la oscuridad sea un recordatorio de tu presencia constante, ofreciéndole la seguridad de que, contigo, nunca está solo.`,


    // 15
    `Hoy, ${new Date().toLocaleDateString('es-ES')} En la calma de esta noche, te pido por ${valorName}, que enfrenta ${valorSituacion}. Que el canto de los grillos le recuerde que la vida continúa su melodía y que tu amor es la canción que nunca cesa, una melodía que lo acompaña incluso en los momentos de soledad y reflexión.`,


    // 16
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, mientras el mundo descansa, te pido por ${valorName}, que busca respuestas para ${valorSituacion}. Que la suavidad de la noche le inspire pensamientos de serenidad y que la luz de las estrellas le guíe hacia la sabiduría, mostrándole que cada noche es una oportunidad para aprender y crecer en tu gracia.`,

    // 17

    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre, en el abrazo de la noche, te pido por ${valorName}, que se debate con ${valorSituacion}. Que el frescor de la noche le traiga alivio y que la quietud le ofrezca un espacio para la reflexión y la oración, donde pueda encontrar las respuestas que busca en la intimidad de su corazón con tu espíritu.`,

    // 18
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de la creación, en la belleza de esta noche, te pido por ${valorName}, que busca superar ${valorSituacion}. Que el orden celestial le recuerde que hay un propósito divino en todo y que la paz de la noche le confirme tu amor eterno, llenándolo de confianza para enfrentar lo que el destino le depare.`,

    // 19
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, en la oscuridad de esta noche, te pido por ${valorName}, que se siente perdido ante ${valorSituacion}. Que la constancia de las constelaciones le recuerde tu fidelidad y que el silencio le permita encontrarse contigo, descubriendo en la profundidad de la noche la luz de tu guía y la calidez de tu compasión.`,

    // 20
    `Hoy, ${new Date().toLocaleDateString('es-ES')} En la tranquilidad de la noche, te pido por ${valorName}, que busca la luz en ${valorSituacion}. Que la suave luz de la luna le muestre el camino y que la quietud le brinde momentos de introspección y conexión contigo, encontrando en la oración nocturna la fuerza para continuar su viaje espiritual.`,

    // 21
    `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre de la noche, te pido por ${valorName}, que se enfrenta a ${valorSituacion}. Que la suavidad del manto nocturno le recuerde tu protección y que el descanso que viene con la noche le prepare para los desafíos y las bendiciones del mañana, sabiendo que cada amanecer es un testimonio de tu amor renovado y tu compromiso con cada uno de tus hijos.`



    
  ];

  const oracionesEnfermos = [
      // 1
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre amoroso, en la quietud de esta habitación, te pido por ${valorName}, quien enfrenta la prueba de ${valorSituacion}. Que la luz de tu consuelo ilumine su espíritu y que la esperanza de tu promesa de sanación fortalezca su cuerpo y su alma. En la soledad de la noche, que sienta la compañía de tus ángeles y la certeza de tu amor inagotable. Que cada susurro de la brisa nocturna sea un mensaje de esperanza y cada estrella en el cielo, un recordatorio de tu presencia vigilante.`,

      // 2
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor de misericordia, te presento a ${valorName}, que sufre por ${valorSituacion}. Que tu presencia sea un bálsamo sanador sobre sus heridas y que la fe en tu poder restaurador sea la fuerza que impulse cada latido de su corazón. En cada respiración, que encuentre la paz que sobrepasa todo entendimiento y que en cada latido de su corazón, encuentre la certeza de tu amor inagotable.`,

      // 3
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de esperanza, acudo a ti por ${valorName}, quien enfrenta la prueba de ${valorSituacion}. Que cada palabra de aliento sea un eco de tu voz y que cada gesto de cuidado sea un reflejo de tus manos sanadoras. Que en cada respiración, sienta la paz que sobrepasa todo entendimiento y que en cada latido de su corazón, encuentre la certeza de tu amor inagotable.`,

      // 4
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Amado Creador, en tu sabiduría infinita, te pido por ${valorName} y su desafío con ${valorSituacion}. Que la certeza de tu plan perfecto le dé la valentía para enfrentar cada día y que la gracia de tu voluntad le revele el camino hacia la recuperación y la plenitud de vida. Que en cada respiración, encuentre la paz que sobrepasa todo entendimiento y que en cada latido de su corazón, encuentre la certeza de tu amor inagotable.`,

      // 5
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor Todopoderoso, te suplico por ${valorName}, que se encuentra en el valle de ${valorSituacion}. Que la fuerza de tu amor lo sostenga y que la luz de tu guía lo conduzca a través de la oscuridad hacia un amanecer de salud y vitalidad renovadas. Que cada noche de insomnio sea una oportunidad para confiar en tu poder sanador.`,

      // 6
      `Hoy, ${new Date().toLocaleDateString('es-ES')} En la tranquilidad de este momento, te pido por ${valorName}, que busca alivio en ${valorSituacion}. Que la noche le traiga descanso y que el nuevo día le traiga tu sanación. Que en su debilidad, tu poder se manifieste y que en su dolor, tu consuelo sea su refugio. Que cada latido de su corazón sea un recordatorio de tu amor inquebrantable.`,

      // 7
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre, en la intimidad de esta oración, te pido por ${valorName} y su lucha con ${valorSituacion}. Que la confianza en tu providencia sea la luz que guíe su camino y que la esperanza en tu misericordia sea la ancla que mantenga firme su fe. Que cada paso que dé hacia la recuperación sea un testimonio de tu gracia.`,

      // 8
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de bondad, te pido por ${valorName}, que se enfrenta a ${valorSituacion}. Que la compasión de tu corazón toque su vida y que la promesa de tu cuidado eterno le dé la seguridad de que no está solo en esta batalla. Que cada palabra de aliento que reciba sea un eco de tu voz, y que cada gesto de cuidado que experimente sea un reflejo de tus manos sanadoras.`,

      // 9
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, en la calma de esta noche, te pido por ${valorName}, que se siente abrumado por ${valorSituacion}. Que la profundidad de tu paz llene su habitación y que el susurro de tu amor le hable directamente al corazón. Que encuentre en la quietud de la noche un espacio sagrado para su descanso y renovación, y que en cada sueño encuentre un refugio en tu presencia.`,

      // 10
      `Hoy, ${new Date().toLocaleDateString('es-ES')} En la oscuridad de esta noche, te presento a ${valorName}, quien lucha contra ${valorSituacion}. Que la certeza de tu plan perfecto le dé la valentía para enfrentar cada día y que la gracia de tu voluntad le revele el camino hacia la recuperación y la plenitud de vida. Que en su debilidad, encuentre tu fortaleza, y en su dolor, encuentre tu consuelo.`,

      // 11
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de esperanza, acudo a ti por ${valorName}, quien enfrenta la prueba de ${valorSituacion}. Que cada palabra de aliento sea un eco de tu voz y que cada gesto de cuidado sea un reflejo de tus manos sanadoras. Que en cada respiración, encuentre la paz que sobrepasa todo entendimiento y que en cada latido de su corazón, encuentre la certeza de tu amor inagotable.`,

      // 12
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor Todopoderoso, te presento a ${valorName}, que se encuentra en el valle de ${valorSituacion}. Que la fuerza de tu amor lo sostenga y que la luz de tu guía lo conduzca a través de la oscuridad hacia un amanecer de salud y vitalidad renovadas. Que cada noche de insomnio sea una oportunidad para confiar en tu poder sanador.`,

      // 13
      `Hoy, ${new Date().toLocaleDateString('es-ES')} En la tranquilidad de este momento, te pido por ${valorName}, que busca alivio en ${valorSituacion}. Que la noche le traiga descanso y que el nuevo día le traiga tu sanación. Que en su debilidad, tu poder se manifieste y que en su dolor, tu consuelo sea su refugio. Que cada latido de su corazón sea un recordatorio de tu amor inquebrantable.`,

      // 14
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre, en la intimidad de esta oración, te pido por ${valorName} y su lucha con ${valorSituacion}. Que la confianza en tu providencia sea la luz que guíe su camino y que la esperanza en tu misericordia sea la ancla que mantenga firme su fe. Que cada paso que dé hacia la recuperación sea un testimonio de tu gracia.`,

      // 15
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de bondad, te pido por ${valorName}, que se enfrenta a ${valorSituacion}. Que la compasión de tu corazón toque su vida y que la promesa de tu cuidado eterno le dé la seguridad de que no está solo en esta batalla. Que cada palabra de aliento que reciba sea un eco de tu voz, y que cada gesto de cuidado que experimente sea un reflejo de tus manos sanadoras.`,

      // 16
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor, en la calma de esta noche, te pido por ${valorName}, que se siente abrumado por ${valorSituacion}. Que la profundidad de tu paz llene su habitación y que el susurro de tu amor le hable directamente al corazón. Que encuentre en la quietud de la noche un espacio sagrado para su descanso y renovación, y que en cada sueño encuentre un refugio en tu presencia.`,

      // 17
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Dios de esperanza, acudo a ti por ${valorName}, quien enfrenta la prueba de ${valorSituacion}. Que cada palabra de aliento sea un eco de tu voz y que cada gesto de cuidado sea un reflejo de tus manos sanadoras. Que en cada respiración, encuentre la paz que sobrepasa todo entendimiento y que en cada latido de su corazón, encuentre la certeza de tu amor inagotable.`,

      // 18
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Señor Todopoderoso, te presento a ${valorName}, que se encuentra en el valle de ${valorSituacion}. Que la fuerza de tu amor lo sostenga y que la luz de tu guía lo conduzca a través de la oscuridad hacia un amanecer de salud y vitalidad renovadas. Que cada noche de insomnio sea una oportunidad para confiar en tu poder sanador.`,

      // 19
      `Hoy, ${new Date().toLocaleDateString('es-ES')} En la tranquilidad de este momento, te pido por ${valorName}, que busca alivio en ${valorSituacion}. Que la noche le traiga descanso y que el nuevo día le traiga tu sanación. Que en su debilidad, tu poder se manifieste y que en su dolor, tu consuelo sea su refugio. Que cada latido de su corazón sea un recordatorio de tu amor inquebrantable.`,

      // 20
      `Hoy, ${new Date().toLocaleDateString('es-ES')} Padre, en la intimidad de esta oración, te pido por ${valorName} y su lucha con ${valorSituacion}. Que la confianza en tu providencia sea la luz que guíe su camino y que la esperanza en tu misericordia sea la ancla que mantenga firme su fe. Que cada paso que dé hacia la recuperación sea un testimonio de tu gracia.`,

  ]

  const oracionesDifuntos = [
    // 1
    `Hoy, ${new Date().toLocaleDateString('es-ES')} "Señor de bondad, acogemos en tu presencia a ${valorName}. Que encuentre en tu reino la paz eterna y que su alma sea bañada en la luz de tu amor. Concede consuelo a quienes lo(a) lloran y que su recuerdo sea una guía de amor y esperanza."`,
  ]
  
  /**
    1. "Señor de bondad, acogemos en tu presencia a **[Nombre del Difunto]**. Que encuentre en tu reino la paz eterna y que su alma sea bañada en la luz de tu amor. Concede consuelo a quienes lo(a) lloran y que su recuerdo sea una guía de amor y esperanza."

2. "Padre celestial, recordamos a **[Nombre del Difunto]** con cariño y te pedimos que lo(a) recibas en la paz de tu morada. Que su legado de bondad perdure y que su espíritu descanse en la alegría de tu presencia eterna."

3. "Dios misericordioso, encomendamos a **[Nombre del Difunto]** a tu infinita compasión. Que su viaje hacia ti esté lleno de gracia y que su memoria inspire actos de bondad y misericordia en todos nosotros."

4. "Amado Creador, te presentamos a **[Nombre del Difunto]**. Que su alma repose en la serenidad de tu reino y que su vida sea recordada como un reflejo de tu luz. Que su familia encuentre consuelo y paz en tu promesa de vida eterna."

5. "Señor Todopoderoso, te pedimos por **[Nombre del Difunto]**. Que su paso por este mundo sea honrado y que su alma goce del descanso eterno en tu amor. Que su recuerdo sea un bálsamo para los corazones afligidos."

6. "En la solemnidad de este momento, te pido por **[Nombre del Difunto]**. Que su alma sea acogida en tu reino de amor y que su presencia entre nosotros sea recordada con gratitud y alegría."

7. "Padre eterno, en la inmensidad de tu gracia, recibimos a **[Nombre del Difunto]**. Que su espíritu se eleve en la libertad de tu amor y que su recuerdo sea un tesoro en nuestros corazones."

8. "Dios de consuelo, ante la partida de **[Nombre del Difunto]**, buscamos refugio en tu gracia. Que su alma encuentre la paz perfecta en tu presencia y que su legado sea un motivo de orgullo y consuelo."

9. "Señor, en la calma de esta noche, te pido por **[Nombre del Difunto]**. Que su alma encuentre el camino hacia la luz de tu rostro y que su vida sea celebrada con amor y esperanza."

10. "En la oscuridad de esta noche, te presentamos a **[Nombre del Difunto]**. Que su alma descanse en la paz de tu amor eterno y que su recuerdo sea una llama de esperanza y guía."

11. "Dios de esperanza, acudimos a ti por **[Nombre del Difunto]**. Que su alma sea recibida con alegría en tu reino y que su influencia continúe a través de actos de bondad y compasión."

12. "Señor Todopoderoso, te suplicamos por **[Nombre del Difunto]**. Que su espíritu sea elevado a la gloria de tu reino y que su memoria sea un consuelo para nuestros corazones."

13. "En la quietud de esta habitación, te pido por **[Nombre del Difunto]**. Que su alma sea acogida con júbilo en tu reino y que su vida sea un reflejo de tu amor y gracia."

14. "Amado Creador, en tu reino de amor eterno, has recibido a **[Nombre del Difunto]**. Que su presencia entre nosotros sea recordada con cariño y que su paso por la vida sea un testimonio de tu misericordia."

15. "Señor de misericordia, te presentamos a **[Nombre del Difunto]**. Que su alma sea envuelta en la paz de tu amor y que su influencia en la tierra sea un legado de esperanza y fe."

16. "Dios de esperanza, acudimos a ti por **[Nombre del Difunto]**. Que su alma sea recibida con alegría en tu reino y que su influencia continúe a través de actos de bondad y compasión."

17. "Señor Todopoderoso, te suplicamos por **[Nombre del Difunto]**. Que su espíritu sea elevado a la gloria de tu reino y que su memoria sea un consuelo para nuestros corazones."

18. "En la quietud de esta habitación, te pido por **[Nombre del Difunto]**. Que su alma sea acogida con júbilo en tu reino y que su vida sea un reflejo de tu amor y gracia."

19. "Amado Creador, en tu reino de amor eterno, has recibido a **[Nombre del Difunto]**. Que su presencia entre nosotros sea recordada con cariño y que su paso por la vida sea un testimonio de tu misericordia."

20. "Señor de misericordia, te presentamos a **[Nombre del Difunto]**. Que su alma sea envuelta en la paz de tu amor y que su influencia en la tierra sea un legado de esperanza y fe."

   */

  function almacenarOracionUsuario(oracionesCreadas, valorName, valorOracion, valorSituacion) {


    const db = getDatabase();
    const uid = getAuth().currentUser.uid;
    //let contadorOracionn = 0;
    //const nombre2 = valorName;
    //console.log(uid);
    // fc traer el userName
    //const userName = getAuth().currentUser.displayName;
    //console.log(userName);
    const reference = ref(db, "users/" + uid + "/oraciones/");
    //console.log('Numero de oraciones: ', contadorOracion);
    const oracionData = {
      nombre: valorName,
      oracionesCreadas: oracionesCreadas,
      oracion: valorOracion,
      situacion: valorSituacion,
    };

    push(reference, oracionData);




  }

  /** 
   *  - Credo de los apostoles -
   *  - Salve reina -
   *  - Gloria al padre -
    *  - Angel de mi guardia, -
    *  - Oracion de la noche -
    * - Oracion de la mañana -
    * - Oracion de la tarde version02
    * - Oracion de agradecimiento, version02
   * - Enfermos -
   * * - difuntos
   *  * Fortaleza
   * * Depresion
   * Protección y Seguridad
   * 
   */



  useEffect(() => {
    let oracion = null;
//    let promptOracion = null;

    switch (valorOracion) {
      case 'padre nuestro':
        // mensajeDeAliento = `Recuerda,   ${valorName}  , que siempre estás en las manos de Dios y nunca estás solo. Él te guiará a través de estos tiempos difíciles.`;
        // name , mensaje de aliento, oracion x 

        oracion = `Hoy, ${new Date().toLocaleDateString('es-ES')}, elevamos nuestro corazón y mente en oración por nuestra/a querida/o ${valorName}. ` + `que esta pasando problemas dificiles, oramos por ${valorSituacion} ` +
          `Padre nuestro, que estás en los cielos, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad, así en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén. ` +
          `Con fe y devoción, pedimos que la luz divina ilumine tu camino y te ofrezca consuelo en los momentos de incertidumbre. Que la fuerza del Altísimo te sostenga y te brinde paz interior.`;

        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);

        break;
      case 'ave maria':
        oracion = `Hoy, ${new Date().toLocaleDateString('es-ES')}, elevamos nuestro corazón y mente en oración por nuestra/a querida/o ${valorName}. ` + `que esta pasando problemas dificiles, oramos por ${valorSituacion} ` +
          `Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén. ` +
          `Con esperanza y cariño, rogamos que la gracia de la Virgen María te acompañe, te proteja y te guíe hacia la felicidad y el bienestar. Que su manto sagrado te cubra y te dé confort.`

        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);


        break;
      case 'gloria al padre':
        oracion = `Hoy, ${new Date().toLocaleDateString('es-ES')}, elevamos nuestro corazón y mente en oración por nuestra/a querida/o ${valorName}. ` + `que esta pasando problemas dificiles, oramos por ${valorSituacion} ` +
          `Gloria al Padre, al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén. ` +
          `Con reverencia y amor, invocamos la presencia del Espíritu Santo para que te envuelva en su calma y sabiduría. Que la armonía celestial inspire tu vida y te llene de gratitud y alegría.`;
        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);


        break;


      case 'la salve':
        oracion = `Hoy, ${new Date().toLocaleDateString('es-ES')}, elevamos nuestro corazón y mente en oración por nuestra/a querida/o ${valorName}. ` + `que esta pasando problemas dificiles, oramos por ${valorSituacion} ` +
          `Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. Oh clemente, oh piadosa, oh dulce Virgen María. Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén. ` +
          `Que la ternura de María, Madre de Misericordia, te envuelva en su abrazo celestial. Que su amor te fortalezca y te guíe hacia la luz de su Hijo, trayendo paz a tu corazón y claridad a tu camino. Amén.`;
        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);

        break;

      case 'angel de mi guarda':
        oracion = `Hoy, ${new Date().toLocaleDateString('es-ES')}, elevamos nuestro corazón y mente en oración por nuestra/a querida/o ${valorName}. ` + `que esta pasando problemas dificiles, oramos por ${valorSituacion} ` +
          `Ángel de mi guarda, dulce compañía, no me desampares, ni de noche ni de día. Hasta que me entregues en los brazos de Jesús, José y María. Con tus alas me persigno y me abrazo de la cruz,
        y en mi corazón me llevo al dulcísimo Jesús. Con Dios me acuesto, con Dios me levanto,con la Virgen María y el Espíritu Santo.` +
          `Que el susurro de tu Ángel de la Guarda sea un bálsamo en tus días, una luz en tus noches, y un guía en cada paso. Que su presencia celestial te inspire confianza y te llene de gracia, hoy y siempre. Amén.`;


        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion]);

        break;

      case 'oracion por la mañana':
        const indiceAleatorio = Math.floor(Math.random() * oracionesManana.length);
        const oraciones1 = oracionesManana[indiceAleatorio];
        setOracionesCreadas((prevOraciones) => [...prevOraciones, oraciones1]);

        break;
      case 'oracion por la noche':
        const indiceAleatorio2 = Math.floor(Math.random() * oracionesNoche.length);
        const oracion2 = oracionesNoche[indiceAleatorio2];
        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion2]);

        break;

      case 'oracion por los enfermos':
        const indiceAleatorio3 = Math.floor(Math.random() * oracionesEnfermos.length);
        const oracion3 = oracionesEnfermos[indiceAleatorio3];
        setOracionesCreadas((prevOraciones) => [...prevOraciones, oracion3]);


      default:
        console.log("No se ha seleccionado ninguna oración");
        break;
    }




  }, [valorName, valorOracion]);

  useEffect(() => {
    // let numeroOracion = 0;
    if (oracionesCreadas.length > 0) {
      // console.log('Oraciones creadas: ', oracionesCreadas);

      // console.log('Numero de oraciones: ', numeroOracion);
      almacenarOracionUsuario(oracionesCreadas, valorName, valorOracion, valorSituacion);
    }
    // router.push('../(tabs)/MisOraciones', { oracionesCreadas: oracionesCreadas });


  }, [oracionesCreadas]);


  //{ oracionesCreadas  ? <MisOraciones valorName={ valorName }  valorOracion={valorOracion}  /> : null  }  


  return null;
}

