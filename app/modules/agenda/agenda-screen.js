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
      items: {}
    };
  }

  async componentDidMount() {

     //console.log(props)

}

componentWillReceiveProps (newProps) {
  console.log(newProps)
  // Did the update attempt complete?
  if (!newProps.updating) {
    if (newProps.error) {
      if (newProps.error === 'WRONG') {
        Alert.alert('Error', 'Something went wrong while saving the settings', [{text: 'OK'}])
      }
    } else if (!this.state.success) {
      this.setState({
        success: true
      })
      Alert.alert('Success', 'Settings updated', [{text: 'OK'}])
      this.props.getAllAgendaEventos()
    }
  }
}


  agendaEventosChange (newValue) {
    this.setState({
      agendaEventosValue: newValue
    })
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        //agendaEventosModel={this.state.agendaEventosModel}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
         // monthFormat={'yyyy'}
         //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {

      this.props.agendaEventos.forEach(element => {

         // const time = day.timestamp + new Date(element.data).getTime() * 24 * 60 * 60 * 1000;

        const strTime = new Date(element.data).getUTCDay();

                if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          //const numItems = Math.floor(Math.random() * 5);
          const numItems = 1;
        console.log("logando data")
        console.log(strTime)
                }
        this.state.items[strTime].push({
          name: element.titulo + new Date(element.data).getDay(),
          // {new Intl.DateTimeFormat('en-GB', {
          //     year: 'numeric',
          //     month: 'long',
          //     day: '2-digit'
          // }).format(customer.firstSale)}

          height: Math.max(50, Math.floor(Math.random() * 150))
        });


      });


      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     //const numItems = Math.floor(Math.random() * 5);
      //     const numItems = 1;
      //   //  console.log(this.props.agendaEventos[0]);



      //     // for (let j = 0; j < numItems; j++) {

      //     // }
      //   }
      // }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Data disponível</Text></View>
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
