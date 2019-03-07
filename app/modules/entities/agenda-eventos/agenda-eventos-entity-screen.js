import React from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Animated } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { agendaEventoEntityDetailScreen, agendaEventoEntityEditScreen } from '../../../navigation/layouts'
import AgendaEventoActions from './agenda-eventos.reducer'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { LocaleConfig,Agenda } from 'react-native-calendars';
import t from 'tcomb-form-native'
import { StyleSheet } from 'react-native'
// More info here: https://facebook.github.io/react-native/docs/flatlist.html


LocaleConfig.locales.pt = {
  monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
};

LocaleConfig.defaultLocale = 'pt';
//LocaleConfig.locales.en = LocaleConfig.locales[''];

class AgendaEventoEntityScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    this.state = {
      agendaEventosModel: t.struct({
        titulo: t.maybe(t.String),
        data: t.Date,
        local: t.String,
        descricao: t.maybe(t.String)
      }),
      agendaEventosValue: this.props.agendaEventos,
      items: {}
    //  diaAtual: new Date().toLocaleString("sv-SE", {timeZone: "America/Sao_Paulo"}).toString().substring(0,10)
    };
  }

  componentDidMount()
  {
    //console.log("calendar",this.calendar.calendar)
    // this.toggleCalendar()
    //this.expandCalendar()
   //this.agenda.chooseDay('2019-01-07')
  }


  disableUnmarkedDays(day) {
    if(!this.state.items[day.dateString])
    {
           this.state.items[day.dateString] = [];
    }

      // const newItems = {};
      // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      // this.setState({
      //   items: newItems
      // });

}

onDayPress = (date) => {
  this.setState({
    date: new Date(date.year, date.month-1, date.day),
  });
};

onDayChange = (date) => {
  this.setState({
    date: new Date(date.year, date.month-1, date.day),
  });
};

  render() {

    return (
      <Agenda
        items={this.state.items}
        ref={(c) => this.agenda = c}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        isDefaultViewCalendar={true}
        onDayPress={(day)=>this.disableUnmarkedDays(day)}
        onDayChange={(day)=>this.disableUnmarkedDays(day)}
      />
    );

  }

  // render() {

  //   if (this.state.loading) {
  //     return (
  //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   }else
  //   {
  //     return (
  //       <Agenda
  //         items={this.state.items}
  //         ref={(c) => this.agenda = c}
  //         loadItemsForMonth={this.loadItems.bind(this)}
  //         renderItem={this.renderItem.bind(this)}
  //         renderEmptyDate={this.renderEmptyDate.bind(this)}
  //         rowHasChanged={this.rowHasChanged.bind(this)}
  //         hideKnob={false}
  //       />
  //     );
  //   }

  // }

  setEmptyKey(dayString) {
    if (!this.state.items.hasOwnProperty(dayString)) {
      this.state.items[dayString] = [];
      // The purpose of this is to remove empty array without affecting the ui
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete this.state.items[dayString];
          resolve();
        }, 1000);
      }).catch(error => {
        // log if needed.
        console.log(error);
      });
    }
  }


  loadItems(day) {
    setTimeout(() => {

      if(this.props.agendaEventos != null && this.props.agendaEventos.length > 0)
      {
        this.props.agendaEventos.forEach(agendaEvento => {


          this.state.items[agendaEvento.data.toString().substring(0,10)] = [];
          this.state.items[agendaEvento.data.toString().substring(0,10)].push({
            name: agendaEvento.titulo,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
         // console.log("logando agendas")
         // console.log(agendaEvento.data.toString().substring(0,10))


         const newItems = {};
         Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
         this.setState({
           items: newItems
         });
        })

      }


      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = Math.floor(Math.random() * 5);
      //     for (let j = 0; j < numItems; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime,
      //         height: Math.max(50, Math.floor(Math.random() * 150))
      //       });
      //     }
      //   }
      // }
      //console.log(this.state.items);

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
      <View style={styles.emptyDate}>
      {/* <Text>This is empty date!</Text> */}
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  fetchAgendaEventos = () => {
    this.props.getAllAgendaEventos({ page: this.state.page, sort: this.state.sort, size: this.state.size })
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

export default connect(mapStateToProps, mapDispatchToProps)(AgendaEventoEntityScreen)
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
