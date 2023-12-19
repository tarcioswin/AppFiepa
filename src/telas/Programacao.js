import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import COLORS from '../../components/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const eventsData = [
  {
    date: '19 OUT | Quarta-feira',
    details: [
      {
        time: '17h',
        title: 'Grand Prix SENAI de Inovação - 1º dia',
        location: 'Espaço SENAI de Inovação',
      },
      {
        time: '18h',
        title: 'Abertura da XV Feira da Indústria do Pará',
        location: 'FIEPA',
      },
    ],
  },
  {
    date: '20 OUT | Quinta-feira',
    details: [
      {
        time: '14h',
        title: 'Supply Tank - Rodada REDES FIEPA',
        location: 'Auditório Marajó',
      },
      {
        time: '15h',
        title: 'Exportação: Tecnologia e Estratégia REDES/CIN/CNI',
        location: 'Auditório 12',
      },
      {
        time: '15h',
        title: 'Soluções em Filtração AMAZON TECNOLOGIA',
        location: 'Auditório 09',
      },
      {
        time: '16h',
        title: 'Certificação de Empresas - Estratégias de fora para dentro IEL',
        location: 'Auditório 04',
      },
      {
        time: '17h',
        title: 'Rodada Internacional de Negócios CIN',
        location: 'Auditório Pará',
      },
      {
        time: '17h',
        title: 'Workshop Inovação: Reposicionamento da Marca, com a Libra Design IEL',
        location: 'Multifunctional Room 04',
      },
      {
        time: '17h',
        title: 'Grand Prix SENAI de Inovação - 2º dia SENAI',
        location: 'Espaço SENAI de Inovação',
      },
      {
        time: '18h',
        title: 'Produtos Cerâmicos e a Norma de Desempenho SINDOLPA',
        location: 'Auditório 10',
      },
      {
        time: '18h',
        title: 'Painel Mercado de Trabalho na Indústria Paraense SENAI',
        location: 'Auditório 11',
      },
      {
        time: '18h',
        title: 'Saúde Mental como pilar e estratégia do seu negócio SESI',
        location: 'Auditório 09',
      },
      {
        time: '18h30',
        title: 'Painel Educação e o Futuro do Trabalho SENAI',
        location: 'Auditório Marajó',
      },
      {
        time: '19h',
        title: 'A Saúde Auditiva como Qualidade de Vida no Trabalho e no Ambiente Familiar SESI',
        location: 'Auditório 09',
      },
      {
        time: '19h',
        title: 'Inovar é para todos SENAI - ISI',
        location: 'Auditório 12',
      },
      {
        time: '19h',
        title: 'Perspectivas Econômicas para o Brasil e o Mundo XP INVESTIMENTOS',
        location: 'Auditório 11',
      },
      {
        time: '20h',
        title: 'Palestra Inova Moda Digital SENAI',
        location: 'Auditório 10',
      },
      {
        time: '20h',
        title: 'Evento: A Saúde e Segurança como Boas Práticas SESI',
        location: 'Auditório Marajó',
      },
    ],
  },
  {
    date: '21 OUT | Sexta-feira',
    details: [
      {
        time: '14h',
        title: 'Workshop Moda e Sustentabilidade SENAI DR PA/CETIQT',
        location: 'Auditório 12',
      },
      {
        time: '14h',
        title: 'Grand Prix SENAI de Inovação - 3º dia SENAI',
        location: 'Espaço SENAI de Inovação',
      },
      {
        time: '15h',
        title: 'Lançamento da Campanha Estágio Legal IEL',
        location: 'Auditório 04',
      },
      {
        time: '15h',
        title: 'Hidráulica Conectada HYTEC',
        location: 'Auditório 09',
      },
      {
        time: '16h',
        title: 'Fórum ESG nos Negócios REDES FIEPA',
        location: 'Auditório Marajó',
      },
      {
        time: '16h30',
        title: 'Impulsionando a Transformação Digital - Soluções Pneumáticas',
        location: 'Auditório 09',
      },
      {
        time: '17h',
        title: 'Promovendo o melhor do Brasil no mundo - Apresentação da Gerência de Indústria e Serviço da ApexBrasil CNI/APEX BRASIL',
        location: 'Multifunctional Room 04',
      },
      {
        time: '17h',
        title: 'Inovação na indústria do Pará HYDRO',
        location: 'Auditório 10',
      },
      {
        time: '19h',
        title: 'Inteligência em Gestão da Saúde e Segurança do Trabalho SESI',
        location: 'Auditório 09',
      },
      {
        time: '19h',
        title: 'Mercado Livre de energia - Autoprodução de energia ELETRON ENERGY',
        location: 'Auditório 04',
      },
      {
        time: '19h',
        title: 'Desenvolvimento territorial no contexto amazônico HYDRO',
        location: 'Multifunctional Room 10',
      },
      {
        time: '19h',
        title: 'Florida Connection Road Show CIN/SINDUSCON',
        location: 'Auditório 11',
      },
      {
        time: '21h',
        title: 'Atração de talentos e diversidade & inclusão na indústria do alumínio HYDRO',
        location: 'Multifunctional Room 10',
      },
      {
        time: '21h',
        title: 'Sorteio de Motos FIEPA',
        location: 'Estande de Motos',
      },
    ],
  },
  {
    date: '22 OUT | Sábado',
    details: [
      {
        time: '14h',
        title: 'Grand Prix SENAI de Inovação - Encerramento SENAI',
        location: 'Espaço SENAI de Inovação',
      },
      {
        time: '21h30',
        title: 'Sorteio de Motos FIEPA',
        location: 'Estande de Motos',
      },
    ],
  },
];



const EventItem = ({ event }) => (
  <View style={styles.eventItem}>
    <View style={styles.eventTimeContainer}>
      <Ionicons name="time-outline" size={16} color={COLORS.primary} />
      <Text style={styles.eventTime}>{event.time}</Text>
    </View>
    <Text style={styles.eventTitle}>{event.title}</Text>
    <View style={styles.eventLocationContainer}>
      <Ionicons name="location-outline" size={16} color={COLORS.primary} />
      <Text style={styles.eventLocation}>{event.location}</Text>
    </View>
  </View>
);

const EventDate = ({ date, details }) => (
  <View style={styles.dateContainer}>
    <Text style={styles.dateText}>{date}</Text>
    {details.map((event, index) => (
      <EventItem key={index} event={event} />
    ))}
  </View>
);

const Programacao = () => {
  return (
    <ScrollView style={styles.container}>
      {eventsData.map((day, index) => (
        <EventDate key={index} date={day.date} details={day.details} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Add some space below the time
  },
  eventLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, // Add some space above the location
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray, // Light background color for the overall app
  },
  dateContainer: {
    backgroundColor: COLORS.darkPurple, // Dark background for the date header
    borderRadius: 10,
    margin: 8,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  dateText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventItem: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 8,
    marginTop: 8,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  eventTime: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTitle: {
    color: COLORS.darkGray,
    fontSize: 16,
    marginTop: 4,
  },
  eventLocation: {
    color: COLORS.mediumGray,
    fontSize: 14,
    marginTop: 4,
  },
});

export default Programacao;
