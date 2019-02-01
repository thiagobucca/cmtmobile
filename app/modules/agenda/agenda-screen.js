import { LocaleConfig,Agenda } from 'react-native-calendars';
import { View, Alert } from 'react-native';
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import t from 'tcomb-form-native'


import AgendaEventoActions from '../entities/agenda-eventos/agenda-eventos.reducer'

import { StyleSheet } from 'react-native'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

//import styles from './agenda-screen.styles'

LocaleConfig.locales.pt = {
  monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
  dayNames: ['Domingo', 'Segundo', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
};

LocaleConfig.defaultLocale = 'pt';
//LocaleConfig.locales.en = LocaleConfig.locales[''];

class AgendaScreen extends React.Component {


  constructor(props) {
   // LocaleConfig.defaultLocale = props.languageCode;
    super(props)
    this.state = {
      agendaEventosModel: t.struct({
        titulo: t.maybe(t.String),
        data: t.Date,
        local: t.String,
        descricao: t.maybe(t.String)
      }),
      agendaEventosValue: this.props.agendaEventos,
      items: {[new Date().toLocaleString("sv-SE", {timeZone: "America/Sao_Paulo"}).toString().substring(0,10)]: []},
      diaAtual: new Date().toLocaleString("sv-SE", {timeZone: "America/Sao_Paulo"}).toString().substring(0,10)
    };
  }

  componentDidMount() {

     console.log("LOGANDO DIA ATUAL",this.state.diaAtual)

}

fetchAgendaEventos = () => {
  this.props.getAllAgendaEventos({ page: this.state.page, sort: this.state.sort, size: this.state.size })
}

handleLoadMore = () => {
  if (this.state.done || this.props.fetching) {
    return
  }
  this.setState({
    page: this.state.page + 1,
    loading: true
  })
  this.fetchAgendaEventos()
}

componentWillReceiveProps (newProps) {
  if (newProps.agendaEventos) {
    console.log("logando agenda",newProps.agendaEventos)
    console.log("logando states", this.state)
    this.setState({
      done: newProps.agendaEventos.length < this.state.size,
      dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.agendaEventos] : newProps.agendaEventos,
      loading: false
    })
  }
}


  agendaEventosChange (newValue) {
    this.setState({
      agendaEventosValue: newValue
    })
  }

  componentWillMount () {
    this.fetchAgendaEventos()
  }

  render() {
    return (
      <Agenda
      items={this.state.items}
      loadItemsForMonth={this.loadItems.bind(this)}
      selected={this.state.diaAtual}
      renderItem={this.renderItem.bind(this)}
      renderEmptyDate={this.renderEmptyDate.bind(this)}
      rowHasChanged={this.rowHasChanged.bind(this)}
      markingType={'interactive'}
      markedDates={{
        '2017-05-08': [{textColor: '#666'}],
        '2017-05-09': [{textColor: '#666'}],
        '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
        '2017-05-21': [{startingDay: true, color: 'blue'}],
        '2017-05-22': [{endingDay: true, color: 'gray'}],
        '2017-05-24': [{startingDay: true, color: 'gray'}],
        '2017-05-25': [{color: 'gray'}],
        '2017-05-26': [{endingDay: true, color: 'gray'}]}}
       monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
/>
    );
  }


  loadItems(day) {
    setTimeout(() => {
      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = Math.floor(Math.random() * 5);
      //     // for (let j = 0; j < numItems; j++) {

      //     //   this.state.items[strTime].push({
      //     //     name: 'Item for ' + strTime,
      //     //     height: Math.max(50, Math.floor(Math.random() * 150))
      //     //   });
      //     // }
      //   }
      // }

      if(this.props.agendaEventos.length > 0)
      {
         console.log("caiu if", this.state.diaAtual)
        this.state.items[this.props.agendaEventos[0].data.toString().substring(0,10)]
        this.state.diaAtual = this.props.agendaEventos[0].data.toString().substring(0,10)

        console.log("depois", this.state.diaAtual)
      }else
      {
        this.state.items[this.state.diaAtual] = [];
      }

      this.props.agendaEventos.forEach(agendaEvento => {


        this.state.items[agendaEvento.data.toString().substring(0,10)] = [];
        this.state.items[agendaEvento.data.toString().substring(0,10)].push({
          name: agendaEvento.titulo,
          height: Math.max(50, Math.floor(Math.random() * 150))
        });
       // console.log("logando agendas")
       // console.log(agendaEvento.data.toString().substring(0,10))


      })

      console.log("logando state items",this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {

    console.log("logando item",item)
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    agendaEventos: state.agendaEventos.agendaEventos,
    fetching: state.agendaEventos.fetchingAll,
    error: state.agendaEventos.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAgendaEventos: (options) => dispatch(AgendaEventoActions.agendaEventoAllRequest(options))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaScreen)

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
